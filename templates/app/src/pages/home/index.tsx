import React from 'react';
import { location, router, usePageEvent, Button, View, Text } from '@ray-js/ray';

import Foo from '@/components/Foo';

import styles from './index.module.less';

export default function Home() {
  const fooRef = React.createRef();

  React.useEffect(() => {
    console.info('home did mount', location);
    console.log(fooRef.current);
  }, []);

  usePageEvent('onShow', () => {
    console.info('home onShow');
  });

  usePageEvent('onHide', () => {
    console.info('home onHide');
  });

  usePageEvent('onPageScroll', (event) => {
    console.info('onPageScroll', event);
  });

  usePageEvent('onReachBottom', () => {
    console.info('onReachBottom');
  });

  usePageEvent('onResize', (event) => {
    console.info('onResize', event);
  });

  return (
    <View className={styles.view}>
      Home
      <Button
        onClick={() => {
          router.push(`/my?v=${Date.now()}`);
        }}
      >
        <Text>个人中心</Text>
      </Button>
      <Foo ref={fooRef} />
      <View>
        <Text>进入详情页</Text>
        <Button
          onClick={() => {
            router.push(`/detail/${Date.now()}?v=${Date.now()}`);
          }}
        >
          详情页
        </Button>
      </View>
    </View>
  );
}
