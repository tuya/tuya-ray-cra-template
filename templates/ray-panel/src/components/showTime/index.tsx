import React, { Component } from 'react';
import { View, Text, Image } from '@ray-js/components';
import { formatTime } from '@/utils';
import Strings from '@/i18n';
import rect from '@/res/rect.png';
import { ITimeItemProps, IProps } from './interface';
import withLogic from './withLogic';

class TimeItem extends Component<ITimeItemProps> {
  render() {
    const { title, time } = this.props;
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '24rpx',
          backgroundColor: '#FBFBFB',
          borderRadius: '16rpx',
          width: '640rpx',
          height: '108rpx',
          boxSizing: 'border-box',
          paddingLeft: '24rpx',
          paddingRight: '24rpx',
        }}
      >
        <Text style={{ fontSize: '28rpx', lineHeight: '48rpx', color: '#3d3d3d' }}>{title}</Text>
        <Text style={{ fontSize: '28rpx', lineHeight: '28rpx', color: '#158CFB' }}>{time}</Text>
      </View>
    );
  }
}

class ShowTime extends Component<IProps> {
  render() {
    const { value, title_name } = this.props;
    return (
      <View
        style={{
          boxSizing: 'border-box',
          backgroundColor: '#fff',
          width: '720rpx',
          height: '460rpx',
          borderRadius: '28rpx',
          paddingLeft: '40rpx',
          paddingRight: '40rpx',
          paddingTop: '48rpx',
        }}
      >
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Image src={rect} mode='aspectFill' style={{ width: '28rpx', height: '28rpx' }} />
          <Text
            style={{
              marginLeft: '24rpx',
              textAlign: 'left',
              fontSize: '30rpx',
              color: '#3D3D3D',
            }}
          >
            {title_name}
          </Text>
        </View>
        <View
          style={{
            marginTop: '24rpx',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Text style={{ fontSize: '28rpx', lineHeight: '28rpx', color: '#3D3D3D' }}>
            {`${Strings.getLang('unit')} : ${Strings.getLang('millisecond')}`}
          </Text>
        </View>
        <TimeItem title={Strings.getLang('timestamp')} time={value} />
        <TimeItem title={Strings.getLang('time')} time={formatTime(value)} />
      </View>
    );
  }
}

export default ShowTime;
export const LogicShowTime = withLogic(ShowTime);
