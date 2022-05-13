import React from 'react';
import { View, Text, Button, Image } from '@ray-js/components';
import { ThemeUtils } from '@ray-js/ray-panel-utils';
import { publishPropertyDpData } from '@/api';
import styles from './index.module.less';
import { IMenuViewProps, defaultMenuViewProps, IMenuViewState } from './props';

const { parseToStyle } = ThemeUtils;

export default class NumberView extends React.Component<IMenuViewProps, IMenuViewState> {
  static defaultProps = defaultMenuViewProps;

  constructor(props: IMenuViewProps) {
    super(props);
    const { param_value } = props;
    this.state = {
      activeValue: param_value || '',
    };
  }

  componentDidUpdate(prevProps: Readonly<IMenuViewProps>): void {
    if (prevProps.param_value !== this.props.param_value) {
      this.setState({
        activeValue: this.props.param_value,
      });
    }
  }

  _handleButtonClick = (item: string): void => {
    const { onChange, title_name } = this.props;
    if (typeof onChange === 'function') {
      onChange({ type: 'change', value: item });
    } else {
      publishPropertyDpData({ [title_name]: item })
        .then(() => {
          this.setState({
            activeValue: item,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render(): JSX.Element {
    const {
      title_name,
      image,
      dataSource,
      bg_color,
      bg_singRadius,
      bg_width,
      image_size,
      title_color,
      title_fontSize,
      title_fontWeight,
      button_bg_color_active,
      button_bg_color_unactive,
      button_bg_radius,
      button_text_fontSize_active,
      button_text_fontWeight_active,
      button_text_color_active,
      button_text_color_unactive,
      bg_padding,
      style,
      image_radius,
    } = this.props;
    const { activeValue } = this.state;

    const len = dataSource && dataSource.length;

    return (
      <View
        style={{
          width: bg_width,
          borderRadius: bg_singRadius,
          backgroundColor: bg_color,
          ...parseToStyle(bg_padding, 'padding'),
          ...style,
        }}
        className={styles.menuView}
      >
        <View className={styles.topView} style={{ marginBottom: '48rpx' }}>
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
            style={{
              fontSize: title_fontSize,
              color: title_color,
              fontWeight: title_fontWeight,
              marginRight: image ? '24rpx' : 0,
            }}
          >
            {title_name}
          </Text>
        </View>
        {!!len && (
          <View className={styles.bottomView}>
            {dataSource.map((item, index) => {
              const active = item === activeValue;
              const marginRight =
                dataSource.length === 1
                  ? 0
                  : dataSource.length === 2
                  ? index
                    ? 0
                    : '12rpx'
                  : (index + 1) % 3
                  ? '12rpx'
                  : 0;

              const buttonWidth =
                dataSource.length === 1
                  ? '100%'
                  : dataSource.length === 2
                  ? 'calc((100% - 12rpx) / 2)'
                  : 'calc((100% - 24rpx) / 3)';

              return (
                <Button
                  type='primary'
                  key={`${item}-menu`}
                  style={{
                    backgroundColor: active ? button_bg_color_active : button_bg_color_unactive,
                    borderRadius: button_bg_radius,
                    marginRight,
                    width: buttonWidth,
                  }}
                  className={styles.button}
                  onClick={() => this._handleButtonClick(item)}
                >
                  <Text
                    style={{
                      color: active ? button_text_color_active : button_text_color_unactive,
                      fontSize: button_text_fontSize_active,
                      fontWeight: button_text_fontWeight_active,
                    }}
                    className={styles.buttonText}
                  >
                    {item}
                  </Text>
                </Button>
              );
            })}
          </View>
        )}
      </View>
    );
  }
}
