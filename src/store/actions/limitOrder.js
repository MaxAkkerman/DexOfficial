import {
	RESET_LIMIT_ORDER_POPUP_VALUES,
	SET_LIMIT_ORDER_POPUP_VALUES,
} from "@/store/actions/types";

export function setLimitOrderPopupValues(values) {
	return {
		payload: values,
		type: SET_LIMIT_ORDER_POPUP_VALUES,
	};
}

export function resetLimitOrderPopupValues() {
	return {
		type: RESET_LIMIT_ORDER_POPUP_VALUES,
	};
}
