// this file generate by @ray/build-plugin-router.
// do not modify this file!!!
export const wechat = {
  window: {
    backgroundColor: '#f2f4f6',
    navigationBarTitleText: '',
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
  pageWrapper: ['@ray/ray-components-plus/lib/CommonWrp'],
  pages: ['pages/home/index'],
  tabBar: {},
};
