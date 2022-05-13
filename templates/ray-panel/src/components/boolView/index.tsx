import React from 'react';
import { View, Text, Switch, Image } from '@ray-js/components';
import { ThemeUtils } from '@ray-js/ray-panel-utils';
import { publishPropertyDpData } from '@/api';
import styles from './index.module.less';
import { IBoolViewProps, defaultBoolViewProps, IBoolViewState } from './props';

const { parseToStyle } = ThemeUtils;

export default class BoolView extends React.Component<IBoolViewProps, IBoolViewState> {
  static defaultProps = defaultBoolViewProps;

  constructor(props: IBoolViewProps) {
    super(props);
    this.state = {
      switchValue: !!props.param_value,
    };
  }

  componentDidUpdate(prevProps: Readonly<IBoolViewProps>): void {
    if (prevProps.param_value !== this.props.param_value) {
      this.setState({
        switchValue: !!this.props.param_value,
      });
    }
  }

  _handleChange = (event: { value: boolean }): void => {
    const { onChange, title_name } = this.props;
    const { value } = event;
    if (typeof onChange === 'function') {
      onChange({ type: 'change', value });
    } else {
      publishPropertyDpData({ [title_name]: value })
        .then(() => {
          this.setState({
            switchValue: value,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render(): JSX.Element {
    const {
      title_name,
      image,
      image_size,
      bg_width,
      bg_singRadius,
      bg_color,
      bg_padding,
      title_fontSize,
      title_fontWeight,
      title_color,
      image_radius,
      switch_thumb_color_off,
      switch_bg_color_on,
      switch_bg_color_off,
      style,
    } = this.props;

    const { switchValue } = this.state;
    return (
      <View
        style={{
          width: bg_width,
          height: '144rpx',
          borderRadius: bg_singRadius,
          backgroundColor: bg_color,
          ...parseToStyle(bg_padding, 'padding'),
          ...style,
        }}
        className={styles.boolView}
      >
        <View className={styles.leftView}>
          {!!image && (
            <Image
              src={image}
              style={{
                width: image_size,
                height: image_size,
                marginRight: image ? '24rpx' : 0,
                borderRadius: image_radius,
              }}
            />
          )}
          <Text
            style={{ fontSize: title_fontSize, color: title_color, fontWeight: title_fontWeight }}
          >
            {title_name}
          </Text>
        </View>
        <Switch
          checked={switchValue}
          thumbTintColor={switch_thumb_color_off}
          tintColor={switch_bg_color_off}
          color={switch_bg_color_on}
          onChange={this._handleChange}
        />
      </View>
    );
  }
}
