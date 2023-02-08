import {
  Button,
  Image,
  View,
  router,
  useQuery,
  getDeviceInfo,
  reLaunch,
  showModal,
  getCurrentPages,
  showToast,
} from '@ray-js/ray';
import { getFamilies, getOTAInfo } from '@ray-js/wechat';
import {
  removeDevice,
  resetFactory,
  onDeviceInfoUpdated,
  offDeviceInfoUpdated,
} from '@ray-js/api';
import TyCell from '@ray-js/components-ty-cell';
import TyActionsheet from '@ray-js/components-ty-actionsheet';
import React, { FC, useCallback, useEffect, useState } from 'react';
import styles from './index.module.less';
import { res, icons } from '@/res';
import _ from 'lodash';
import { Icon } from '../../components/icon';

const DeviceDetail: FC = () => {
  const [isHomeManager, setIsHomeManager] = useState(false);
  const [showSelections, setShowSelection] = useState(false);
  const [otaStatus, setOtaStatus] = useState(0);
  const [device, setDevice] = useState({});

  const { deviceId } = useQuery();

  useEffect(() => {
    let isFirst = true;
    const fetchDeviceDetail = async (res: any = {}) => {
      if (res.deviceId === deviceId) {
        const device = await getDeviceInfo({ deviceId });
        if (device) {
          setDevice({ ...device });
          if (isFirst) {
            // 获取家庭
            const families = await getFamilies();
            const family = families.find(
              (item) => Number(item.home_id) === Number(device.ownerId)
            );
            if (family) {
              setIsHomeManager(family.role === 'OWNER');
            }

            // ota相关
            const { upgradeStatus } = await getOTAInfo({ deviceId });
            setOtaStatus(upgradeStatus);
          }
          isFirst = false;
        }
      }
    };
    onDeviceInfoUpdated(fetchDeviceDetail);
    fetchDeviceDetail({ deviceId });
    return () => {
      offDeviceInfoUpdated(fetchDeviceDetail);
    };
  }, []);

  const handleDeleteDevice = useCallback(() => {
    if (!isHomeManager) {
      return showToast({
        title: '您不是管理员，不能进行此操作',
        icon: 'none',
      });
    }
    setShowSelection(true);
  }, [isHomeManager]);

  const handleCancelDelete = useCallback(() => {
    setShowSelection(false);
  }, []);

  const handleRemoveDevice = useCallback(async () => {
    setShowSelection(false);
    showModal({
      title: '确定要解绑设备吗？',
      content: '解绑设备后，其相关功能将不可用',
      success: async (res: any) => {
        if (res.confirm) {
          try {
            await removeDevice({ deviceId });
            // 重新加载小程序
            const pages = getCurrentPages();
            reLaunch({
              url: `/${pages[0].route}`,
            });
          } catch (e) {
            showToast({
              title: '移除设备失败',
            });
          }
        }
      },
    });
  }, [deviceId]);
  const handleResetFactory = useCallback(() => {
    setShowSelection(false);
    showModal({
      title: '确定要解绑并清除数据吗？',
      content: '设备将恢复出厂设置，从设备列表移除，设备相关数据将全部清除',
      success: async (res: any) => {
        if (res.confirm) {
          try {
            await resetFactory({ deviceId });
            // 重新加载小程序
            const pages = getCurrentPages();
            reLaunch({
              url: `/${pages[0].route}`,
            });
          } catch (e) {
            showToast({
              title: '解绑并清除数据失败',
            });
          }
        }
      },
    });
  }, [deviceId]);

  const hanldeToName = useCallback(() => {
    router.push(`/deviceDetail/name/${deviceId}`, {
      subpackage: 'pages/device_detail/',
    });
  }, []);
  const hanldeToInfo = useCallback(() => {
    router.push(`/deviceDetail/info/${deviceId}`, {
      subpackage: 'pages/device_detail/',
    });
  }, []);
  const hanldeToOta = useCallback(() => {
    router.push(`/deviceDetail/ota/${deviceId}`, {
      subpackage: 'pages/device_detail/',
    });
  }, []);
  return (
    <View className={styles.container}>
      <TyCell.Item
        title={
          <View className={styles.nameBox}>
            <Image src={device.icon} className={styles.icon} />
            {device.name}
          </View>
        }
        content={
          <Icon d={icons.arrow} fill="rgba(51, 51, 51, 0.5)" size="12px" />
        }
        onClick={hanldeToName}
      />
      <TyCell.Item
        gap="16px"
        title="设备信息"
        content={
          <Icon d={icons.arrow} fill="rgba(51, 51, 51, 0.5)" size="12px" />
        }
        onClick={hanldeToInfo}
      />
      <TyCell.Item
        gap="16px"
        title="设备升级"
        content={
          <View className={`${styles.ota} ${otaStatus > 0 ? styles.new : ''}`}>
            {otaStatus === 0 ? '已是最新版本' : ''}
            <Icon d={icons.arrow} fill="rgba(51, 51, 51, 0.5)" size="12px" />
          </View>
        }
        onClick={hanldeToOta}
      />

      <Button className={styles.removeBtn} onClick={handleDeleteDevice}>
        移除设备
      </Button>
      <TyActionsheet
        position="bottom"
        show={showSelections}
        header="请选择操作"
        cancelText="取消"
        okText={null}
        onClickOverlay={handleCancelDelete}
        onCancel={handleCancelDelete}
      >
        <View className={styles.selections}>
          <View className={styles.item} onClick={handleRemoveDevice}>
            移除设备
          </View>
          <View className={styles.item} onClick={handleResetFactory}>
            移除设备并删除数据
          </View>
        </View>
      </TyActionsheet>
    </View>
  );
};

export default DeviceDetail;
