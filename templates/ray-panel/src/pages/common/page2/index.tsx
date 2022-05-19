import { useIoTOtherUIValue, useIoTUIValue } from '@/redux';
import { ScrollView, View, Button, Text } from '@ray-js/components';
import { router } from 'ray';
import React from 'react';
import styles from '../../home/index.module.less';

interface Props {
  title: string;
  color: string;
}

const Box: React.FC<Props> = props => {
  const { title, color } = props;
  return (
    <>
      <Text>{title}</Text>
      <View style={{ width: 100, height: 100, backgroundColor: color }} />
    </>
  );
};

function Page2() {
  const fontColor = useIoTUIValue('fontColor');
  const themeColor = useIoTUIValue('themeColor');
  const source = useIoTUIValue('mode', '1'); // 需要使用支持该子 ui 配置的产品如 yea7txrxc5qp54px
  const otherTestValue = useIoTOtherUIValue('test', 'defaultValue');
  console.log('fontColor :>> ', fontColor);
  console.log('themeColor :>> ', themeColor);
  console.log('source :>> ', source);
  console.log('otherTestValue :>> ', otherTestValue);

  const json = {
    fontColor,
    themeColor,
    source,
    otherTestValue,
  };

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
      <Box title="fontColor" color={fontColor} />
      <Box title="themeColor" color={themeColor} />
    </ScrollView>
  );
}

export default Page2;
