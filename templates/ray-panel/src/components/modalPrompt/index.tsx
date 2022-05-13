import React from 'react';
import { Button, Text, View, Modal, Input } from '@ray-js/components';
import debounce from 'lodash/debounce';
import { isNative } from '@ray-js/env';
import Strings from '@/i18n';
import { IPromptProps, defaultPromptProps } from './props';
import styles from './index.module.less';

export default function Prompt(props: IPromptProps): JSX.Element {
  const {
    value,
    show,
    bg_width,
    bg_color,
    bg_singRadius,
    title,
    title_color,
    title_fontSize,
    title_fontWeight,
    onCancel,
    onConfirm,
    maxlen,
    ...rest
  } = props;

  const [inputValue, setInputValue] = React.useState(value);
  const [_value, _setValue] = React.useState(value);
  const [disabled, setDisabled] = React.useState(!value);

  React.useEffect(() => {
    setInputValue(value);
    _setValue(value);
  }, [value]);

  const _handleCancel = () => {
    _setValue(inputValue);

    if (isNative) {
      typeof onCancel === 'function' && onCancel({ type: 'cancel' });
    } else {
      setTimeout(() => {
        typeof onCancel === 'function' && onCancel({ type: 'cancel' });
      }, 0);
    }
  };

  const _handleConfirm = () => {
    typeof onConfirm === 'function' && onConfirm({ type: 'confirm', value: _value });
    setInputValue(_value);
  };

  const _handleInput = (event) => {
    const { value: valueInput } = event;
    if (valueInput.length > maxlen) return;
    if (isNative) {
      _setValue(valueInput);
      setDisabled(!valueInput);
    } else {
      debounceInput(valueInput);
    }
  };

  const debounceInput = debounce((valueInput) => {
    _setValue(valueInput);
    setDisabled(!valueInput);
  }, 500);

  return (
    <Modal
      show={show}
      overlay
      position='center'
      customStyle={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={{ backgroundColor: bg_color, width: bg_width, borderRadius: bg_singRadius }}>
        <View className={styles.titleView}>
          <Text
            style={{ color: title_color, fontSize: title_fontSize, fontWeight: title_fontWeight }}
            className={styles.title}
          >
            {title}
          </Text>
        </View>
        <Input
          {...rest}
          style={{ width: '92%', marginLeft: '4%' }}
          focus
          selectionColor='#158CFB'
          onInput={_handleInput}
          value={_value}
        />
        <View className={styles.bottomView}>
          <Button
            className={styles.cancelButton}
            style={{ borderBottomLeftRadius: bg_singRadius }}
            onClick={_handleCancel}
          >
            <Text className={styles.cancelText}>{Strings.getLang('cancel')}</Text>
          </Button>
          <Button
            className={styles.confirmButton}
            style={{ borderBottomRightRadius: bg_singRadius, backgroundColor: '#FFF' }}
            onClick={_handleConfirm}
            disabled={disabled}
          >
            <Text
              className={styles.confirmText}
              style={{ color: disabled ? '#7FBFFF' : '#158CFB' }}
            >
              {Strings.getLang('confirm')}
            </Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
}

Prompt.defaultProps = defaultPromptProps;
