import { getLaunchOptionsSync } from '@ray-js/api';
import { store, actions as ReduxActions } from '@/redux';

// 本地化缓存 deviceInfo 方便随时调用
let __deviceInfo = null;
export const initDevInfo = (): Promise<DevInfo | null> => {
  const { deviceId: devId } = getLaunchOptionsSync().query;
  return new Promise(resolve => {
    ty.device.getDeviceInfo({
      deviceId: devId,
      success: deviceInfo => {
        __deviceInfo = deviceInfo;
        resolve(__deviceInfo);
      },
      fail: console.log,
    });
  });
};

export const getDevInfo = () => {
  return __deviceInfo;
};

/// 设备状态监听
ty.device.onDeviceInfoUpdated(data => {
  const { dispatch } = store;
  initDevInfo();
  // @ts-ignore
  dispatch(ReduxActions.common.deviceChange(data));
});

ty.device.onDpDataChange(data => {
  const { dispatch } = store;
  initDevInfo();
  dispatch(ReduxActions.common.responseUpdateDp(data as any));
});

ty.device.onDeviceOnlineStatusUpdate(_ => {
  initDevInfo();
});
