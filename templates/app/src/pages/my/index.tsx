import React from 'react';

import { Button, View, Text, router, location  } from '@ray-js/ray';

import styles from './index.module.less';

class My extends React.Component {
  componentDidMount() {
    console.log(location);
  }

  onShow() {
    console.info('my onShow');
  }

  onHide() {
    console.info('my onHide');
  }

  render() {
    return (
      <View className={styles.view}>
        <Text>My Center</Text>
        <Button
          onClick={() => {
            router.push('/');
          }}
        >
          回到首页
        </Button>
      </View>
    );
  }
}

export default My;
