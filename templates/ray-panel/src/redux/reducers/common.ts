/* eslint-disable @typescript-eslint/ban-ts-comment */
import { handleActions } from 'redux-actions';
import _ from 'lodash';
import { panelConfig as defaultPanelConfig } from '@/config';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/partition';
// import { TYSdk } from '@ray/ray-panel-core';
import { thingDpType } from '@/constant';
import { actions } from '../actions/common';

const {
  devInfoChange,
  deviceChange,
  responseUpdateDp,
  // updateDp,
  initStaticPrefix,
  initIoTConfig,
  initFunConfig,
  initBicConfig,
  updateMiscConfig,
  initializedConfig,
  // updateAppTheme,
  // consoleChange,
  // clearConsole,
  initThingModel,
  updateThingModel,
  toggleShowModel,
} = actions;

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
const dpState = handleActions<DpState, UpdateDpStatePayload>(
  {
    [devInfoChange.toString()]: (state, action: Actions['devInfoChange']) => {
      return {
        ...state,
        ...action.payload.state,
      };
    },

    [responseUpdateDp.toString()]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  {} as DpState
);

type UpdateThingModelPayload = ty.device.OnReceivedThingModelMessageBody;

const thingModel = handleActions<ThingModelInfo, UpdateThingModelPayload>(
  {
    [initThingModel.toString()]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    [updateThingModel.toString()]: (state, action) => {
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
              const newOutputParams = actionItem.outputParams.map(params => {
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
              const newOutputParams = eventItem.outputParams.map(params => {
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
    },
  },
  {} as ThingModelInfo
);

type ShowModalMap = Record<string, boolean>;
type UpdateShowModal = { code: string; value: boolean };
// 控制是否弹出事件弹框
const showModal = handleActions<ShowModalMap, UpdateShowModal>(
  {
    [toggleShowModel.toString()]: (state, action: { payload: any }) => ({
      ...state,
      [action.payload.code]: action.payload.value,
    }),
  },
  {}
);

const devInfo = handleActions<DevInfo>(
  {
    [devInfoChange.toString()]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [deviceChange.toString()]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  {} as DevInfo
);

type StaticPrefix = string;

const staticPrefix = handleActions<StaticPrefix>(
  {
    [initStaticPrefix.toString()]: (state, action) => action.payload,
  },
  ''
);

const panelConfig = handleActions(
  {
    [initIoTConfig.toString()]: (state, action: Actions['initIoTConfig']) => {
      return {
        ...state,
        iot: action.payload,
      };
    },
    [initBicConfig.toString()]: (state, action: Actions['initBicConfig']) => {
      return {
        ...state,
        bic: action.payload,
      };
    },
    [initFunConfig.toString()]: (state, action: Actions['initFunConfig']) => {
      return {
        ...state,
        fun: action.payload,
      };
    },
    [updateMiscConfig.toString()]: (state, action: Actions['updateMiscConfig']) => {
      return {
        ...state,
        misc: {
          ...state.misc,
          ...action.payload,
        },
      };
    },
    [initializedConfig.toString()]: state => {
      return {
        ...state,
        initialized: true,
      };
    },
  },
  defaultPanelConfig
);

// 目前没有用到
// const appTheme = handleActions(
//   {
//     [updateAppTheme.toString()]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//   },
//   {}
// );

// 目前没有用到
// const formatLogs = (state: Logs, action: { payload: UpdateDpStatePayload }, send: boolean) => {
//   const ret = Object.keys(action.payload).reduce((obj, p) => {
//     const id = TYSdk.device.getDpIdByCode(p);
//     return { ...obj, [id]: action.payload[p] };
//   }, {});
//   const strIds = JSON.stringify(ret, null, 2);
//   const strCodes = JSON.stringify(action.payload, null, 2);
//   const date = new Date();
//   const time = `[${[
//     date.getHours(),
//     date.getMinutes(),
//     date.getSeconds(),
//     date.getMilliseconds(),
//   ].join(':')}]`;
//   const s = [{ strCodes, strIds, time, isSend: send }, ...state];
//   return s.slice(0, 30);
// };

// let isSend = false;

// interface Log {
//   strCodes: string;
//   strIds: string;
//   time: string;
//   isSend: boolean;
// }

// type Logs = Array<Log>;

// const logs = handleActions<Logs, undefined | UpdateDpStatePayload | DevInfo>(
//   {
//     [consoleChange.toString()]: state => {
//       isSend = true;
//       return state;
//     },

//     [updateDp.toString()]: (state, action: Actions['updateDp']) => {
//       isSend = true;
//       return formatLogs(state, action, isSend);
//     },

//     [devInfoChange.toString()]: (state, action: Actions['devInfoChange']) => {
//       const formatAction = { payload: action.payload.state };
//       return formatLogs(state, formatAction, isSend);
//     },

//     [responseUpdateDp.toString()]: (state, action: Actions['responseUpdateDp']) => {
//       isSend = false;
//       return formatLogs(state, action, isSend);
//     },

//     [clearConsole.toString()]: () => [],
//   },
//   []
// );

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
