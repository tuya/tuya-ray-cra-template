import React, { Component } from 'react';
import { thingDpType } from '@/constant';

function withLogic(Comp): React.ReactNode {
  class LogicComp extends Component<{
    thingModelDp: ty.device.ThingProperty;
    devId: string;
    title_name?: string;
    image?: any;
    param_value?: any;
  }> {
    handleControl = value => {
      const { devId, thingModelDp } = this.props;
      const { code } = thingModelDp;
      ty.device.publishThingModelMessage({
        devId,
        type: thingDpType.prop,
        payload: {
          [code]: value,
        },
        success: () => console.log('下发成功'),
        fail: () => console.log('下发失败'),
      });
    };

    render() {
      const { thingModelDp, title_name, image, param_value = [] } = this.props;
      const {
        typeSpec: {
          maxSize,
          elementTypeSpec: { type },
        },
        accessMode,
      } = thingModelDp;

      // 数组元素过滤故障/时间/枚举
      if (type === 'bitmap' || type === 'date' || type === 'enum') {
        return null;
      }
      return (
        <Comp
          image={image}
          title_name={title_name}
          itemType={type}
          accessMode={accessMode}
          maxSize={maxSize}
          value={param_value}
          handleControl={this.handleControl}
        />
      );
    }
  }

  return LogicComp;
}

export default withLogic;
