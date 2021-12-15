import {
	RESET_WAITING_POPUP_VALUES,
	SET_WAITING_POPUP_VALUES,
} from "@/store/actions/types";

export function setWaitingPopupValues(values) {
	return {payload: values, type: SET_WAITING_POPUP_VALUES};
}

export function resetWaitingPopupValues() {
	return {type: RESET_WAITING_POPUP_VALUES};
}
