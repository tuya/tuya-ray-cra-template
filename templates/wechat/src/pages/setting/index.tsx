import React, { useState } from 'react';
import { useBoolean } from 'ahooks';
import { setNavigationBarTitle, Text, View } from '@ray-js/ray';
import { DpSchema, DpBooleanAction, useProps } from '@ray-js/panel-sdk';
import TyCell from '@ray-js/components-ty-cell';
import TySwitch from '@ray-js/components-ty-switch';
import TyActionsheet from '@ray-js/components-ty-actionsheet';
import { Icon } from '@/components';
import { devices } from '@/devices';
import { icons } from '@/res';
import Strings from '@/i18n';
import { useSystemInfo } from '@/hooks/useSystemInfo';
import { getSettingDps } from '@/utils/dp';
import { DpEnumContent } from './dp-enum-content';
import { DpValueContent } from './dp-value-content';
import styles from './index.module.less';

export default function Setting() {
  const devInfo = devices.socket.getDevInfo();
  const dpState = useProps();
  const sysInfo = useSystemInfo();
  const [visible, { setTrue: setVisibleTrue, setFalse: setVisibleFalse }] = useBoolean(false);
  const [currentSchema, setCurrentSchema] = useState<DpSchema>(null);
  const [currentDpValue, setCurrentDpValue] = useState(null);

  React.useEffect(() => {
    setNavigationBarTitle({ title: Strings.getLang('setting') });
  }, []);

  const dataSource = getSettingDps(devInfo).map(schema => {
    const { code, mode } = schema;
    const type = schema?.property?.type;
    const value = dpState[code as any];
    const BoolItem = (
      <TySwitch
        style={{ pointerEvents: 'auto' }}
        disabled={mode === 'ro'}
        checked={dpState[code] as boolean}
        onChange={(v, evt) => {
          evt?.origin?.stopPropagation();
          const action = devices.socket.model.actions[code] as DpBooleanAction;
          action.set(v);
        }}
      />
    );
    const CommonItem = (
      <View className={styles['right-item']}>
        <Text>{type === 'value' ? value : Strings.getDpLang(code, value)}</Text>
        <Icon
          d={icons.arrow}
          fill={sysInfo.theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(51, 51, 51, 0.5)'}
          size="12px"
        />
      </View>
    );
    const itemDisabled = mode === 'ro' || type === 'bool';
    return {
      id: code,
      style: { pointerEvents: itemDisabled ? 'none' : 'auto' },
      title: Strings.getDpLang(code),
      disabled: mode === 'ro',
      content: type === 'bool' ? BoolItem : CommonItem,
      onClick: () => {
        setCurrentSchema({ ...schema });
        setVisibleTrue();
      },
    };
  });

  const flushState = React.useCallback(() => {
    setCurrentDpValue(null);
    setVisibleFalse();
  }, []);

  const renderActionSheetDpContent = () => {
    let actionSheetDpContent: JSX.Element;
    switch (currentSchema?.property?.type) {
      case 'enum': {
        actionSheetDpContent = (
          <DpEnumContent
            value={currentDpValue || dpState[currentSchema.code]}
            schema={currentSchema}
            onItemClick={value => setCurrentDpValue(value)}
          />
        );
        break;
      }
      case 'value': {
        actionSheetDpContent = (
          <DpValueContent
            value={currentDpValue || dpState[currentSchema.code]}
            schema={currentSchema}
            onChange={value => setCurrentDpValue(value)}
          />
        );
        break;
      }
      default:
        actionSheetDpContent = null;
        break;
    }
    return actionSheetDpContent;
  };

  return (
    <>
      <TyCell dataSource={dataSource} rowKey="id" isRow />
      <TyActionsheet
        position="bottom"
        show={visible}
        header={Strings.getDpLang(currentSchema?.code)}
        cancelText={Strings.getLang('cancel')}
        okText={Strings.getLang('confirm')}
        onClickOverlay={flushState}
        onCancel={flushState}
        onOk={() => {
          if (currentDpValue !== null) {
            devices.socket.model.actions[currentSchema?.code].set(currentDpValue);
          }
          flushState();
        }}
      >
        {renderActionSheetDpContent()}
      </TyActionsheet>
    </>
  );
}
