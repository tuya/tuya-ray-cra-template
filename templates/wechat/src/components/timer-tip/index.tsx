/* eslint-disable react/default-props-match-prop-types */
import React from 'react';
import { utils, useProps } from '@ray-js/panel-sdk';
import { View, Text } from '@ray-js/ray';
import Strings from '@/i18n';
import { devices } from '@/devices';
import { getLastTimer, getRepeatStrByNumber } from './utils';
// import styles from './index.module.less';

export const TimerTip: React.FC = () => {
  const devInfo = devices.socket.getDevInfo();
  const dpSchema = devices.socket.getDpSchema();

  const cycleTime = useProps((dpState) => dpState.cycle_time);
  const randomTime = useProps((dpState) => dpState.random_time);

  /**
   * 如果是 zigbee 的设备为 raw 型解析格式,
   * 更多见 https://registry.code.tuya-inc.top/tuyarn-customize/000001d7tx/-/blob/master/src/pages/index.tsx#L73
   */
  const isRaw = !!utils.getBitValue(devInfo.capability, 12);
  const lastTimer = getLastTimer({ cycleTime, randomTime, isRaw });

  return (
    <View>
      <View>
        <Text>
          {Strings.getDpLang(
            lastTimer.startDuration
              ? dpSchema.cycle_time?.code
              : dpSchema.random_time?.code
          )}
          :
        </Text>
        {!!lastTimer.loops && (
          <Text>{getRepeatStrByNumber(lastTimer.loops)}</Text>
        )}
      </View>
      <View>
        {!!lastTimer.startTime && (
          <Text>{utils.parseHour12(lastTimer.startTime * 60)}</Text>
        )}
        <Text>{Strings.getLang('on')}</Text>
        {!!lastTimer.endTime && (
          <Text>{utils.parseHour12(lastTimer.endTime * 60)}</Text>
        )}
        <Text>{Strings.getLang('off')}</Text>
      </View>
    </View>
  );
};
