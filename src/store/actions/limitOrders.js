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
} from "./types";

export function setOrdersFromInputValue(payload) {
	return {type: SET_ORDERS_FROM_INPUT_VALUE, payload};
}
// export function setOrdersFromInputValueChange(payload) {
//     return {type: SET_ORDERS_FROM_INPUT_VALUE_CHANGE, payload}
// }

export function setOrdersToInputValue(payload) {
	return {type: SET_ORDERS_TO_INPUT_VALUE, payload};
}

export function setOrdersFromToken(payload) {
	return {type: SET_ORDERS_FROM_TOKEN, payload};
}

export function setOrdersToToken(payload) {
	return {type: SET_ORDERS_TO_TOKEN, payload};
}

export function setOrdersPairId(payload) {
	return {type: SET_ORDERS_PAIR_ID, payload};
}
export function setOrdersRate(payload) {
	return {type: SET_ORDERS_RATE, payload};
}

export function showOrdersFromSelect() {
	return {type: SHOW_ORDERS_FROM_SELECT};
}

export function hideOrdersFromSelect() {
	return {type: HIDE_ORDERS_FROM_SELECT};
}

export function showOrdersToSelect() {
	return {type: SHOW_ORDERS_TO_SELECT};
}

export function hideOrdersToSelect() {
	return {type: HIDE_ORDERS_TO_SELECT};
}

export function setOrderList(payload) {
	return {type: SET_ORDER_LIST, payload};
}

export function addToOrderList(payload) {
	return {type: ADD_TO_ORDER_LIST, payload};
}

export function removeFromOrderList(payload) {
	return {type: REMOVE_FROM_ORDER_LIST, payload};
}

export function updatePriceFromOrderList(payload) {
	return {type: UPDATE_PRICE_ORDER_LIST, payload};
}

export function setOrderListLoading(payload) {
	return {type: SET_ORDER_LIST_LOADING, payload};
}

export function setOrderListFetched(payload) {
	return {type: SET_ORDER_LIST_FETCHED, payload};
}

export function openOrderCancelPopup(payload) {
	return {type: OPEN_ORDER_CANCEL_POPUP, payload};
}

export function closeOrderCancelPopup() {
	return {type: CLOSE_ORDER_CANCEL_POPUP};
}

export function openOrderDeployPopup(payload) {
	return {type: OPEN_ORDER_DEPLOY_POPUP, payload};
}

export function closeOrderDeployPopup() {
	return {type: CLOSE_ORDER_DEPLOY_POPUP};
}

export function openOrderUpdatePopup(payload) {
	return {type: OPEN_ORDER_UPDATE_POPUP, payload};
}

export function closeOrderUpdatePopup() {
	return {type: CLOSE_ORDER_UPDATE_POPUP};
}

export function openOrderWaitPopup(payload) {
	return {type: OPEN_ORDER_WAIT_POPUP, payload};
}

export function closeOrderWaitPopup() {
	return {type: CLOSE_ORDER_WAIT_POPUP};
}
