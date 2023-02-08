import { View } from '@ray-js/ray';
import React, { FC, useState } from 'react';
import styles from './index.module.less';
import List from './list';

enum TabType {
  ALARM,
  HOME,
  NOTIFY,
}

const tabTranslateX = ['0%', '-100%', '-200%'];
const Message: FC = () => {
  const [tab, setTab] = useState<TabType>(TabType.ALARM);
  const handleChangeTab = async (type: TabType) => {
    setTab(type);
  };

  return (
    <View className={styles.box}>
      <View className={styles.tabs}>
        <View
          className={styles.tabItem}
          onClick={() => handleChangeTab(TabType.ALARM)}
        >
          告警 {tab === TabType.ALARM && <View className={styles.line} />}
        </View>
        <View
          className={styles.tabItem}
          onClick={() => handleChangeTab(TabType.HOME)}
        >
          家庭{tab === TabType.HOME && <View className={styles.line} />}
        </View>
        <View
          className={styles.tabItem}
          onClick={() => handleChangeTab(TabType.NOTIFY)}
        >
          消息{tab === TabType.NOTIFY && <View className={styles.line} />}
        </View>
      </View>
      <View
        className={styles.tabContents}
        style={{ transform: `translateX(${tabTranslateX[tab]})` }}
      >
        <List tab={TabType.ALARM} hasIcon={false} />
        <List tab={TabType.HOME} hasIcon />
        <List tab={TabType.NOTIFY} hasIcon />
      </View>
    </View>
  );
};

export default Message;
