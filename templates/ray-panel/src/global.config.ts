import { GlobalConfig } from '@ray/types';

export const wechat = {
  window: {
    backgroundColor: '#f2f4f6',
    navigationBarTitleText: 'Ray 小程序示例',
    navigationBarBackgroundColor: '#f2f4f6',
    navigationBarTextStyle: 'black',
  },
};

export const web = {
  window: {
    backgroundColor: '#f2f4f6',
    navigationBarTitleText: 'Ray Web App',
  },
};

export const native = {
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
    backgroundColorTop: 'red',
    navigationStyle: 'custom',
  },
  pageWrapper: ['@ray/ray-panel-wrapper/lib/page'],

  dependencies: {
    DeviceKit: '^2.0.11',
    HomeKit: '^2.0.3',
    BaseKit: '^2.0.8',
    TYKit: '^2.0.6',
  },
};

export const tuya = {
  window: {
    backgroundColor: '#f2f4f6',
    navigationBarTitleText: '',
    navigationBarBackgroundColor: '#f2f4f6',
    navigationBarTextStyle: 'black',
  },
  dependencies: {
    BaseKit: '2.0.5',
    DeviceKit: '2.0.5',
    MiniKit: '2.0.6',
    TYKit: '2.0.5',
  },
  pageWrapper: ['@ray/ray-components-plus/lib/CommonWrp', '@ray/ray-panel-wrapper/lib/page'],
};

const globalConfig: GlobalConfig = {
  basename: '',
};

export default globalConfig;
