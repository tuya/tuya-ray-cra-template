import React, { useCallback, useRef } from 'react';
import { setNavigationBarTitle, usePageEvent, View } from '@ray-js/ray';
import { connectBLEDevice } from '@ray-js/api';
import { isCapability } from '@ray-js/wechat';
import { CountdownTip, PowerButton, ControlButtons } from '@/components';
import { useDevice } from '@ray-js/panel-sdk';
import { devices } from '@/devices';
import { HomeBottom } from './home-bottom';
import styles from './index.module.less';


export function Home() {
  const dpSchema = devices.socket.getDpSchema();
  const devInfo = devices.socket.getDevInfo();
  const newDevInfo = useDevice((d) => d.devInfo);
  const isShow = useRef(true);
  React.useEffect(() => {
    /**
     * 疑似会在其他设备事件变更时推送过来 https://lean.tuya-inc.com:7799/task/9c90e9421bfd403b93437a59ba32fa75
     * 后续需要观察下
     */
    if (newDevInfo.devId === devInfo.devId && isShow.current) {
      setNavigationBarTitle({ title: newDevInfo.name });
    }
  }, [newDevInfo.name]);
  // 确认修改名称后，回到此页面显示设备名称
  usePageEvent('onShow', () => {
    isShow.current = true;
    if (newDevInfo.devId === devInfo.devId) {
      setNavigationBarTitle({ title: newDevInfo.name });
    }
  });
  usePageEvent('onHide', () => {
    isShow.current = false;
  });

  const handleConnect = useCallback(() => {
    if (newDevInfo && isCapability(newDevInfo.capability, 10)) {
      // 尝试连接蓝牙
      connectBLEDevice({ deviceId: newDevInfo.devId });
    }
  }, [newDevInfo?.devId]);

  return (
    <View className={styles.view}>
      {newDevInfo && !newDevInfo.isOnline && (
        <View style={{ color: '#fff' }} onClick={handleConnect}>
          设备离线
        </View>
      )}
      <View className={styles.content}>
        <View className={styles['space-between']}>
          <PowerButton dpCode={dpSchema?.switch_1?.code} />
          {/* <TimerTip /> */}
          <CountdownTip
            powerCode={dpSchema?.switch_1?.code}
            countdownCode={dpSchema?.countdown_1?.code}
          />
        </View>
      </View>
      <ControlButtons />
      <HomeBottom />
    </View>
  );
}

export default Home;
