import { HIDE_CHROME_POPUP, SHOW_CHROME_POPUP } from '@/store/actions/types';

export function showChromePopup() {
  return {
    type: SHOW_CHROME_POPUP,
  };
}

export function hideChromePopup() {
  return {
    type: HIDE_CHROME_POPUP,
  };
}
