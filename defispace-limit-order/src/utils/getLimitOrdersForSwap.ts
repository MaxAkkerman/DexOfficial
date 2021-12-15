import LimitOrder from "../entities/LimitOrder";
import {log} from "./logger";

type PartLimitOrder = Pick<LimitOrder, "amount" | "price">;

export default function getLimitOrdersForSwap<T extends PartLimitOrder>(
  limitOrders: T[],
  swapRate: number,
  amount: number,
): T[] {
  const swapCost = calcSwapCost(swapRate, amount);

  limitOrders.sort((a, b) => {
    if (a.amount === b.amount) return b.price - a.price;
    return b.amount - a.amount;
  });

  const limitOrdersForSwap: T[] = [];
  for (let i = 0; i < limitOrders.length; i++) {
    let leftAmount = amount;

    for (let j = i; j < limitOrders.length; j++) {
      const limitOrder = limitOrders[j];
      if (leftAmount <= 0) break;

      if (leftAmount >= limitOrder.amount) {
        leftAmount -= limitOrder.amount;
        limitOrdersForSwap.push(limitOrder);
      } else {
        limitOrdersForSwap.push({
          ...limitOrder,
          amount: leftAmount,
        });
        leftAmount = 0;
      }
    }

    const limitOrdersCost = calcLimitOrdersCost(limitOrdersForSwap);
    log("limitOrdersCost,swapCost", `${limitOrdersCost},${swapCost}`);
    if (limitOrdersCost <= swapCost && leftAmount === 0)
      return limitOrdersForSwap;
    else if (limitOrdersCost + calcSwapCost(swapRate, leftAmount) <= swapCost)
      return limitOrdersForSwap;
    else limitOrdersForSwap.length = 0;
  }
  return limitOrdersForSwap;
}

function calcLimitOrdersCost<T extends PartLimitOrder>(
  limitOrders: T[],
): number {
  return limitOrders.reduce(
    (acc, val) =>
      acc +
      val.amount * val.price +
      Number(process.env.LIMIT_ORDER_PROCESSING_FEE) +
      Number(process.env.LIMIT_ORDER_GAS_FEE),
    0,
  );
}

function calcSwapCost(swapRate: number, amount: number) {
  return (
    amount * swapRate +
    +process.env.SWAP_PROCESSING_FEE +
    +process.env.SWAP_GAS_FEE
  );
}
