import { Routes, TabBar, SubPackages } from '@ray-js/types';

export const routes: Routes = [
  {
    route: '/',
    path: '/pages/home/index',
    name: 'Home',
  },
  {
    route: '/setting',
    path: '/pages/setting/index',
    name: 'Setting',
  },

  {
    route: '/center',
    path: '/pages/center/index',
    name: 'Center',
  },
  {
    route: '/message',
    path: '/pages/message/index',
    name: 'Message',
  },
  {
    route: '/login',
    path: '/pages/login/index',
    name: 'Login',
  },

];

export const subPackages: SubPackages = [{
  root: 'pages/device_detail/',
  name: 'deviceDetail',
  pages: [{
    route: '/deviceDetail/:deviceId',
    path: 'index',
  },
  {
    route: '/deviceDetail/name/:deviceId',
    path: 'name/index',
  },
  {
    route: '/deviceDetail/info/:deviceId',
    path: 'info/index',
  },
  {
    route: '/deviceDetail/ota/:deviceId',
    path: 'ota/index',
  },]
}, {
  name: 'ap_plugin',
  root: 'pages/plugins/add_device',
  pages: [{
    route: '/addDevice',
    path: 'index',
  }],
  plugins: {
    'tuya-ap-plugin': {
      version: '4.4.3',
      provider: 'wxd2aa51ffacc3ff86',
    },
  },
},]

export const tabBar = {};
