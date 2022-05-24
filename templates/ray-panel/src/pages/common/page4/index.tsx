import { router, location } from 'ray';
import React from 'react';
import { Button, Text, View } from '@ray-js/components';
import styles from '../../home/index.module.less';

function Page4() {
  console.log(location);

  return (
    <View>
      <Button
        className={styles.button}
        onClick={() => {
          router.back();
        }}
      >
        <Text className={styles.bTitle}>返回上一页</Text>
      </Button>
    </View>
  );
}

export default Page4;
