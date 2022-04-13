import React, { Component } from 'react';
import { View, Text } from '@ray/components';
import Strings from '@/i18n';
import { IProps } from './interface';
import withLogic from './withLogic';

/*
 待解决：
  1、功能名称多语言
  2、数值类型 - 间距、倍数、单位
  3、布尔类型 - 多语言
  4、枚举类型 - 多语言
*/

class ShowText extends Component<IProps, Record<string, unknown>> {
  static defaultProps = {
    width: '720rpx', // 尺寸 - 宽
    height: '176rpx', // 尺寸 - 高
    background_color: '#fff', // 背景颜色
    border_radius: ['28rpx', '28rpx', '28rpx', '28rpx'], // 圆角
    padding: ['32rpx', '0rpx', '36rpx', '0rpx'], // 内边距
    name_font_color: 'rgba(80, 80, 80, 0.5)', // 功能名称 - 字体颜色
    name_font_weight: 'normal', // 功能名称 - 字重
    name_font_size: '24rpx', // 功能名称 - 字体大小
    arg_font_color: '#505050', // 参数 - 字体颜色
    arg_font_size: '36rpx', // 参数 - 字体大小
    arg_font_weight: '600', // 参数 - 字重
  };

  render() {
    const {
      width,
      height,
      background_color,
      padding,
      border_radius,
      name_font_color,
      name_font_weight,
      name_font_size,
      arg_font_size,
      arg_font_weight,
      arg_font_color,
      title_name,
      value,
    } = this.props;
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding;
    const [
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomRightRadius,
      borderBottomLeftRadius,
    ] = border_radius;
    return (
      <View
        style={{
          boxSizing: 'border-box',
          width,
          height,
          backgroundColor: background_color,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomRightRadius,
          borderBottomLeftRadius,
        }}
      >
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              lineHeight: '48rpx',
              textAlign: 'center',
              color: name_font_color,
              fontSize: name_font_size,
              fontWeight: name_font_weight,
            }}
          >
            {title_name}
          </Text>
        </View>
        <View
          style={{
            marginTop: '12rpx',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              width: '100%',
              textAlign: 'center',
              lineHeight: '48rpx',
              color: arg_font_color,
              fontSize: arg_font_size,
              fontWeight: arg_font_weight,
            }}
          >
            {String(value)}
          </Text>
        </View>
      </View>
    );
  }
}

export default ShowText;
export const LogicShowText = withLogic(ShowText);
