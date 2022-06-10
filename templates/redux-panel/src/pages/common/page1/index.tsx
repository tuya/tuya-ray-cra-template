import { useSelector } from '@/redux';
import { Button, Text, View } from '@ray-js/components';
import { router } from 'ray';
import React from 'react';
import styles from '../../home/index.module.less';

function Page1() {
  const iotConfig = useSelector(state => state.panelConfig.iot);
  console.log(`iotConfig`, iotConfig);
  return (
    <View className={styles.view}>
      <Button
        className={styles.button}
        onClick={() => {
          router.push('/common/page2/index');
        }}
      >
        <Text className={styles.bTitle}>去 page 2 获取公版子 UI 配置</Text>
      </Button>
    </View>
  );
}

export default Page1;
