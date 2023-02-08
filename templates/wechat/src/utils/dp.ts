import { STANDARD_DPCODES } from '@/constant';
import { devices } from '@/devices';
import { utils } from '@ray-js/panel-sdk';

type SDMDevInfo = ReturnType<typeof devices.socket.getDevInfo>;

/**
 * 不在标准功能点内且功能点类型为 bool、enum、value 的会被认定为允许在设置页面展现的拓展 DP 点
 */
export const getSettingDps = (devInfo: SDMDevInfo) => {
  return devInfo.schema.filter(
    schema =>
      ['bool', 'enum', 'value'].indexOf(schema?.property?.type) !== -1 &&
      STANDARD_DPCODES.indexOf(schema.code as any) === -1
  );
};

/**
 * 如果不存在上电状态、指示灯状态或其他非标准功能点则隐藏 Setting 设置页
 */
export const isSupportSetting = (devInfo: SDMDevInfo) => {
  const dps = getSettingDps(devInfo);
  return dps && dps.length && dps.length > 0;
};

/**
 * 高级定时存在以下任意一个功能则可以跳转
 */
export const isSupportAdvancedTimer = (devInfo: SDMDevInfo) => {
  const isSupportSchedule = devInfo?.panelConfig?.bic.some(d => d.code === 'timer' && d.selected);
  const isSupportAstronomy =
    utils.getBitValue(devInfo?.devAttribute, 9) && typeof devInfo.dpCodes?.switch_1 !== 'undefined';
  const isSupportRandomTime = typeof devInfo?.dpCodes?.random_time !== 'undefined';
  const isSupportCycleTime = typeof devInfo?.dpCodes?.cycle_time !== 'undefined';
  return isSupportSchedule || isSupportAstronomy || isSupportRandomTime || isSupportCycleTime;
};
