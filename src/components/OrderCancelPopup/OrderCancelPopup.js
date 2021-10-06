import cancelLimitOrder from "../../utils/cancelLimitOrder";
import OrderInternalPopup from "../OrderInternalPopup/OrderInternalPopup";

export default function OrderCancelPopup({
	order,
	popupStateFn,
	waitPopupStateFn,
}) {
	const {id, fromSymbol, toSymbol, fromValue, toValue} = order;

	return (
		<OrderInternalPopup
			title="Confirm Limit Order cancel"
			order={order}
			contractFn={async ({clientAddress, clientKeyPair}) => {
				const {cancelOrderStatus} = await cancelLimitOrder(id, {
					clientAddress,
					clientKeyPair,
				});

				return cancelOrderStatus;
			}}
			contractSuccessText={`Canceling limit order with ${fromValue} ${fromSymbol} for ${toValue} ${toSymbol} ⏳`}
			contractFailText={`Failed to cancel limit order with ${fromValue} ${fromSymbol} for ${toValue} ${toSymbol}`}
			buttonProps={{
				className: "btn-error unlock",
				children: "Cancel order",
			}}
			popupStateFn={popupStateFn}
			waitPopupStateFn={waitPopupStateFn}
		/>
	);
}
