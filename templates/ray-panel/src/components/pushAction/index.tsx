import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, Modal, Image, ScrollView } from '@ray-js/components';
import Strings from '@/i18n';
import { scaleNumber } from '@/utils';
import rect from '@/res/rect.png';
import arrow from '@/res/arrow.png';
import notify from '@/res/notify.png';
import { IState, IProps } from './interface';
import withLogic from './withLogic';
// eslint-disable-next-line import/no-cycle
import { CompList } from '../index';
import EventNotify from '../eventNotify';

/*
  动作入参：
  - 数值型
  - 字符型
  - 布尔型
  - 枚举型
  - 透传型

  - 时间型 过滤
  - 故障型 过滤
*/

class PushAction extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      params: [],
    };
  }

  openModal = () => {
    const { inputParams } = this.props;
    this.setState({
      showModal: true,
      params: inputParams,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  onChange = (event, code: string) => {
    const { value } = event;
    const { params } = this.state;
    const newParams = params.map((p) => {
      const { code: pCode } = p;
      if (code === pCode) {
        return { ...p, value };
      }
      return p;
    });
    this.setState({
      params: newParams,
    });
  };

  onSure = () => {
    const { handleChange } = this.props;
    handleChange(this.state.params);
    this.setState({
      showModal: false,
    });
  };

  renderItem = (item) => {
    const { code, typeSpec, defaultValue, value } = item;
    const { type, range, unit, min, max, scale, step, maxlen, typeDefaultValue } =
      typeSpec as Record<string, any>;
    const finalValue = value ?? defaultValue ?? typeDefaultValue;
    const Comp = _.get(CompList, `prop.rwOrWr.${type}`);
    return Comp
      ? React.createElement(Comp, {
          title_name: code,
          key: code,
          onChange: (e) => this.onChange(e, code),
          onConfirm: (e) => this.onChange(e, code),
          dataSource: range,
          image: rect,
          unit,
          param_value: type === 'value' ? scaleNumber(scale, finalValue) : finalValue,
          min: scaleNumber(scale, min),
          max: scaleNumber(scale, max),
          step: scaleNumber(scale, step),
          maxlen,
        })
      : null;
  };

  closeNotifyModal = () => {
    const { handleCloseNotify } = this.props;
    _.isFunction(handleCloseNotify) && handleCloseNotify();
  };

  render() {
    const { showModal, params } = this.state;
    const {
      title_name = '',
      title_notify_name = '',
      valueList = [],
      showNotifyModal = false,
    } = this.props;

    return (
      <View>
        <EventNotify
          title_name={title_notify_name}
          image={notify}
          valueList={valueList}
          onClose={this.closeNotifyModal}
          show={showNotifyModal}
        />
        <Modal show={showModal} overlay position='center' onClickOverlay={this.closeModal}>
          <View
            style={{
              width: '720rpx',
              backgroundColor: '#fff',
              boxSizing: 'border-box',
              // paddingBottom: '50rpx',
              paddingTop: '48rpx',
              borderRadius: '28rpx',
            }}
          >
            <ScrollView scrollY style={{ maxHeight: '504rpx', paddingBottom: '20rpx' }}>
              {_.isArray(params) && params.length > 0 ? (
                params.map((item) => this.renderItem(item))
              ) : (
                <View
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    paddingTop: '20rpx',
                    fontSize: '32rpx',
                  }}
                >
                  {Strings.getLang('action_none_input')}
                </View>
              )}
            </ScrollView>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                height: '172rpx',
                boxSizing: 'border-box',
                paddingTop: '32rpx',
                paddingBottom: '48rpx',
              }}
            >
              <View
                style={{
                  width: '310rpx',
                  height: '92rpx',
                  borderWidth: '2rpx',
                  borderStyle: 'solid',
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '16rpx',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={this.closeModal}
              >
                <Text
                  style={{
                    fontSize: '24rpx',
                    color: '#3d3d3d',
                    textAlign: 'center',
                    lineHeight: '72rpx',
                    fontWeight: '500',
                  }}
                >
                  {Strings.getLang('cancel')}
                </Text>
              </View>
              <View
                style={{
                  width: '310rpx',
                  height: '92rpx',
                  marginLeft: '20rpx',
                  backgroundColor: '#158CFB',
                  borderRadius: '16rpx',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => this.onSure()}
              >
                <Text
                  style={{
                    fontSize: '24rpx',
                    color: '#fff',
                    textAlign: 'center',
                    lineHeight: '72rpx',
                    fontWeight: '500',
                  }}
                >
                  {Strings.getLang('confirm')}
                </Text>
              </View>
            </View>
          </View>
        </Modal>
        <View
          style={{
            width: '720rpx',
            height: '144rpx',
            borderRadius: '28rpx',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: '40rpx',
            paddingRight: '40rpx',
          }}
          onClick={() => this.openModal()}
        >
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Image src={rect} mode='aspectFill' style={{ width: '28rpx', height: '28rpx' }} />
            <Text
              style={{
                marginLeft: '24rpx',
                fontSize: '30rpx',
                lineHeight: '48rpx',
                color: '#3D3D3D',
              }}
            >
              {title_name}
            </Text>
          </View>
          <Image src={arrow} mode='aspectFill' style={{ width: '10rpx', height: '20rpx' }} />
        </View>
      </View>
    );
  }
}

export default PushAction;

export const LogicPushAction = withLogic(PushAction);
