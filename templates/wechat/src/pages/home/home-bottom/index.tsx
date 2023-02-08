import React from 'react';
import { useBoolean } from 'ahooks';
import { useProps } from '@ray-js/panel-sdk';
import CountdownActionSheet from '@ray-js/countdown-action-sheet';
import { ControllerBar } from '@/components';
import { devices } from '@/devices';
import { icons } from '@/res';
import Strings from '@/i18n';
import { isSupportAdvancedTimer, isSupportSetting } from '@/utils/dp';
import { preloadOrGotoSubPanel, handleSettingClick } from './utils';

export const HomeBottom = React.memo(() => {
  const devInfo = devices.socket.getDevInfo();
  const dpSchema = devices.socket.getDpSchema();
  const [show, { setTrue, setFalse }] = useBoolean(false);

  const countdown = useProps(dpState => dpState.countdown_1);

  React.useEffect(() => {
    preloadOrGotoSubPanel(true);
  }, []);

  const handleStop = React.useCallback(() => {
    setFalse();
    devices.socket.model.actions.countdown_1.set(0);
  }, []);

  const handleOK = React.useCallback<React.ComponentProps<typeof CountdownActionSheet>['onOk']>(
    data => {
      setFalse();
      if (data.mode === 'set') {
        devices.socket.model.actions.countdown_1.set(data.value * 60);
      }
    },
    []
  );

  const hasSchedule = isSupportAdvancedTimer(devInfo);
  const hasCountdown = !!dpSchema?.countdown_1?.code;
  const hasSetting = isSupportSetting(devInfo);

  const dataSource = [
    hasSchedule && {
      d: icons.timer,
      text: Strings.getLang('schedule'),
      onClick: () => preloadOrGotoSubPanel(false),
    },
    hasCountdown && {
      d: icons.countdown,
      text: Strings.getDpLang(dpSchema.countdown_1?.code),
      onClick: setTrue,
    },
    hasSetting && {
      d: icons.setting,
      text: Strings.getLang('setting'),
      onClick: handleSettingClick,
    },
  ].filter(d => !!d);

  return (
    <>
      {dataSource.length > 0 && <ControllerBar dataSource={dataSource} />}
      <CountdownActionSheet
        show={show}
        title={Strings.getDpLang(dpSchema.countdown_1?.code)}
        value={Math.round(countdown / 60)}
        cancelText={Strings.getLang('cancel')}
        okText={Strings.getLang('confirm')}
        startText={Strings.getLang('start')}
        hourText={Strings.getLang('hour')}
        minuteText={Strings.getLang('minute')}
        countdownCloseText={Strings.getLang('countdownClose')}
        countdownCloseTipText={Strings.getLang('countdownCloseTip')}
        onClickOverlay={setFalse}
        onStop={handleStop}
        onCancel={setFalse}
        onOk={handleOK}
      />
    </>
  );
});
