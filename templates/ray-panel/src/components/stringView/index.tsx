import React from 'react';
import { View, Text, Image } from '@ray/components';
import { ThemeUtils } from '@ray/ray-panel-utils';
import ModalPrompt from '@/components/modalPrompt';
import { publishPropertyDpData } from '@/api';
import { showToast } from '@ray/api';
import Strings from '@/i18n';
import styles from './index.module.less';
import { IStringViewProps, defaultStringViewProps, IStringViewState } from './props';

const { parseToStyle } = ThemeUtils;

export default class StringView extends React.PureComponent<IStringViewProps, IStringViewState> {
  static defaultProps = defaultStringViewProps;

  constructor(props: IStringViewProps) {
    super(props);
    this.state = {
      visible: false,
      value: props.param_value,
    };
  }

  componentDidUpdate(prevProps: IStringViewProps): void {
    if (prevProps.param_value !== this.props.param_value) {
      this.setState({
        value: this.props.param_value,
      });
    }
  }

  _handleClick = (): void => {
    this.setState({ visible: true });
  };

  _handleConfirm = (params): void => {
    const { value } = params;
    const { onConfirm, title_name, type } = this.props;

    if (typeof onConfirm === 'function') {
      onConfirm({ type: 'confirm', value });
      this.setState({ visible: false });
    } else {
      publishPropertyDpData({ [title_name]: value })
        .then(() => {
          this.setState({ visible: false, value });
        })
        .catch(error => {
          console.log(error);
          if (type === 'raw') {
            showToast({ title: Strings.getLang('raw_tips'), icon: 'fail' });
          }
        });
    }
  };

  _handleCancel = (): void => {
    this.setState({ visible: false });
  };

  render(): JSX.Element {
    const {
      style,
      image,
      param_color,
      param_fontSize,
      param_fontWeight,
      bg_color,
      bg_singRadius,
      bg_width,
      bg_padding,
      image_radius,
      image_size,
      title_name,
      title_color,
      title_fontSize,
      title_fontWeight,
      subTitle_color,
      subTitle_fontSize,
      subTitle_fontWeight,
      subTitle_name,
      maxlen,
    } = this.props;
    const { visible, value } = this.state;
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
        className={styles.stringView}
        onClick={this._handleClick}
      >
        <View
          className={styles.leftView}
          style={{ alignItems: subTitle_name ? 'flex-start' : 'center' }}
        >
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
            }}
          >
            {title_name}
          </Text>
        </View>
        <Text
          style={{
            fontSize: param_fontSize,
            color: param_color,
            fontWeight: param_fontWeight,
            width: '70%',
            textAlign: 'right',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {value}
        </Text>
        <ModalPrompt
          show={visible}
          value={value}
          onConfirm={this._handleConfirm}
          onCancel={this._handleCancel}
          maxlen={maxlen}
          title={title_name}
        />
      </View>
    );
  }
}
