// this file generate by @ray-js/build-plugin-router.
// do not modify this file!!!
export const wechat = {
  window: {
    backgroundColor: '#f2f4f6',
    navigationBarTitleText: 'Ray 小程序示例',
    navigationBarBackgroundColor: '#f2f4f6',
    navigationBarTextStyle: 'black',
  },
  pages: ['pages/home/index'],
};
export const tuya = {
  window: {
    backgroundColor: '#f2f4f6',
    navigationBarTitleText: '',
    navigationBarBackgroundColor: '#f2f4f6',
    navigationBarTextStyle: 'black',
  },
  dependencies: {
    BaseKit: '2.1.2',
    DeviceKit: '2.1.6',
    MiniKit: '2.3.0',
    TYKit: '2.0.7',
  },
  pageWrapper: ['@ray-js/ray-components-plus/lib/CommonWrp', '@ray-js/ray-panel-wrapper/lib/page'],
  pages: ['pages/home/index'],
  tabBar: {},
};
