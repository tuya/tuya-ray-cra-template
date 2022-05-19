import { getOtherUIValue, getUIValue } from '@ray-js/ray-panel-standard-hoc/lib/withUIConfig/utils';
import { shallowEqual, useSelector as useSelectorBase } from 'react-redux';
import { actions as CommonActions } from './actions/common';
import { actions as theme } from './actions/theme';
import { ReduxState, store } from './store';

const { width, height } = { width: 375, height: 664 };
const actions = {
  common: CommonActions,
  theme,
};
export { actions, store };

export function useSelector<TSelected>(
  selector: (state: ReduxState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) {
  return useSelectorBase<ReduxState, TSelected>(selector, equalityFn || shallowEqual);
}

export function useIoTUIValue(key: string, value?: string): string {
  const iotConfig = useSelector(state => state.panelConfig.iot);
  return getUIValue(iotConfig, key, value);
}

export function useIoTOtherUIValue(key: string, value?: string): string {
  const iotConfig = useSelector(state => state.panelConfig.iot);
  return getOtherUIValue(iotConfig, key, value);
}

export function getIotUIValue(key: string, value?: string): string {
  const iotConfig = store.getState().panelConfig.iot;
  return getUIValue(iotConfig, key, value);
}
