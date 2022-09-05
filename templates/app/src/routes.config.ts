import { Routes, TabBar } from '@ray-js/types';

export const routes: Routes = [
  {
    id: 'home',
    route: '/',
    path: '/pages/home/index',
  },
  {
    id: 'detail',
    route: '/detail/:uid',
    path: '/pages/detail/index',
  },
  {
    id: 'my',
    route: '/my',
    path: '/pages/my/index',
  },
];

export const tabBar: TabBar = {
  textColor: '#000',
  selectedColor: '#ff592a',
  list: [
    {
      id: 'home',
      text: '首页',
      icon: '/tabBar/home.png',
      activeIcon: '/tabBar/home-active.png',
    },
  ],
};
