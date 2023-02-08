import { Image, View, useQuery, getDeviceInfo, Input } from '@ray-js/ray';
import { onDeviceInfoUpdated, offDeviceInfoUpdated } from '@ray-js/api';
import { updateDeviceName } from '@ray-js/wechat';
import TyCell from '@ray-js/components-ty-cell';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { icons } from '@/res';
import { Icon } from '@/components';

const DeviceDetail: FC = () => {
  const [device, setDevice] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const name = useRef('');
  const { deviceId } = useQuery();
  useEffect(() => {
    const fetchDeviceDetail = async (res: any = {}) => {
      if (res.deviceId === deviceId) {
        const device = await getDeviceInfo({ deviceId });
        if (device) {
          setDevice({ ...device });
        }
      }
    };
    onDeviceInfoUpdated(fetchDeviceDetail);
    fetchDeviceDetail({ deviceId });
    return () => {
      offDeviceInfoUpdated(fetchDeviceDetail);
    };
  }, []);

  const hanldeEditName = useCallback(() => {
    setShowEdit(true);
  }, []);
  const handleCancel = useCallback(() => {
    setShowEdit(false);
  }, []);
  const handleOk = useCallback(async () => {
    if (name.current) {
      setShowEdit(false);
      await updateDeviceName({ deviceId, name: name.current });
    }
  }, []);
  const changeName = useCallback((e) => {
    name.current = e.value;
  }, []);
  return (
    <View className={styles.container}>
      <View className={styles.iconBox}>
        <Image src={device.icon} className={styles.icon} />
      </View>
      <TyCell.Item
        gap="16px"
        title={device.name}
        content={
          <Icon d={icons.arrow} fill="rgba(51, 51, 51, 0.5)" size="12px" />
        }
        onClick={hanldeEditName}
      />
      {showEdit && (
        <View className={styles.dialogContainer}>
          <View className={styles.dialogMask} />
          <View className={styles.dialog}>
            <View className={styles.dialogTitle}>重命名</View>
            <View className={styles.dialogBody}>
              <Input value={device.name} onInput={changeName} />
            </View>
            <View className={styles.dialogFooter}>
              <View className={styles.dialogBtn} onClick={handleCancel}>
                取消
              </View>
              <View
                className={styles.dialogBtn}
                style={{ color: '#000' }}
                onClick={handleOk}
              >
                确认
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default DeviceDetail;
