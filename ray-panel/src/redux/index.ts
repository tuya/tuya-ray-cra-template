import { useSelector as useSelectorBase, shallowEqual } from 'react-redux';
import { actions as CommonActions } from './actions/common';
import { actions as theme } from './actions/theme';
import { store, ReduxState } from './store';
import { get } from 'lodash';

const { width, height } = { width: 375, height: 664 };
const actions = {
  common: CommonActions,
  theme,
};
export { actions, store };

const getY = (k: number, x: number) => k * (x - width / 2) + height / 2;
const getX = (k: number, y: number) => (y - height / 2) / k + width / 2;
const getCoords = (deg: number): { x1?: any; y1?: any; x2?: any; y2?: any; r?: any } => {
  const rad = (deg * Math.PI) / 180;
  let x1: any;
  let y1: any;
  let x2: any;
  let y2: any;
  const k1 = height / width;
  const k2 = -k1;
  const k = Math.tan(rad);
  if (deg === 0) {
    x1 = 0;
    y1 = 0;
    x2 = width;
    y2 = 0;
  } else if (deg < 90) {
    y1 = 0;
    x1 = getX(k, y1);
    y2 = height;
    x2 = getX(k, y2);
    if (k < k1) {
      x1 = 0;
      y1 = getY(k, x1);
      x2 = width;
      y2 = getY(k, x2);
    }
  } else if (deg === 90) {
    x1 = 0;
    y1 = 0;
    x2 = 0;
    y2 = height;
  } else if (deg < 180) {
    y1 = 0;
    x1 = getX(k, y1);
    y2 = height;
    x2 = getX(k, y2);
    if (k > k2) {
      x1 = width;
      y1 = getY(k, x1);
      x2 = 0;
      y2 = getY(k, x2);
    }
  } else if (deg === 180) {
    x1 = width;
    y1 = 0;
    x2 = 0;
    y2 = 0;
  } else if (deg < 270) {
    x1 = width;
    y1 = getY(k, x1);
    x2 = 0;
    y2 = getY(k, x2);
    if (k > k1) {
      y1 = height;
      x1 = getX(k, y1);
      y2 = 0;
      x2 = getX(k, y2);
    }
  } else if (deg === 270) {
    x1 = 0;
    y1 = height;
    x2 = 0;
    y2 = 0;
  } else {
    x1 = 0;
    y1 = getY(k, x1);
    x2 = width;
    y2 = getY(k, x2);
    if (k < k2) {
      y1 = height;
      x1 = getX(k, y1);
      y2 = 0;
      x2 = getX(k, y2);
    }
  }
  x1 += '';
  y1 += '';
  x2 += '';
  y2 += '';
  return {
    x1,
    y1,
    x2,
    y2,
  };
};
export const getOtherUIValue = (t: any, key: string, defaultValue: any) =>
  get(t, key, defaultValue);

export const getUIValue = (t: any, key: string, state?: string) => {
  const stateMap = {
    true: 'on',
    false: 'off',
  };
  const globalConfig = t.global || {};
  const dps = t.dps || {};
  const timestamp = t.timestamp || '0';
  const themeItem = get(t, key) || get(dps, key);

  let val;
  if (themeItem) {
    const { rangeType, value, type } = themeItem;
    switch (rangeType) {
      case 'bool':
        val = value[stateMap[state!]];
        break;

      case 'blank':
        val = value.initialize;
        break;

      case 'enum':
        val = value[state!];
        break;

      default:
        break;
    }
    if (val !== undefined) {
      if (type === 'color') {
        if (val.push) {
          val = val[0];
        } else {
          const valS = Object.values(val);
          if (valS.length === 1) {
            val = valS[0];
          }
          if (valS.length > 2) {
            const { deg, r, ...bg } = val;
            const _bg = Object.keys(bg).reduce((item, k) => {
              item[`${k}%`] = bg[k]; // eslint-disable-line
              return item;
            }, {});
            let coords = getCoords(deg);
            if (r !== undefined) {
              coords = { r: `${r}` };
            }
            val = {
              x1: '50%',
              ..._bg,
              ...coords,
            };
          }
        }
      } else if (type === 'image') {
        val = {
          uri: `${val}?t=${timestamp}`,
        };
      }
    }
  }

  if (val === undefined) {
    val = globalConfig[key];
  }

  return val;
};

export function useSelector<TSelected>(
  selector: (state: ReduxState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) {
  return useSelectorBase<ReduxState, TSelected>(selector, equalityFn || shallowEqual);
}

export function useIoTUIValue(key: string, value?: string): string {
  const iotConfig = useSelector((state) => state.panelConfig.iot);
  return getUIValue(iotConfig, key, value);
}

export function useIoTOtherUIValue(key: string, value?: string): string {
  const iotConfig = useSelector((state) => state.panelConfig.iot);
  return getOtherUIValue(iotConfig, key, value);
}

export function getIotUIValue(key: string, value?: string): string {
  const iotConfig = store.getState().panelConfig.iot;
  return getUIValue(iotConfig, key, value);
}
