import { Button, ScrollView, Text, View } from '@ray-js/components';
import {
  getSystemInfo,
  onNetworkStatusChange,
  offNetworkStatusChange,
  onBluetoothAdapterStateChange,
  offBluetoothAdapterStateChange,
  showToast,
  showLoading,
  hideLoading,
  getAppInfo,
  bluetoothIsPowerOn,
  publishDps,
  getDeviceInfo,
  openDeviceDetailPage,
  openTimerPage,
} from '@ray-js/api';
import { hooks } from '@ray-js/panel-sdk';
import { router } from 'ray';
import React from 'react';
import { useSelector } from '@/redux';
import styles from './index.module.less';

const { useDevInfo } = hooks;
export function Home() {
  // const devInfo = useSelector(state => state.devInfo);
  const devInfo = useDevInfo();

  const data = [
    { key: 'page4', text: '查看路由信息' },
    { key: 'page6', text: '设备dp点' },
    {
      key: 'getAppInfo',
      text: 'getAppInfo',
      onPress: () => {
        getAppInfo({
          success: info => {
            console.log(info);
          },
          fail: error => console.log(error),
        });
      },
    },
    {
      key: 'back',
      text: '获取手机信息',
      onPress: () => {
        getSystemInfo({
          success: info => {
            console.log('getSystemInfo >>', info);
          },
          fail: error => {
            console.log(error);
          },
        });
      },
    },

    {
      key: 'onNetworkStatusChange',
      text: 'onNetworkStatusChange',
      onPress: () => {
        onNetworkStatusChange(res => console.log(res, 'onNetworkStatusChange'));
      },
    },
    {
      key: 'offNetworkStatusChange',
      text: 'offNetworkStatusChange',
      onPress: () => {
        offNetworkStatusChange(res => console.log(res, 'offNetworkStatusChange'));
      },
    },
    {
      key: 'onBluetoothAdapterStateChange',
      text: 'onBluetoothAdapterStateChange',
      onPress: () => {
        onBluetoothAdapterStateChange(res => console.log(res, 'onBluetoothAdapterStateChange'));
      },
    },
    {
      key: 'offBluetoothAdapterStateChange',
      text: 'offBluetoothAdapterStateChange',
      onPress: () => {
        offBluetoothAdapterStateChange(res => console.log(res, 'offBluetoothAdapterStateChange'));
      },
    },
    {
      key: 'gotoDpAlarm',
      text: 'gotoDpAlarm',
      onPress: () => {
        openTimerPage({
          deviceId: devInfo.devId,
          category: 'schedule',
          data: [
            {
              dpId: '18',
              dpName: '开关1',
              selected: 0,
              rangeKeys: [true, false],
              rangeValues: ['开启', '关闭'],
            },
          ],
        });
      },
    },
    {
      key: 'bluetoothIsPowerOn',
      text: 'bluetoothIsPowerOn',
      onPress: () => {
        bluetoothIsPowerOn({
          success: res => console.log(res, 'success'),
          fail: res => console.log(res, 'fail'),
        });
      },
    },
    {
      key: '下发dp点',
      text: '下发dp点',
      onPress: () => {
        publishDps({
          deviceId: devInfo.devId,
          dps: { '1': true, '2': false }, // {'dpid': dpValue, '2': false}
          mode: 2,
          pipelines: [],
          options: {}, // 0，静音； 1，震动；2,声音； 3，震动声音
          success: () => console.log('success'),
          fail: d => {
            console.log('-----返回结果错误?', d);
          },
        });
      },
    },
    {
      key: 'getDeviceInfo',
      text: 'getDeviceInfo',
      onPress: () => {
        getDeviceInfo({
          deviceId: devInfo.devId,
          success: info => {
            console.log(info);
          },
          fail: error => console.log(error),
        });
      },
    },
    {
      key: 'Router',
      text: '去设备详情',
      onPress: () => {
        const { devId, groupId } = devInfo;
        openDeviceDetailPage({
          deviceId: devId,
          groupId,
          success: () => console.log('success'),
          fail: error => console.log(error),
        });
      },
    },
    {
      key: 'Toast',
      text: 'showToast',
      onPress: () => {
        showToast({
          title: '这是一个toast',
        });
      },
    },
    {
      key: 'Loading',
      text: 'showLoading',
      onPress: () => {
        showLoading({
          title: '这是一个Loading',
        });

        setTimeout(() => {
          hideLoading();
        }, 10000);
      },
    },
  ];

  return (
    <ScrollView className={styles.view}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {data.map(({ key, text, onPress }) => {
          return (
            <Button
              className={styles.button}
              key={key}
              onClick={
                onPress ||
                (() => {
                  router.push(`/common/${key!}/index`);
                })
              }
            >
              <Text className={styles.bTitle}>{text}</Text>
            </Button>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default Home;
