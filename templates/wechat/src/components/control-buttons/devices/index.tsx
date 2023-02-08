import React, { useCallback, useEffect, useState } from 'react';
import TyActionsheet from '@ray-js/components-ty-actionsheet';
import TyCell from '@ray-js/components-ty-cell';
import { icons } from '@/res';
import Strings from '@/i18n';
import { Icon } from '../../icon';

interface Props {
  devices: any[];
  current: string;
  visible: boolean;
  onClose: () => void;
  onSelected: (devId: string) => void;
}

const Devices: React.FC<Props> = ({
  current,
  devices,
  visible,
  onClose,
  onSelected,
}) => {
  const [devId, setDevId] = useState('');

  const handleOk = useCallback(() => {
    onSelected(devId);
  }, [devId, onSelected]);

  useEffect(() => {
    setDevId(current);
  }, [current]);

  return (
    <TyActionsheet
      position="bottom"
      show={visible}
      header="请选择设备"
      cancelText={Strings.getLang('cancel')}
      okText={Strings.getLang('confirm')}
      onClickOverlay={onClose}
      onCancel={onClose}
      onOk={handleOk}
    >
      <TyCell.Row
        style={{ margin: 0 }}
        rowKey="id"
        dataSource={devices.map((item) => ({
          id: item.id,
          title: item.name,
          content: devId === item.id && (
            <Icon viewBox="0 0 15 15" d={icons.selected} size="15px" />
          ),
          onClick: () => {
            setDevId(item.id);
          },
        }))}
      ></TyCell.Row>
    </TyActionsheet>
  );
};

export default Devices;
