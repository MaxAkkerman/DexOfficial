import cancelLimitOrder from "../../utils/cancelLimitOrder";
import OrderPopupInternal from "../OrderPopupInternal/OrderPopupInternal";

export default function OrderPopupCancel({
	order,
	popupStateFn,
	waitPopupStateFn,
}) {
	const {id, fromSymbol, toSymbol, fromValue, toValue} = order;

	return (
		<OrderPopupInternal
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
