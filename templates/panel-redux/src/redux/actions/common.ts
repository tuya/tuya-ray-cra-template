import { DEVICE_INFO_CHANGE, DEV_INFO_CHANGE, RESPONSE_UPDATE_DP } from '@/constant';

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

const responseUpdateDp = (dpData: Record<string, any>) => {
  return { type: RESPONSE_UPDATE_DP, payload: dpData };
};

export const actions = {
  devInfoChange,
  deviceChange,
  responseUpdateDp,
};
