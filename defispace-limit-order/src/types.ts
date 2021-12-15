import {IsPositive, Matches, Max, Min} from "class-validator";
import {ArgsType, Field, Float, ObjectType} from "type-graphql";

import LimitOrder from "./entities/LimitOrder";

export enum LimitOrderStatus {
  DEPLOY_ORDER = "1",
  CHANGE_PRICE = "2",
  CHANGE_OWNER = "3",
  CANCEL_ORDER = "4",
  APPLY_ORDER = "5",
  APPLY_ORDER_FAILE = "6",
  CLOSE_ORDER = "7", // this status doesn't exist in contract
}

export enum LimitOrderStatusGraphQL {
  DEPLOY_ORDER = "1",
  CHANGE_PRICE = "2",
  CHANGE_OWNER = "3",
  CANCEL_ORDER = "4",
  APPLY_ORDER = "5",
  APPLY_ORDER_FAIL = "6",
  CLOSE_ORDER = "7", // this status doesn't exist in contract
  PART_CLOSE_ORDER = "8",
  GIFT_ORDER = "9",
}

export enum DirectionPair {
  AB = "4",
  BA = "5",
}

@ArgsType()
export class LimitOrdersForSwapArgs {
  @Field(() => String)
  @Matches(/^0:[A-Fa-f0-9]{64}$/)
  addrPair: string;

  @Field(() => DirectionPair)
  directionPair: DirectionPair;

  @Field(() => Float)
  @IsPositive()
  amount: number;

  @Field(() => Float)
  @Min(0)
  @Max(100)
  slippage: number;
}

@ArgsType()
export class LimitOrdersForOwnerArgs {
  @Field(() => String)
  @Matches(/^0:[A-Fa-f0-9]{64}$/)
  addrOwner: string;
}

@ObjectType()
export class LimitOrdersForSwapResponse {
  @Field(() => [LimitOrder])
  limitOrders: LimitOrder[];

  @Field(() => Float)
  leftoverSwap: number;
}

export class LimitOrderPayload {
  dexClientAddr: string;
  status: LimitOrderStatus;
  limitOrder: LimitOrder;
}

@ObjectType()
export class LimitOrderUpdate {
  @Field(() => LimitOrderStatusGraphQL)
  status: LimitOrderStatusGraphQL;

  @Field(() => LimitOrder)
  limitOrder: LimitOrder;
}

export interface LimitOrderRaw
  extends Omit<LimitOrder, "amount" | "price" | "decimals" | "addrOrder"> {
  amount: string;
  price: string;
  decimals: string;
}

export interface LimitOrderCallback
  extends Omit<
    LimitOrder,
    | "amount"
    | "price"
    | "decimals"
    | "addrRoot"
    | "addrRouter"
    | "walletOwnerRoot"
  > {
  amount: string;
  price: string;
}

export interface GraphQLResp {
  id: string;
  last_trans_lt: string;
}
