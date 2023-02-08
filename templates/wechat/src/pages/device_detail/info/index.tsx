import { View, useQuery, setClipboardData } from '@ray-js/ray';
import TyCell from '@ray-js/components-ty-cell';
import React, { FC, useCallback, useRef, useState } from 'react';
import styles from './index.module.less';

const DeviceInfo: FC = () => {
  const [device, setDevice] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const name = useRef('');
  const { deviceId } = useQuery();
  const handleCopy = useCallback(() => {
    setClipboardData({
      data: deviceId,
    });
  }, []);
  return (
    <View className={styles.container}>
      <TyCell.Item
        gap="16px"
        title={`虚拟ID: ${deviceId}`}
        contentStyle={{ flex: 0, flexBasis: '36px' }}
        content={<View onClick={handleCopy}>复制</View>}
      />
    </View>
  );
};

export default DeviceInfo;
