import { handleActions } from 'redux-actions';
import { ThemeUtils } from '@ray-js/ray-panel-utils';
import { defaultTheme } from '@ray-js/ray-panel-theme';
import { theme as localTheme } from '../../config';
import { toggleTheme, updateTheme } from '../actions/theme';

const { deepMerge } = ThemeUtils;

// Reducers
const theme = handleActions<any>(
  {
    [toggleTheme.toString()]: state => {
      return {
        ...state,
        type: state.type === 'light' ? 'dark' : 'light',
      };
    },
    [updateTheme.toString()]: (state, action) => deepMerge(state, action.payload) as any,
  },
  deepMerge(defaultTheme, localTheme) as any
);

export const reducers = {
  theme,
};
