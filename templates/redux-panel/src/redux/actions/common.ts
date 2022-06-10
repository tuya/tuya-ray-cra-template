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

/**
 * actions
 */

const devInfoChange = (devInfo: DevInfo) => {
  return {
    type: DEV_INFO_CHANGE,
    payload: devInfo,
  };
};

const deviceChange = (devInfo: DevInfo) => {
  return { type: DEVICE_INFO_CHANGE, payload: devInfo };
};

const responseUpdateDp = (dpData: any) => {
  return { type: RESPONSE_UPDATE_DP, payload: dpData };
};

const initStaticPrefix = (staticPrefix: string) => {
  return { type: INIT_STATIC_PREFIX, payload: staticPrefix };
};

const initIoTConfig = iotConfig => {
  return { type: INIT_IOT_CONFIG, payload: iotConfig };
};

const initFunConfig = funConfig => {
  return {
    type: INIT_FUN_CONFIG,
    payload: funConfig,
  };
};

const initBicConfig = bicConfig => {
  return {
    type: INIT_BIC_CONFIG,
    payload: bicConfig,
  };
};

const updateMiscConfig = miscConfig => {
  return {
    type: UPDATE_MISC_CONFIG,
    payload: miscConfig,
  };
};

const initializedConfig = () => {
  return {
    type: INITIALIZED_CONFIG,
  };
};

// const updateAppTheme = createAction('UPDATE_APP_THEME_COLOR');
// const consoleChange = createAction('CONSOLECHNAGE');
// const clearConsole = createAction('CLEARCONSOLE');
// tuyalink
// 初始化thingModel数据

const initThingModel = (payload: any) => {
  return {
    type: INIT_THING_MODEL,
    payload,
  };
};

// 更改thingModel数据
const updateThingModel = (payload: any) => {
  return {
    type: UPDATE_THING_MODEL,
    payload,
  };
};

// 弹出事件弹框
const toggleShowModel = (payload: any) => {
  return { type: TOGGLE_SHOW_MODEL, payload };
};

export const actions = {
  devInfoChange,
  deviceChange,
  responseUpdateDp,

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
};
