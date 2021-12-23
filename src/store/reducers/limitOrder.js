import {
  RESET_LIMIT_ORDER_POPUP_VALUES,
  SET_LIMIT_ORDER_POPUP_VALUES,
} from '@/store/actions/types';

const initialState = {
  values: null,
};

export default function limitOrderReducer(
  state = initialState,
  { payload, type },
) {
  switch (type) {
    case SET_LIMIT_ORDER_POPUP_VALUES:
      return {
        values: payload,
      };
    case RESET_LIMIT_ORDER_POPUP_VALUES:
      return {
        values: null,
      };
    default:
      return state;
  }
}
