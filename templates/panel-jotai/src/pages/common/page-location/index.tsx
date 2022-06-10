import { router, location, usePageEvent } from 'ray';
import React from 'react';
import { Button, Text, View } from '@ray-js/components';
import styles from '../../home/index.module.less';

function PageLocation() {
  console.log('=== location', location);

  usePageEvent('onShow', () => {
    console.log('=== page-location onShow');
  });

  usePageEvent('onHide', () => {
    console.log('=== page-location onHide');
  });
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

export default PageLocation;
