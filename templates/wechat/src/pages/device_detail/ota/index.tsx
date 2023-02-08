import {
  showLoading,
  View,
  useQuery,
  hideLoading,
  Button,
  showToast,
} from '@ray-js/ray';
import {
  getOTAInfo,
  onOTAUpgradeStatus,
  offOTAUpgradeStatus,
  upgradeOTAInfo,
} from '@ray-js/wechat';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.less';

const renderButton = (item: any, onUpgrade: (item: any) => void) => {
  if (item.upgradeStatus > 0) {
    if (item.upgradeStatus === 1) {
      return (
        <Button className={styles.upgradeBtn} onClick={() => onUpgrade(item)}>
          更新
        </Button>
      );
    }
    if (item.upgradeStatus === 2) {
      return <View className={styles.upgradeDesc}>更新中</View>;
    }
  }
  return <View className={styles.upgradeDesc}>已最新</View>;
};

const DeviceOta: FC = () => {
  const [modules, setModules] = useState([]);
  const [upgradeStatus, setUpgradeStatus] = useState(0);
  const { deviceId } = useQuery();

  useEffect(() => {
    const fetchOtaInfo = async () => {
      const { upgradeStatus, moduleList } = await getOTAInfo({
        deviceId,
      });
      setModules(moduleList);
      setUpgradeStatus(upgradeStatus);
      if (upgradeStatus === 2) {
        showLoading({
          title: '更新中',
        });
      }
    };
    fetchOtaInfo();
    const handleUpgradeEvent = (res: any) => {
      if (res.deviceId === deviceId) {
        if (res.status !== 1 && res.status !== 2) {
          hideLoading();
          fetchOtaInfo();
        }
      }
    };
    onOTAUpgradeStatus(handleUpgradeEvent);

    return () => {
      offOTAUpgradeStatus(handleUpgradeEvent);
    };
  }, []);

  const handleUpgrade = useCallback(async (item: any) => {
    try {
      showLoading({
        title: '更新中',
      });
      await upgradeOTAInfo({ deviceId, otaInfo: item });
      hideLoading();
    } catch (e) {
      console.log(e);
      hideLoading();
      showToast({
        title: '更新中',
        duration: 5000,
      });
    }
  }, []);
  return (
    <View className={styles.container}>
      {/* 最新版本 */}
      {upgradeStatus === 0 ? (
        <View className={styles.lastBox}>
          <View className={styles.success}></View>
          <View className={styles.lastTitle}>已是最新版本</View>
          {modules.map((item) => {
            return (
              <View>
                {item.moduleDesc}：V{item.currentVersion}
              </View>
            );
          })}
        </View>
      ) : (
        <View className={styles.modules}>
          {modules.map((item) => {
            return (
              <View className={styles.module}>
                <View className={styles.title}>
                  {item.moduleDesc}：V{item.currentVersion}
                </View>
                {renderButton(item, handleUpgrade)}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default DeviceOta;
