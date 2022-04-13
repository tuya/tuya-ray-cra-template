import React from 'react';
import _ from 'lodash';
import { View, Text } from '@ray/components';
import { IProps } from './interface';
import withLogic from './withLogic';

const mockFuncName = '功能名称';

function ShowArray(props: IProps) {
  const { value = [] } = props;

  if (!_.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <View
      style={{
        width: '720rpx',
        backgroundColor: '#fff',
        borderRadius: '28rpx',
        boxSizing: 'border-box',
        paddingLeft: '40rpx',
        paddingRight: '40rpx',
        paddingTop: '48rpx',
        paddingBottom: '48rpx',
      }}
    >
      <View style={{ marginBottom: '48rpx' }}>
        <Text style={{ fontSize: '30rpx', lineHeight: '48rpx', color: '#3d3d3d' }}>功能名称</Text>
      </View>
      {value.map((v, index) => (
        <View
          style={{
            height: '108rpx',
            backgroundColor: '#fbfbfb',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24rpx',
            paddingLeft: '24rpx',
            paddingRight: '24rpx',
            borderRadius: '16rpx',
          }}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          <Text
            style={{ fontSize: '24rpx', lineHeight: '48rpx', color: '#3d3d3d', width: '324rpx' }}
          >{`${mockFuncName}-${index}`}</Text>
          <Text style={{ fontSize: '24rpx', lineHeight: '48rpx', color: '#3d3d3d' }}>{v}</Text>
        </View>
      ))}
    </View>
  );
}

export default ShowArray;
export const LogicShowArray = withLogic(ShowArray);
