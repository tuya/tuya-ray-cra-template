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
    BaseKit: '2.0.5',
    DeviceKit: '2.0.5',
    MiniKit: '2.0.6',
    TYKit: '2.0.5',
  },
  pageWrapper: ['@ray-js/ray-components-plus/lib/CommonWrp', '@ray-js/ray-panel-wrapper/lib/page'],
  pages: ['pages/home/index'],
  tabBar: {},
};
