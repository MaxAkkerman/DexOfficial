import { HIDE_CHROME_POPUP, SHOW_CHROME_POPUP } from '@/store/actions/types';

const initialState = {
  visible: false,
};

export default function waitingPopup(state = initialState, { type }) {
  switch (type) {
    case SHOW_CHROME_POPUP:
      return {
        visible: true,
      };
    case HIDE_CHROME_POPUP:
      return {
        visible: false,
      };
    default:
      return state;
  }
}
