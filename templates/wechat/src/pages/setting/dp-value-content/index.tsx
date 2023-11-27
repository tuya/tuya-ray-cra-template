import React from 'react';
import { DpSchema, utils } from '@ray-js/panel-sdk';
import { Text, View, Icon as IconBase, Slider } from '@ray-js/ray';
import styles from './index.module.less';

interface Props {
  schema: DpSchema;
  value: number;
  onChange: (value: number) => void;
}

export const DpValueContent: React.FC<Props> = (props) => {
  const { schema, value } = props;
  const [currentValue, setCurrentValue] = React.useState(value);
  const min = schema?.property?.min || 0;
  const max = schema?.property?.max || 100;
  const step = schema?.property?.step || 1;
  const handleValueChange = React.useCallback((v: number) => {
    setCurrentValue(v);
    typeof props.onChange === 'function' && props.onChange(v);
  }, []);
  const percent = Math.round(utils.calcPercent(min, max, currentValue) * 100);
  return (
    <View className={styles['dp-value-content']}>
      <View className={styles['dp-value-content-title']}>
        <View
          className={styles.flipX}
          onClick={() => setCurrentValue(currentValue - step)}
        >
          <IconBase type="icon-a-playfill" color="rgba(0, 0, 0, 0.2)" />
        </View>
        <Text className={styles['dp-value-content-title-text']}>
          {percent}%
        </Text>
        <View onClick={() => setCurrentValue(currentValue + step)}>
          <IconBase color="rgba(0, 0, 0, 0.2)" type="icon-a-playfill" />
        </View>
      </View>
      <View className={styles['dp-value-content-slider']}>
        <Slider
          style={{ width: '100%' }}
          min={schema?.property?.min || 0}
          max={schema?.property?.max || 100}
          step={step}
          value={currentValue}
          activeColor="#0078fa"
          onChange={(evt) => handleValueChange(evt.value)}
          onChanging={(evt) => handleValueChange(evt.value)}
        />
      </View>
    </View>
  );
};
