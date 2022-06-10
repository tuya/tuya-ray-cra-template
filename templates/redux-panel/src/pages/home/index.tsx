import { useSelector } from '@/redux';
import { Button, ScrollView, Text, View } from '@ray-js/components';
import { router } from 'ray';
import React from 'react';
import styles from './index.module.less';

export function Home() {
  const devInfo = useSelector(state => state.devInfo);
  const data = [
    { key: 'page1', text: '查看公版子 UI 配置' },
    { key: 'page3', text: '查看其他通用配置' },
    { key: 'page4', text: '查看路由信息' },
    { key: 'page5', text: '网络资源支持多区域' },
    { key: 'page6', text: '设备dp点' },
    {
      key: 'tylink',
      text: 'tuyalink协议设备移步至此',
      onPress: () => {
        router.push('/tuyalink');
      },
    },
    {
      key: 'getAppInfo',
      text: 'getAppInfo',
      onPress: () => {
        ty.getAppInfo({
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
        ty.getSystemInfo({
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
        ty.onNetworkStatusChange(res => console.log(res, 'onNetworkStatusChange'));
      },
    },
    {
      key: 'offNetworkStatusChange',
      text: 'offNetworkStatusChange',
      onPress: () => {
        ty.offNetworkStatusChange(res => console.log(res, 'offNetworkStatusChange'));
      },
    },
    {
      key: 'onBluetoothAdapterStateChange',
      text: 'onBluetoothAdapterStateChange',
      onPress: () => {
        ty.onBluetoothAdapterStateChange(res => console.log(res, 'onBluetoothAdapterStateChange'));
      },
    },
    {
      key: 'offBluetoothAdapterStateChange',
      text: 'offBluetoothAdapterStateChange',
      onPress: () => {
        ty.offBluetoothAdapterStateChange(res =>
          console.log(res, 'offBluetoothAdapterStateChange')
        );
      },
    },
    {
      key: 'gotoDpAlarm',
      text: 'gotoDpAlarm',
      onPress: () => {
        ty.device.openTimerPage({
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
        ty.device.bluetoothIsPowerOn({
          success: res => console.log(res, 'success'),
          fail: res => console.log(res, 'fail'),
        });
      },
    },
    {
      key: '下发dp点',
      text: '下发dp点',
      onPress: () => {
        ty.device.publishDps({
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
        ty.device.getDeviceInfo({
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
        ty.device.openDeviceDetailPage({
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
        ty.showToast({
          title: '这是一个toast',
        });
      },
    },
    {
      key: 'Loading',
      text: 'showLoading',
      onPress: () => {
        ty.showLoading({
          title: '这是一个Loading',
        });

        setTimeout(() => {
          ty.hideLoading();
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
