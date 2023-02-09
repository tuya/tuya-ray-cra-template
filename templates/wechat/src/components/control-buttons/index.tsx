import {
  getStorageSync,
  router,
  setStorageSync,
  usePageEvent,
  View,
  removeStorageSync,
} from '@ray-js/ray';
import {
  isLogin,
  connectMqtt,
  getFamilies,
  getDeviceList,
  openDistribution,
} from '@ray-js/wechat';
import React, { FC, useCallback, useState } from 'react';
import { initDevice } from '../../devices';
import styles from './index.module.less';
import Devices from './devices';

// 获取家庭下的设备
const fetchDevices = async () => {
  const families = await getFamilies();
  const family = families[0];

  // 获取家庭下的设备
  const devices = await getDeviceList(family.home_id);
  return [family, devices];
};

const CURRENT_DEVICE_KEY = 'currentDeviceId';

export const ControlButtons: FC = () => {
  const [hasLogin, setHasLogin] = useState(false);
  const [showDevices, setShowDevices] = useState(false);
  const [family, setFamily] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const [devId, setDevId] = useState(() => {
    return (
      getStorageSync({
        key: CURRENT_DEVICE_KEY,
      }) || ''
    );
  });
  usePageEvent('onShow', async () => {
    const res = await isLogin();
    if (!hasLogin && res) {
      connectMqtt();
      // 获取设备
      const [family, devices] = await fetchDevices();
      setFamily(family);
      setDeviceList(devices);
      if (devices.length) {
        let device = devices.find((item: any) => item.id === devId);
        if (!device) {
          device = devices[0];
        }
        // 初始化设备
        initDevice(device.id);
        setDevId(device.id);
        setStorageSync({
          key: CURRENT_DEVICE_KEY,
          data: device.id,
        });
      } else {
        removeStorageSync({
          key: CURRENT_DEVICE_KEY,
        });
        setDevId('');
      }
    }
    !res && setShowMenu(false);
    setHasLogin(res);
  });
  // 登录及导航显示处理
  const handleLogin = useCallback(async () => {
    if (!hasLogin) {
      router.push('/login');
    } else {
      setShowMenu(!showMenu);
    }
  }, [hasLogin, showMenu]);

  // 添加设备
  const handleAddDevice = useCallback(async () => {
    if (family) {
      openDistribution({ homeId: family.home_id });
    }
  }, [family]);

  const handleShowDevices = useCallback(() => {
    setShowDevices(true);
  }, []);
  const handleCloseDevices = useCallback(() => {
    setShowDevices(false);
  }, []);
  const handleChangeDevice = useCallback((devId: string) => {
    setDevId(devId);
    setStorageSync({
      key: CURRENT_DEVICE_KEY,
      data: devId,
    });
    initDevice(devId);
    setShowDevices(false);
  }, []);

  const handleToCenter = useCallback(() => {
    router.push('/center');
  }, []);
  const handleToMessage = useCallback(() => {
    router.push('/message');
  }, []);
  const handleToDeviceDetail = useCallback(() => {
    router.push(`/deviceDetail/${devId}`, {
      subpackage: 'pages/device_detail/',
    });
  }, [devId]);
  return (
    <View className={styles.box}>
      <View className={styles.btn} onClick={handleLogin}>
        {hasLogin ? '导航' : '登录'}
      </View>
      {/* 其他按钮 */}
      {hasLogin && (
        <View
          className={styles.menus}
          style={{ display: showMenu ? 'block' : 'none' }}
        >
          <View className={styles.btn} onClick={handleAddDevice}>
            添加设备
          </View>
          {deviceList.length > 1 && (
            <View className={styles.btn} onClick={handleShowDevices}>
              切换设备
            </View>
          )}
          <View className={styles.btn} onClick={handleToCenter}>
            个人中心
          </View>
          <View className={styles.btn} onClick={handleToMessage}>
            消息中心
          </View>
          <View className={styles.btn} onClick={handleToDeviceDetail}>
            设备详细
          </View>
        </View>
      )}
      <Devices
        visible={showDevices}
        devices={deviceList}
        onClose={handleCloseDevices}
        onSelected={handleChangeDevice}
        current={devId}
      />
    </View>
  );
};
