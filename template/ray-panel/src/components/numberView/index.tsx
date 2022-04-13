import React from 'react';
import { View, Text, Slider, Image } from '@ray/components';
import { ThemeUtils } from '@ray/ray-panel-utils';
import { getFloatLength } from '@/utils';
import { publishPropertyDpData } from '@/api';
import styles from './index.module.less';
import { INumberViewProps, defaultNumberViewProps, INumberViewState } from './props';

const { parseToStyle } = ThemeUtils;

export default class NumberView extends React.Component<INumberViewProps, INumberViewState> {
  static defaultProps = defaultNumberViewProps;
  constructor(props: INumberViewProps) {
    super(props);
    this.state = {
      sliderValue: props.param_value,
    };
  }

  componentDidUpdate(prevProps: INumberViewProps): void {
    if (prevProps.param_value !== this.props.param_value) {
      this.setState({
        sliderValue: this.props.param_value,
      });
    }
  }

  _handleSliderChanging = (event: { value: number; type: 'changing' }): void => {
    const { onChanging, step } = this.props;
    const { value, type } = event;
    const newValue = Number(value.toFixed(getFloatLength(step)));
    typeof onChanging === 'function' && onChanging({ type, value: newValue });
    this.setState({
      sliderValue: newValue,
    });
  };

  _handleSliderChange = (event: { value: number; type: 'change' }): void => {
    const { onChange, title_name, step, scale } = this.props;
    const { value, type } = event;
    const newValue = Number(value.toFixed(getFloatLength(step)));
    if (typeof onChange === 'function') {
      onChange({ type, value: newValue });
    } else {
      publishPropertyDpData({ [title_name]: newValue * 10 ** scale })
        .then(() => {
          this.setState({
            sliderValue: newValue,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render(): JSX.Element {
    const {
      style,
      image,
      unit,
      bg_color,
      bg_singRadius,
      bg_width,
      bg_padding,
      image_radius,
      image_size,
      title_name,
      title_fontSize,
      title_fontWeight,
      title_color,
      slider_maxTrack_color,
      slider_minTrack_color,
      slider_thumb_color,
      param_color,
      param_fontSize,
      param_fontWeight,
      min,
      max,
      step,
    } = this.props;
    const { sliderValue } = this.state;
    return (
      <View
        style={{
          width: bg_width,
          borderRadius: bg_singRadius,
          backgroundColor: bg_color,
          ...parseToStyle(bg_padding, 'padding'),
          ...style,
        }}
        className={styles.boolView}
      >
        <View className={styles.topView} style={{ marginBottom: '48rpx' }}>
          {!!image && (
            <Image
              src={image}
              style={{
                width: image_size,
                height: image_size,
                borderRadius: image_radius,
                marginRight: image ? '24rpx' : 0,
              }}
            />
          )}
          <Text
            style={{
              fontSize: title_fontSize,
              color: title_color,
              fontWeight: title_fontWeight,
              marginRight: '24rpx',
            }}
          >
            {title_name}
          </Text>
          <View className={styles.valueView}>
            <Text
              style={{ fontSize: param_fontSize, color: param_color, fontWeight: param_fontWeight }}
            >
              {sliderValue}
            </Text>
            {!!unit && (
              <Text
                style={{
                  fontSize: param_fontSize,
                  color: param_color,
                  fontWeight: param_fontWeight,
                }}
              >
                {unit}
              </Text>
            )}
          </View>
        </View>
        <Slider
          min={min}
          max={max}
          step={step}
          trackStyle={{ width: '640rpx', height: '12rpx', borderRadius: '6rpx' }}
          blockSize={26}
          backgroundColor={slider_maxTrack_color}
          activeColor={slider_minTrack_color}
          blockColor={slider_thumb_color}
          onChanging={this._handleSliderChanging}
          onChange={this._handleSliderChange}
          value={sliderValue}
        />
      </View>
    );
  }
}
