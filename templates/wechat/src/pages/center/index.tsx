import { Button, Image, navigateBack, View } from '@ray-js/ray';
import { getUserInfo, logout, disconnectMqtt } from '@ray-js/wechat';
import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './index.module.less';
import { res } from '@/res';

const Center: FC = () => {
  const [userInfo, setUserInfo] = useState<any>(() => getUserInfo());

  const handleLogout = useCallback(async () => {
    await logout(true);
    disconnectMqtt();
    navigateBack();
  }, []);

  return (
    <View className={styles.box}>
      <View className={styles.userInfo}>
        <Image
          className={styles.avator}
          src={userInfo.avatar || res.defaultHeader}
        />
        <View className={styles.nickname}>
          {userInfo.nick_name || '暂无昵称'}
        </View>
      </View>
      <Button onClick={handleLogout}>退出登录</Button>
    </View>
  );
};

export default Center;
