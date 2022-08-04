import {
  getAppInfo,
  getDeviceInfo,
  getLangContent,
  getSystemInfo,
  hideLoading,
  openDeviceDetailPage,
  openTimerPage,
  showLoading,
  showToast,
} from '@ray-js/api';
import { Button, ScrollView, Text, View } from '@ray-js/components';

import { kit, hooks, utils, service } from '@ray-js/panel-sdk';
import * as baseHooks from '@ray-js/panel-sdk/lib/base/hooks';
import * as baseUtils from '@ray-js/panel-sdk/lib/base/utils';
import * as baseService from '@ray-js/panel-sdk/lib/base/service';
import * as baseKit from '@ray-js/panel-sdk/lib/base/kit';

import { router } from 'ray';
import React, { useEffect } from 'react';
import Section from '@/components/section';
import Strings from '@/i18n';
import styles from './index.module.less';

const { useDevInfo, useDpState, usePanelConfig } = hooks;

console.log('I18N', kit.I18N);
console.log('kit', kit);
console.log('utils', utils);
console.log('service', service);
console.log('hooks', hooks);

console.log('baseHooks', baseHooks);
console.log('baseUtils', baseUtils);
console.log('baseService', baseService);
console.log('baseKit', baseKit);

export function Home() {
  const devInfo = useDevInfo();

  const [dpState, setDpState] = useDpState();
  const panelConfig = usePanelConfig();

  useEffect(() => {
    console.log(panelConfig);
  }, [panelConfig]);

  // usePageEvent('onShow', () => {
  //   console.log('=== home onShow');
  // });

  // usePageEvent('onHide', () => {
  //   console.log('=== home onHide');
  // });

  // usePageEvent('onPageScroll', event => {
  //   console.log('=== onPageScroll', event);
  // });

  // usePageEvent('onReachBottom', () => {
  //   console.log('=== onReachBottom');
  // });

  // usePageEvent('onResize', event => {
  //   console.log('=== onResize', event);
  // });

  const boolDpSchema = devInfo?.schema.find(data => data?.property?.type === 'bool');

  const data = [
    { key: 'page-dpState', title: Strings.formatValue('checkDpState', devInfo?.name) },
    { key: 'page-appState', title: '查看 App 信息' },
    { key: 'page-location', title: '查看路由信息' },
    {
      key: 'publishDps',
      title: '调用 publishDps 下发 DP 点',
      text: boolDpSchema
        ? `${boolDpSchema.code}: ${dpState[boolDpSchema.code]}`
        : '当前产品不存在可下发的布尔类型 DP 点',
      onPress: () => {
        if (!boolDpSchema) {
          return;
        }
        const dps = {
          [boolDpSchema.id]: !dpState[boolDpSchema.code],
        };
        setDpState(dps);
        // publishDps({
        //   deviceId: devInfo.devId,
        //   dps, // {'dpid': dpValue, '2': false}
        //   mode: 2,
        //   pipelines: [],
        //   options: {}, // 0，静音； 1，震动；2,声音； 3，震动声音
        //   success: info => console.log('=== publishDps success', dps, info),
        //   fail: error => console.warn('=== publishDps fail', error),
        // });
      },
    },
    {
      key: 'requestCloud',
      title: '调用 requestCloud 获取静态资源域名',
      onPress: async () => {
        const assetHostname = await service.getAssetHostname();
        console.log('assetHostname', assetHostname);
      },
    },
    {
      key: 'getAppInfo',
      title: '调用 getAppInfo 获取 App 信息',
      onPress: () => {
        getAppInfo({
          success: info => console.log('=== getAppInfo success', info),
          fail: error => console.warn('=== getAppInfo fail', error),
        });
      },
    },
    {
      key: 'getDeviceInfo',
      title: '调用 getDeviceInfo 获取设备信息',
      onPress: () => {
        getDeviceInfo({
          deviceId: devInfo.devId,
          success: info => console.log('=== getDeviceInfo success', info),
          fail: error => console.warn('=== getDeviceInfo fail', error),
        });
      },
    },
    {
      key: 'getLangContent',
      title: '调用 getLangContent 获取多语言',
      onPress: () => {
        getLangContent({
          success: info => console.log('=== getLangContent success', info),
          fail: error => console.warn('=== getLangContent fail', error),
        });
      },
    },
    {
      key: 'getSystemInfo',
      title: '调用 getSystemInfo 获取手机信息',
      onPress: () => {
        getSystemInfo({
          success: info => console.log('=== getSystemInfo success', info),
          fail: error => console.warn('=== getSystemInfo fail', error),
        });
      },
    },
    {
      key: 'openTimerPage',
      title: '调用 openTimerPage 去定时页面',
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
          success: info => console.log('=== openTimerPage success', info),
          fail: error => console.warn('=== openTimerPage fail', error),
        });
      },
    },
    {
      key: 'openDeviceDetailPage',
      title: '调用 openDeviceDetailPage 去设备详情',
      onPress: () => {
        const { devId, groupId } = devInfo;
        openDeviceDetailPage({
          deviceId: devId,
          groupId,
          success: info => console.log('=== openDeviceDetailPage success', info),
          fail: error => console.warn('=== openDeviceDetailPage fail', error),
        });
      },
    },
    {
      key: 'showToast',
      title: '调用 showToast 打开吐司',
      onPress: () => {
        showToast({
          title: '这是一个toast',
        });
      },
    },
    {
      key: 'showLoading',
      title: '调用 showLoading 打开 Loading',
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
        {data.map(({ key, title, text, onPress }) => {
          return (
            <Section key={key} title={title}>
              <Button
                className={styles.button}
                onClick={
                  onPress ||
                  (() => {
                    router.push(`/common/${key!}/index`);
                  })
                }
              >
                <Text className={styles.bTitle}>{text || 'Click me'}</Text>
              </Button>
            </Section>
          );
        })}
      </View>
    </ScrollView>
  );
}

export default Home;
