import { createAction } from 'redux-actions';

/**
 * actions
 */
const devInfoChange = createAction('_DEVINFOCHANGE_');
const deviceChange = createAction('_DEVICECHANGED_');
const responseUpdateDp = createAction('RESPONSE_UPDATE_DP');
const updateDp = createAction('CHANGE_DP');

const initStaticPrefix = createAction('INIT_STATIC_PREFIX');
const initIoTConfig = createAction('INIT_IOT_CONFIG');
const initFunConfig = createAction('INIT_FUN_CONFIG');
const initBicConfig = createAction('INIT_BIC_CONFIG');
const updateMiscConfig = createAction('UPDATE_MISC_CONFIG');
const initializedConfig = createAction('INITIALIZED_CONFIG');
const updateAppTheme = createAction('UPDATE_APP_THEME_COLOR');
const consoleChange = createAction('CONSOLECHNAGE');
const clearConsole = createAction('CLEARCONSOLE');
// tuyalink
// 初始化thingModel数据
const initThingModel = createAction('INIT_THING_MODEL');
// 更改thingModel数据
const updateThingModel = createAction('UPDATE_THING_MODEL');
// 弹出事件弹框
const toggleShowModel = createAction('TOGGLE_SHOW_MODEL');

export const actions = {
  devInfoChange,
  deviceChange,
  responseUpdateDp,
  updateDp,
  initStaticPrefix,
  initIoTConfig,
  initFunConfig,
  initBicConfig,
  updateMiscConfig,
  initializedConfig,
  updateAppTheme,
  consoleChange,
  clearConsole,
  initThingModel,
  updateThingModel,
  toggleShowModel,
};
