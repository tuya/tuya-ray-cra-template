import {
  Button,
  hideLoading,
  navigateBack,
  showLoading,
  showModal,
  View,
} from '@ray-js/ray';
import { loginByWx } from '@ray-js/wechat';
import { connectMqtt } from '@ray-js/wechat';
import React, { FC, useCallback } from 'react';
import styles from './index.module.less';
import { res } from '@/res';

const Login: FC = () => {
  const handleLogin = useCallback(async () => {
    try {
      showLoading({
        title: '正在登录...',
      });
      await loginByWx();
      // 连接 mqtt
      connectMqtt({ needReopen: true });
      navigateBack();
    } catch (e) {
      showModal({
        title: '登录失败',
      });
    } finally {
      hideLoading();
    }
  }, []);

  return (
    <View className={styles.box}>
      <Button className={styles.btn} onClick={handleLogin}>
        微信登录
      </Button>
    </View>
  );
};

export default Login;
