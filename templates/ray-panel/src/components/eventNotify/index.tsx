import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, Modal, Image, ScrollView } from '@ray/components';
import Close from '@/res/close.png';
import { IEventItemProps, IProps } from './interface';
import withLogic from './withLogic';

class EventItem extends Component<IEventItemProps> {
  render() {
    const { title = '', status = '', style } = this.props;
    return (
      <View
        style={{
          ...style,
          width: '640rpx',
          height: '108rpx',
          boxSizing: 'border-box',
          paddingLeft: '24rpx',
          paddingRight: '24rpx',
          paddingTop: '30rpx',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FBFBFB',
          borderRadius: '16rpx',
        }}
      >
        <Text
          style={{
            width: '324rpx',
            fontSize: '24rpx',
            lineHeight: '48rpx',
            color: '#3d3d3d',
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: '24rpx',
            lineHeight: '48rpx',
            color: '#3d3d3d',
          }}
        >
          {String(status)}
        </Text>
      </View>
    );
  }
}

function EventNotify(props: IProps) {
  const { title_name, image, valueList, show, onClose } = props;
  const closeModal = () => {
    _.isFunction(onClose) && onClose();
  };

  return (
    <Modal show={show} overlay position="center" onClickOverlay={closeModal}>
      <View
        style={{
          width: '720rpx',
          borderRadius: '28rpx',
          backgroundColor: '#fff',
          boxSizing: 'border-box',
          paddingLeft: '40rpx',
          paddingRight: '40rpx',
          paddingTop: '48rpx',
          paddingBottom: '48rpx',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image src={image} style={{ width: '30rpx', height: '30rpx' }} />
            <Text
              style={{
                marginLeft: '24rpx',
                lineHeight: '48rpx',
                fontSize: '30rpx',
                color: '#3d3d3d',
              }}
            >
              {title_name}
            </Text>
          </View>
          <View
            style={{
              width: '48rpx',
              height: '48rpx',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={closeModal}
          >
            <Image src={Close} style={{ width: '30rpx', height: '30rpx' }} />
          </View>
        </View>
        <ScrollView scrollY style={{ maxHeight: '462rpx' }}>
          {valueList.map((item, index) => {
            return (
              <EventItem
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                title={item?.title}
                status={item?.status}
                style={{ marginTop: '48rpx' }}
              />
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
}

export default EventNotify;

export const LogicEventNotify = withLogic(EventNotify);
