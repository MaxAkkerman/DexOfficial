import {
  ADD_TO_ORDER_LIST,
  CLOSE_ORDER_CANCEL_POPUP,
  CLOSE_ORDER_DEPLOY_POPUP,
  CLOSE_ORDER_UPDATE_POPUP,
  CLOSE_ORDER_WAIT_POPUP,
  HIDE_ORDERS_FROM_SELECT,
  HIDE_ORDERS_TO_SELECT,
  OPEN_ORDER_CANCEL_POPUP,
  OPEN_ORDER_DEPLOY_POPUP,
  OPEN_ORDER_UPDATE_POPUP,
  OPEN_ORDER_WAIT_POPUP,
  REMOVE_FROM_ORDER_LIST,
  SET_ORDER_LIST,
  SET_ORDER_LIST_FETCHED,
  SET_ORDER_LIST_LOADING,
  SET_ORDERS_FROM_INPUT_VALUE,
  SET_ORDERS_FROM_TOKEN,
  SET_ORDERS_PAIR_ID,
  SET_ORDERS_RATE,
  SET_ORDERS_TO_INPUT_VALUE,
  SET_ORDERS_TO_TOKEN,
  SHOW_ORDERS_FROM_SELECT,
  SHOW_ORDERS_TO_SELECT,
  UPDATE_PRICE_ORDER_LIST,
} from '../actions/types';

const initialState = {
  fromInputValue: 0,
  toInputValue: 0,
  fromToken: {
    walletAddress: '',
    symbol: '',
    balance: 0,
  },
  toToken: {
    walletAddress: '',
    symbol: '',
    balance: 0,
  },
  rate: 0,
  pairId: '',
  ordersFromSelectIsVisible: false,
  ordersToSelectIsVisible: false,
  revertValue: 0,
  orderPopupCancelVisible: false,
  orderPopupCancelPayload: null,
  orderPopupDeployVisible: false,
  orderPopupDeployPayload: null,
  orderPopupUpdateVisible: false,
  orderPopupUpdatePayload: null,
  orderPopupWaitVisible: false,
  orderPopupWaitPayload: null,
  orderList: [],
  orderListLoading: false,
  orderListFetched: false,
};

const limitOrders = (state = initialState, { payload, type }) => {
  switch (type) {
    case SET_ORDERS_FROM_INPUT_VALUE:
      return {
        ...state,
        fromInputValue: payload,
      };
    case SET_ORDERS_TO_INPUT_VALUE:
      return {
        ...state,
        toInputValue: payload,
      };
    case SET_ORDERS_FROM_TOKEN:
      return {
        ...state,
        fromToken: payload,
      };
    case SET_ORDERS_TO_TOKEN:
      return {
        ...state,
        toToken: payload,
      };
    case SET_ORDERS_RATE:
      return {
        ...state,
        rate: payload,
      };
    case SET_ORDERS_PAIR_ID:
      return {
        ...state,
        pairId: payload,
      };
    case SHOW_ORDERS_FROM_SELECT:
      return {
        ...state,
        ordersFromSelectIsVisible: true,
      };
    case HIDE_ORDERS_FROM_SELECT:
      return {
        ...state,
        ordersFromSelectIsVisible: false,
      };
    case SHOW_ORDERS_TO_SELECT:
      return {
        ...state,
        ordersToSelectIsVisible: true,
      };
    case HIDE_ORDERS_TO_SELECT:
      return {
        ...state,
        ordersToSelectIsVisible: false,
      };
    case SET_ORDER_LIST:
      return {
        ...state,
        orderList: payload,
      };
    case ADD_TO_ORDER_LIST:
      return {
        ...state,
        orderList: [...state.orderList, payload],
      };
    case REMOVE_FROM_ORDER_LIST:
      return {
        ...state,
        orderList: state.orderList.filter((o) => o.id !== payload),
      };
    case UPDATE_PRICE_ORDER_LIST:
      return {
        ...state,
        orderList: state.orderList.map((o) =>
          o.id === payload.id ? { ...o, price: payload.newPrice } : o,
        ),
      };
    case SET_ORDER_LIST_LOADING:
      return {
        ...state,
        orderListLoading: payload,
      };
    case SET_ORDER_LIST_FETCHED:
      return {
        ...state,
        orderListFetched: payload,
      };
    case OPEN_ORDER_CANCEL_POPUP:
      return {
        ...state,
        orderPopupCancelVisible: true,
        orderPopupCancelPayload: payload,
      };
    case CLOSE_ORDER_CANCEL_POPUP:
      return {
        ...state,
        orderPopupCancelVisible: false,
        orderPopupCancelPayload: null,
      };
    case OPEN_ORDER_DEPLOY_POPUP:
      return {
        ...state,
        orderPopupDeployVisible: true,
        orderPopupDeployPayload: payload,
      };
    case CLOSE_ORDER_DEPLOY_POPUP:
      return {
        ...state,
        orderPopupDeployVisible: false,
        orderPopupDeployPayload: null,
      };
    case OPEN_ORDER_UPDATE_POPUP:
      return {
        ...state,
        orderPopupUpdateVisible: true,
        orderPopupUpdatePayload: payload,
      };
    case CLOSE_ORDER_UPDATE_POPUP:
      return {
        ...state,
        orderPopupUpdateVisible: false,
        orderPopupUpdatePayload: null,
      };
    case OPEN_ORDER_WAIT_POPUP:
      return {
        ...state,
        orderPopupWaitVisible: true,
        orderPopupWaitPayload: payload,
      };
    case CLOSE_ORDER_WAIT_POPUP:
      return {
        ...state,
        orderPopupWaitVisible: false,
        orderPopupWaitPayload: null,
      };
    default:
      return state;
  }
};

export default limitOrders;
