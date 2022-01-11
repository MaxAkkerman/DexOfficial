import { FINISH_TUTORIAL, RESET_TUTORIAL } from '@/store/actions/types';

const initialState = {
  finished: false,
};

export default function tutorialReducer(state = initialState, { type }) {
  switch (type) {
    case RESET_TUTORIAL:
      return {
        finished: false,
      };
    case FINISH_TUTORIAL:
      return {
        finished: true,
      };
    default:
      return state;
  }
}
