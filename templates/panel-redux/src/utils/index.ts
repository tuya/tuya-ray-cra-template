import Strings from '@/i18n';
import { store } from '@/redux';
import { utils } from '@ray-js/panel-sdk';
const { getBitValue } = utils;

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
    const isExist = getBitValue(faultValue, i);
    if (isExist) {
      labels.push(Strings.getDpLang(faultCode, value));
      if (onlyPrior) break;
    }
  }
  return onlyPrior ? labels[0] : labels.join(', ');
};

export const formatDevSchema = devInfo => {
  const { dps, schema } = devInfo;
  const result_schema = {};
  const result_state = {};

  for (let i = 0; i < schema.length; i++) {
    const { code, id, property, type } = schema[i];
    const define = {
      dptype: type,
      id: `${id}`,
      ...property,
    };

    result_state[code] = dps[id];
    result_schema[code] = define;
    delete define.property;
  }
  return { state: result_state, schema: result_schema };
};
