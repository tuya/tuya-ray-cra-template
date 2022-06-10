import { DEVICE_INFO_CHANGE, DEV_INFO_CHANGE, RESPONSE_UPDATE_DP } from '@/constant';
import { formatDevSchema } from '@/utils';
import { actions } from '../actions/common';

export type Actions = {
  [K in keyof typeof actions]: ReturnType<typeof actions[K]>;
};
export type DpValue = boolean | number | string;

/**
 * reducers
 */

const dpState = (state = {}, action) => {
  switch (action.type) {
    case DEV_INFO_CHANGE: {
      const { state: devState } = formatDevSchema(action.payload);
      return {
        ...state,
        ...devState,
      };
    }
    case RESPONSE_UPDATE_DP:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const devInfo = (state = {}, action) => {
  switch (action.type) {
    case DEV_INFO_CHANGE: {
      const { schema, state: devState } = formatDevSchema(action.payload);

      return {
        ...state,
        ...action.payload,
        schema,
        state: devState,
      };
    }

    case DEVICE_INFO_CHANGE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const reducers = {
  dpState,
  devInfo,
};
