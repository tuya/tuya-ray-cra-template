import { showToast } from '@ray-js/api';
import { hooks } from '@ray-js/panel-sdk';
import { useAtomValue, useSetAtom } from 'jotai';
import React from 'react';
import { initDevInfo } from '@/api';
import { devInfoAtom, selectDevInfoAtom } from '@/atoms';

import Strings from './i18n';

const { useDpState, useDevInfo } = hooks;
function withDevicePanel(WrappedComponent: any) {
  const PanelComponent: React.FC = props => {
    const setDevInfo = useSetAtom(devInfoAtom);
    const devInfoInAtom = useAtomValue(selectDevInfoAtom);
    const devInfo = useDevInfo();
    const dpState = useDpState();

    React.useEffect(() => {
      initDevInfo().then(initalDevInfo => {
        setDevInfo(initalDevInfo);
      });
    }, []);
    console.log('devInfoInAtom:', devInfoInAtom);

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
    return <WrappedComponent devInfo={devInfo} {...props} />;
  };

  return PanelComponent;
}

export default withDevicePanel;
