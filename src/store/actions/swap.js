import {
  RESET_SWAP_POPUP_VALUES,
  SET_SLIPPAGE,
  SET_SWAP_POPUP_VALUES,
} from '@/store/actions/types';

export function setSwapPopupValues(values) {
  return {
    payload: values,
    type: SET_SWAP_POPUP_VALUES,
  };
}

export function resetSwapPopupValues() {
  return {
    type: RESET_SWAP_POPUP_VALUES,
  };
}

export function setSlippageValue(value) {
  return {
    payload: value,
    type: SET_SLIPPAGE,
  };
}
