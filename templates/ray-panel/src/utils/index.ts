import { NumberUtils } from '@ray-js/ray-panel-utils';
import { store } from '@/redux';
import { Strings } from '@ray-js/ray-panel-i18n';
import mode from '../res/mode.png';

export const getFaultStrings = (
  faultCode: string,
  faultValue: number,
  onlyPrior = true
): string => {
  const { devInfo } = store.getState();
  if (!faultValue) return '';
  const { label } = devInfo.schema[faultCode];
  const labels = [];
  for (let i = 0; i < label!.length; i++) {
    const value = label![i];
    const isExist = NumberUtils.getBitValue(faultValue, i);
    if (isExist) {
      labels.push(Strings.getDpLang(faultCode, value));
      if (onlyPrior) break;
    }
  }
  return onlyPrior ? labels[0] : labels.join(', ');
};

// 时间格式化
export const formatTime = (timestamp: string | number | undefined): string => {
  if (timestamp === undefined) {
    return '';
  }
  const date = new Date(Number(timestamp));
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${month}-${day} ${hour}:${min}:${second}`;
};

export const scaleNumber: (scale: number, value: number) => number = (scale, value) =>
  Number((value / Math.pow(10, scale)).toFixed(scale));

// 将 struct 类型数据转换成组件需要的
export const transformData = (
  type: string,
  dataSource: { [key: string]: any },
  value: { [key: string]: any }
): {
  key: number;
  dataSource: any;
  image: any;
  title_name: any;
  unit: any;
  param_value: any;
  min: number;
  max: number;
  step: number;
  maxlen: any;
}[] => {
  let res = [];
  if (type !== 'struct') return;
  const dataArr = Object.values(dataSource);
  const dataKey = Object.keys(dataSource);
  if (!dataSource || dataSource.length) return;
  res = dataArr.map((item, idx) => {
    const {
      defaultValue,
      name,
      typeSpec: { type: dpType, range, unit, min, max, scale, step, maxlen, typeDefaultValue },
    } = item;
    let insertValue = defaultValue ?? typeDefaultValue;
    if (value) {
      insertValue = value[dataKey[idx]];
    }
    return {
      key: dataKey[idx],
      type: dpType,
      dataSource: range,
      image: mode,
      title_name: dataKey[idx],
      unit,
      param_value: dpType === 'value' ? scaleNumber(scale, insertValue) : insertValue,
      min: scaleNumber(scale, min),
      max: scaleNumber(scale, max),
      step: scaleNumber(scale, step),
      maxlen,
    };
  });
  // eslint-disable-next-line consistent-return
  return res;
};

// 获取小数点的位置
export const getFloatLength = (num: number | string): number => {
  return num.toString().split('.')[1] ? num.toString().split('.')[1].length : 0;
};
