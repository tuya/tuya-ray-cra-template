/* eslint-disable @typescript-eslint/ban-ts-comment */
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import { panelConfig as defaultPanelConfig } from '@/config';

import {
  INITIALIZED_CONFIG,
  INIT_BIC_CONFIG,
  INIT_FUN_CONFIG,
  INIT_IOT_CONFIG,
  INIT_STATIC_PREFIX,
  INIT_THING_MODEL,
  RESPONSE_UPDATE_DP,
  thingDpType,
  TOGGLE_SHOW_MODEL,
  UPDATE_MISC_CONFIG,
  UPDATE_THING_MODEL,
  DEVICE_INFO_CHANGE,
  DEV_INFO_CHANGE,
} from '@/constant';
import { actions } from '../actions/common';

export type Actions = {
  [K in keyof typeof actions]: ReturnType<typeof actions[K]>;
};
export type DpValue = boolean | number | string;

interface DpState {
  switch: boolean;
  [dpCode: string]: DpValue;
}

type UpdateDpStatePayload = Partial<DpState> & { [key: string]: DpValue };

/**
 * reducers
 */

const dpState = (state = {}, action) => {
  switch (action.type) {
    case DEV_INFO_CHANGE:
      return {
        ...state,
        ...action.payload.state,
      };

    case RESPONSE_UPDATE_DP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

type UpdateThingModelPayload = ty.device.OnReceivedThingModelMessageBody;

const thingModel = (state = { services: [] }, action) => {
  switch (action.type) {
    case INIT_THING_MODEL:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_THING_MODEL: {
      const {
        payload: { type, payload },
      } = action;
      if (type === undefined || payload === undefined) {
        return state;
      }
      const { services = [] } = state;
      const newServices = services.map(service => {
        const { properties = [], actions: actionsModel = [], events = [] } = service;
        if (type === thingDpType.prop) {
          const data = payload;
          const newProperties = _.assign([], properties);

          _.keys(data).forEach(key => {
            properties.some((prop, index) => {
              if (prop.code === key) {
                _.set(newProperties[index], 'value', data[key]?.value);
                return true;
              }
              return false;
            });
          });

          return { properties: newProperties, actions: actionsModel, events };
        }

        if (type === thingDpType.action) {
          const data = payload;
          const { actionCode } = data;
          const newAction = _.assign([], actionsModel);
          actionsModel.some((actionItem, index) => {
            if (actionItem.code === actionCode) {
              const newOutputParams = actionItem.outputParams.map((params: any) => {
                if (_.keys(data?.outputParams || {}).includes(params.code)) {
                  return _.merge(params, {
                    value: data?.outputParams?.[params.code],
                  });
                }
                return params;
              });
              _.set(newAction[index], 'outputParams', newOutputParams);
              return true;
            }
            return false;
          });

          return { properties, actions: newAction, events };
        }

        if (type === thingDpType.event) {
          const data = payload;
          const { eventCode } = data;
          const newEvent = _.assign([], events);
          events.some((eventItem, index) => {
            if (eventItem.code === eventCode) {
              const newOutputParams = eventItem.outputParams.map((params: any) => {
                if (_.keys(data?.outputParams || {}).includes(params.code)) {
                  return _.merge(params, {
                    value: data?.outputParams?.[params.code],
                  });
                }
                return params;
              });
              _.set(newEvent[index], 'outputParams', newOutputParams);
              return true;
            }
            return false;
          });
          return { properties, actions: actionsModel, events: newEvent };
        }

        return service;
      });

      return {
        ...state,
        services: newServices,
      };
    }
    default:
      return state;
  }
};

type ShowModalMap = Record<string, boolean>;
type UpdateShowModal = { code: string; value: boolean };
// 控制是否弹出事件弹框

const showModal = (state = {}, action: { payload: any; type: string }) => {
  switch (action.type) {
    case TOGGLE_SHOW_MODEL:
      return {
        ...state,
        [action.payload.code]: action.payload.value,
      };
    default:
      return state;
  }
};

const devInfo = (state = {}, action) => {
  switch (action.type) {
    case DEV_INFO_CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    case DEVICE_INFO_CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const staticPrefix = (state = '', action) => {
  switch (action.type) {
    case INIT_STATIC_PREFIX:
      return action.payload;

    default:
      return state;
  }
};

const panelConfig = (state = defaultPanelConfig, action) => {
  switch (action.type) {
    case INIT_IOT_CONFIG:
      return {
        ...state,
        iot: action.payload,
      };
    case INIT_BIC_CONFIG:
      return {
        ...state,
        bic: action.payload,
      };
    case INIT_FUN_CONFIG:
      return {
        ...state,
        fun: action.payload,
      };
    case UPDATE_MISC_CONFIG:
      return {
        ...state,
        misc: {
          ...state.misc,
          ...action.payload,
        },
      };
    case INITIALIZED_CONFIG:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const reducers = {
  staticPrefix,
  dpState,
  devInfo,
  panelConfig,
  // appTheme,
  // logs,
  thingModel,
  showModal,
};
