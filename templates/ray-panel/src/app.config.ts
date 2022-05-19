// this file generate by @ray-js/build-plugin-router.
// do not modify this file!!!
export const wechat = {
  window: {
    backgroundColor: '#f2f4f6',
    navigationBarTitleText: 'Ray 小程序示例',
    navigationBarBackgroundColor: '#f2f4f6',
    navigationBarTextStyle: 'black',
  },
  pages: [
    'pages/home/index',
    'pages/tuyalink/index',
    'pages/common/page1/index',
    'pages/common/page2/index',
    'pages/common/page3/index',
    'pages/common/page4/index',
    'pages/common/page5/index',
    'pages/common/page6/index',
  ],
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
  pageWrapper: ['@ray-js/ray-components-plus/lib/CommonWrp'],
  pages: [
    'pages/home/index',
    'pages/tuyalink/index',
    'pages/common/page1/index',
    'pages/common/page2/index',
    'pages/common/page3/index',
    'pages/common/page4/index',
    'pages/common/page5/index',
    'pages/common/page6/index',
  ],
  tabBar: {},
};
