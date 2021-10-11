import {useDispatch, useSelector} from "react-redux";

import {
	closeOrderCancelPopup,
	closeOrderDeployPopup,
	closeOrderUpdatePopup,
	closeOrderWaitPopup,
} from "../../store/actions/limitOrders";
import OrderPopupCancel from "../OrderPopupCancel/OrderPopupCancel";
import OrderPopupDeploy from "../OrderPopupDeploy/OrderPopupDeploy";
import OrderPopupUpdate from "../OrderPopupUpdate/OrderPopupUpdate";
import WaitingPopup from "../WaitingPopup/WaitingPopup";

export default function PopupManager() {
	const dispatch = useDispatch();

	const orderPopupCancelVisible = useSelector(
		(state) => state.limitOrders.orderPopupCancelVisible,
	);
	const orderPopupCancelPayload = useSelector(
		(state) => state.limitOrders.orderPopupCancelPayload,
	);
	const orderPopupDeployVisible = useSelector(
		(state) => state.limitOrders.orderPopupDeployVisible,
	);
	const orderPopupDeployPayload = useSelector(
		(state) => state.limitOrders.orderPopupDeployPayload,
	);
	const orderPopupUpdateVisible = useSelector(
		(state) => state.limitOrders.orderPopupUpdateVisible,
	);
	const orderPopupUpdatePayload = useSelector(
		(state) => state.limitOrders.orderPopupUpdatePayload,
	);
	const orderPopupWaitVisible = useSelector(
		(state) => state.limitOrders.orderPopupWaitVisible,
	);
	const orderPopupWaitPayload = useSelector(
		(state) => state.limitOrders.orderPopupWaitPayload,
	);

	return (
		<>
			{orderPopupCancelVisible && (
				<OrderPopupCancel
					{...orderPopupCancelPayload}
					close={() => dispatch(closeOrderCancelPopup())}
				/>
			)}
			{orderPopupDeployVisible && (
				<OrderPopupDeploy
					{...orderPopupDeployPayload}
					close={() => dispatch(closeOrderDeployPopup())}
				/>
			)}
			{orderPopupUpdateVisible && (
				<OrderPopupUpdate
					{...orderPopupUpdatePayload}
					close={() => dispatch(closeOrderUpdatePopup())}
				/>
			)}
			{orderPopupWaitVisible && (
				<WaitingPopup
					{...orderPopupWaitPayload}
					handleClose={() => dispatch(closeOrderWaitPopup())}
				/>
			)}
		</>
	);
}
