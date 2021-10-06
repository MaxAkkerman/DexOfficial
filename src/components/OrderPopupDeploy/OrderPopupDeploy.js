import makeLimitOrder from "../../utils/makeLimitOrder";
import OrderPopupInternal from "../OrderPopupInternal/OrderPopupInternal";

export default function OrderPopupDeploy({
	order,
	pairId,
	popupStateFn,
	waitPopupStateFn,
}) {
	const {fromSymbol, toSymbol, fromValue, toValue, price} = order;

	return (
		<OrderPopupInternal
			title="Confirm Limit Order creation"
			order={order}
			contractFn={async ({clientAddress, clientKeyPair}) => {
				const {makeLimitOrderStatus} = await makeLimitOrder(
					{
						price,
						qty: fromValue,
						tokenSymbol: fromSymbol,
						pairAddr: pairId,
					},
					{
						clientKeyPair,
						clientAddr: clientAddress,
					},
				);

				return makeLimitOrderStatus;
			}}
			contractSuccessText={`Creating limit order with ${fromValue} ${fromSymbol} for ${toValue} ${toSymbol} ⏳`}
			contractFailText={`Failed creation of limit order with ${fromValue} ${fromSymbol} for ${toValue} ${toSymbol}`}
			buttonProps={{
				children: "Confirm Order",
			}}
			popupStateFn={popupStateFn}
			waitPopupStateFn={waitPopupStateFn}
		/>
	);
}
