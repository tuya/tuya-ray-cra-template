import {
  offDpDataChange,
  onDpDataChange,
  showToast,
  getLaunchOptionsSync,
  registerDeviceListListener,
  subscribeDeviceRemoved,
  onDeviceRemoved,
  exitMiniProgram,
} from '@ray-js/api';
import { hooks } from '@ray-js/panel-sdk';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { getDevInfo, initDevInfo } from '@/api';
import { DpState, dpStateAtom, selectDpStateAtom } from '@/atoms';
import { getDpStateMapByDevInfo, mapDpsMapToDpStateMap } from '@/utils';
import Strings from './i18n';

const { useDevInfo } = hooks;

const withDevicePanel = (WrappedComponent: any) => {
  const PanelComponent: React.FC = props => {
    const setDpState = useSetAtom(dpStateAtom);
    const dpState = useAtomValue(selectDpStateAtom);
    const devInfo = useDevInfo();

    /**
     * 监听设备上下线状态变更
     */
    const handleDpDataChange: DpDataChangeHandler = data => {
      console.log('=== onDpDataChange', data);
      const initalDevInfo = getDevInfo();
      const newDpState = mapDpsMapToDpStateMap(data.dps, initalDevInfo) as DpState;
      setDpState(newDpState);
    };
    /**
     * 监听设备上下线状态变更
     */
    const handleDeviceRemoved: DeviceRemovedHandler = data => {
      console.log('=== onDeviceRemoved', data);
      exitMiniProgram();
    };

    React.useEffect(() => {
      // 如果已经支持基础库2.7.0. 则使用2.7.0中的方法
      // 包含通用的设备离线逻辑、设备注册逻辑等不必再使用 global.config.ts 中配置的   pageWrapper: ['@ray-js/ray-panel-wrapper/lib/page'],
      // @ts-ignore
      if (ty.panel && ty.panel.initPanelKit) {
        // @ts-ignore
        ty.panel.initPanelKit({ deviceId: getLaunchOptionsSync().query.deviceId });
      } else {
        // 否则使用 registerDeviceListListener 注册，删除上述条件方法
        // 若需要能用离线逻辑，则需要在 global.config.ts 中添加   pageWrapper: ['@ray-js/ray-panel-wrapper/lib/page'],
        registerDeviceListListener({ deviceIdList: [getLaunchOptionsSync().query.deviceId] });
      }
      subscribeDeviceRemoved({
        deviceId: getLaunchOptionsSync().query.deviceId,
        success: () => {
          onDeviceRemoved(handleDeviceRemoved);
        },
      });
      initDevInfo().then(initalDevInfo => {
        const initialDpState = getDpStateMapByDevInfo(initalDevInfo) as DpState;
        setDpState(initialDpState);
        onDpDataChange(handleDpDataChange);
      });
      return () => {
        offDpDataChange(handleDpDataChange);
      };
    }, []);

    const isInitialized = devInfo !== null && dpState !== null;
    const isDeviceSchemaEmpty = isInitialized && !devInfo?.schema?.length;

    if (!isInitialized) {
      return null;
    }

    /**
     * 设备 schema 为空的话给个提示
     */
    if (isDeviceSchemaEmpty) {
      showToast({ title: Strings.getLang('deviceSchemaEmptyTip') });
    }

    /**
     * 保证 devInfo 已存在时再去渲染组件，可以让组件内部消费 devInfo 更加稳定
     */
    return <WrappedComponent {...props} />;
  };

  return PanelComponent;
};

export default withDevicePanel;
