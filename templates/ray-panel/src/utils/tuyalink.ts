// 非 tuyalink 协议设备可移除该逻辑
import { getDeviceThingDataSource } from '../api/index';
import { actions, store } from '@/redux';
import { thingDpType } from '@/constant';

// 监听物模型消息推送
ty.device.onReceivedThingModelMessage(body => {
  const { dispatch } = store;
  console.log('OnReceivedThingModelMessageBody 调用成功', body);
  const message = typeof body === 'string' ? JSON.parse(body) : body;
  // 事件弹窗
  if (message?.type === thingDpType.event) {
    dispatch(actions.common.toggleShowModel({ code: message?.payload?.eventCode, value: true }));
  }
  // 动作弹窗
  if (message?.type === thingDpType.action) {
    dispatch(actions.common.toggleShowModel({ code: message?.payload?.actionCode, value: true }));
  }
  // 属性
  dispatch(actions.common.updateThingModel(message));
});

export const initThingModel = devId => {
  const { dispatch } = store;
  getDeviceThingDataSource().then(data => {
    dispatch(actions.common.initThingModel(data));
  });
  // 订阅接受物模型推送消息
  ty.device.subscribeReceivedThingModelMessage({
    devId,
    success: () => console.log('subscribeReceivedThingModelMessage 调用成功'),
    fail: () => console.log('subscribeReceivedThingModelMessage 调用失败'),
  });
  // 订阅设备移除事件
  ty.device.subscribeDeviceRemoved({
    deviceId: devId,
    success: () => {
      console.log('subscribeDeviceRemoved 调用成功');
      // 监听删除设备事件
      ty.device.onDeviceRemoved(body => {
        console.log('OnDeviceRemoved 调用成功', body);
        // 退出小程序容器
        ty.exitMiniProgram({});
      });
    },
    fail: () => console.log('subscribeDeviceRemoved 调用失败'),
  });
};
