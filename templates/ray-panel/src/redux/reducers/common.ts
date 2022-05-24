/* eslint-disable @typescript-eslint/ban-ts-comment */
import { panelConfig as defaultPanelConfig } from '@/config';
import {
  DEVICE_INFO_CHANGE,
  DEV_INFO_CHANGE,
  INITIALIZED_CONFIG,
  INIT_BIC_CONFIG,
  INIT_FUN_CONFIG,
  INIT_IOT_CONFIG,
  INIT_STATIC_PREFIX,
  INIT_THING_MODEL,
  RESPONSE_UPDATE_DP,
  TOGGLE_SHOW_MODEL,
  UPDATE_MISC_CONFIG,
  UPDATE_THING_MODEL,
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

      return {
        ...state,
        services,
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
