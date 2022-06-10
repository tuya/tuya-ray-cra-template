import React from 'react';
import { View, Text } from '@ray-js/components';
import styles from './index.module.less';
import { Props } from './index.type';

const Section: React.FC<Props> = props => {
  const { title } = props;
  return (
    <View className={styles.section}>
      <Text className={styles.title}>{`· ${title}`}</Text>
      {props.children}
    </View>
  );
};

export default Section;
