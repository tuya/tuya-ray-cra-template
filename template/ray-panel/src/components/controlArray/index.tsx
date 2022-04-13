import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { View, Text, Image } from '@ray/components';
import Strings from '@/i18n';
import { IProps } from './interface';
import withLogic from './withLogic';
// eslint-disable-next-line import/no-cycle
import { CompList } from '../index';
import DeletePng from '../../res/delete.png';

/* 
  数组下元素类型
    - 数值型
    - 字符型
    - 布尔型
    - 枚举型
    - 透传型
    
    - 时间型 过滤
    - 故障型 过滤
*/

const elementDefaultValue = {
  value: 0,
  bool: false,
  string: '',
  raw: '',
};

function ControlArray(props: IProps) {
  const { itemType, accessMode, maxSize, value, image, title_name = '', handleControl } = props;
  const [valueList, setValueList] = useState(value ?? []);

  useEffect(() => {
    setValueList(value ?? []);
  }, [value]);

  const handleChange = (event: { type: string; value: any }, index: number) => {
    // eslint-disable-next-line no-shadow
    const { value } = event;
    const newValue = _.assign([], valueList);
    newValue[index] = value;
    setValueList(newValue);
  };

  const renderItem = (v: any, index: number) => {
    const Comp = _.get(CompList, `prop.${accessMode === 'ro' ? 'ro' : 'rwOrWr'}.${itemType}`);
    if (!Comp) {
      return null;
    }

    return accessMode !== 'ro' ? (
      <View
        style={{
          position: 'relative',
          marginBottom: '16rpx',
          width: '640rpx',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: '-20rpx',
            right: '-20rpx',
            width: '40rpx',
            height: '40rpx',
          }}
          onClick={() => removeItem(index)}
        >
          <Image
            src={DeletePng}
            style={{
              width: '40rpx',
              height: '40rpx',
            }}
          />
        </View>
        {React.createElement(Comp, {
          onChange: (e: { type: string; value: any }) => handleChange(e, index),
          onConfirm: (e: { type: string; value: any }) => handleChange(e, index),
          title_name: `${title_name}_${index}`,
          image,
          param_value: v,
          bg_width: '640rpx',
          bg_color: '#FBFBFB',
        })}
      </View>
    ) : (
      React.createElement(Comp, {
        title_name: `${title_name}_${index}`,
        image,
        param_value: v,
      })
    );
  };

  const addItem = () => {
    // 添加元素的时候不会下发数据
    /* 数组元素默认值
        - number：0
        - bool：false
        - string：''
        - raw: ''
    */
    setValueList(valueList.concat([elementDefaultValue[itemType]]));
  };

  const removeItem = (index) => {
    console.log('removeItem', index);
    const newViewList = _.assign([], valueList);
    newViewList.splice(index, 1);
    setValueList(newViewList);
  };

  const onSure = () => {
    _.isFunction(handleControl) && handleControl(valueList);
  };

  return (
    <View
      style={{
        width: '720rpx',
        paddingTop: '48rpx',
        // paddingBottom: '48rpx',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '28rpx',
      }}
    >
      <View
        style={{
          width: '100%',
          boxSizing: 'border-box',
          paddingLeft: '40rpx',
          height: '48rpx',
          marginBottom: '48rpx',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Image src={image} mode='aspectFill' style={{ width: '28rpx', height: '28rpx' }} />
        <Text style={{ fontSize: '30rpx', marginLeft: '24rpx', color: '#3D3D3D' }}>
          {title_name}
        </Text>
      </View>
      <View>{valueList.map((v, index) => renderItem(v, index))}</View>
      <View>
        {accessMode === 'ro' ? null : (
          <View>
            <View>
              {valueList.length < maxSize ? (
                <View
                  style={{
                    width: '640rpx',
                    height: '108rpx',
                    borderStyle: 'dashed',
                    borderColor: 'rgba(21, 140, 251, 0.3)',
                    borderWidth: '2rpx',
                    borderRadius: '16rpx',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onClick={addItem}
                >
                  <Text
                    style={{ color: 'rgba(21, 140, 251, 1)', fontSize: '24rpx' }}
                  >{`+ ${Strings.getLang('add_item')}`}</Text>
                </View>
              ) : null}
            </View>
            <View
              style={{
                marginTop: '40rpx',
                width: '640rpx',
                height: '92rpx',
                borderRadius: '16rpx',
                backgroundColor: 'rgba(21, 140, 251, 1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '48rpx',
              }}
              onClick={onSure}
            >
              <Text style={{ color: '#fff', fontSize: '24rpx' }}>{Strings.getLang('confirm')}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

export default ControlArray;
export const LogicControlArray = withLogic(ControlArray);
