import { offDpDataChange, onDpDataChange, showToast } from '@ray-js/api';
import { hooks, kit } from '@ray-js/panel-sdk';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { DpState, dpStateAtom, selectDpStateAtom } from '@/atoms';
import { getDpStateMapByDevInfo, mapDpsMapToDpStateMap } from '@/utils';
import Strings from './i18n';

const { useDevInfo } = hooks;
const { getDevInfo, initDevInfo } = kit;

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

    React.useEffect(() => {
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
