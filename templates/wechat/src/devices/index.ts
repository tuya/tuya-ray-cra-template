import { SmartDeviceModel, SmartDeviceSchema } from '@ray-js/panel-sdk';
import { initPanelEnvironment } from '@ray-js/panel-sdk/lib/kit';

export const devices = {
  socket: new SmartDeviceModel<SmartDeviceSchema>(),
};

devices.socket.__devInfo__ = { devId: '', schema: [] };
devices.socket.__dpSchema__ = {};
devices.socket.__dpState__ = {};


export const initDevice = (devId: string) => {
  initPanelEnvironment({ useDefaultOffline: true, deviceId: devId });
  devices.socket.init(devId);
};