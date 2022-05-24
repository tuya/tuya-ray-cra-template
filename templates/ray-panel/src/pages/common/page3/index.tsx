import { useSelector } from '@/redux';
import { Button, ScrollView, Text } from '@ray-js/components';
import { router } from 'ray';
import React from 'react';
import styles from '../../home/index.module.less';

function Page3() {
  const fun = useSelector(state => state.panelConfig.fun);
  const bic = useSelector(state => state.panelConfig.bic);
  const misc = useSelector(state => state.panelConfig.misc);
  console.log(`fun`, fun);
  console.log(`bic`, bic);
  console.log(`misc`, misc);
  return (
    <ScrollView>
      <Button
        className={styles.button}
        onClick={() => {
          router.back();
        }}
      >
        <Text className={styles.bTitle}>返回上一页</Text>
      </Button>
      <Text className={styles.bTitle}>
        panelConfig.fun（panel-dashboard 云能力或 NG 的功能点配置）
      </Text>
      <Text className={styles.bTitle}>
        panelConfig.bic（IoT 上的云功能即，云定时开关，跳转链接）
      </Text>
      <Text className={styles.bTitle}>panelConfig.misc（项目自定义配置信息）</Text>
    </ScrollView>
  );
}

export default Page3;
