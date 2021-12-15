import {
  Args,
  FieldResolver,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import {Service} from "typedi";
import {LessThanOrEqual, Repository} from "typeorm";
import {InjectRepository} from "typeorm-typedi-extensions";

import {LIMIT_ORDER_UNKNOWN_STATUS, PAIR_NULL} from "./constants/errors";
import {LIMIT_ORDER_PRICE, NOTIF_UPDATE_ORDER} from "./constants/variables";
import LimitOrder from "./entities/LimitOrder";
import Pair from "./entities/Pair";
import {
  DirectionPair,
  LimitOrderPayload,
  LimitOrdersForOwnerArgs,
  LimitOrdersForSwapArgs,
  LimitOrdersForSwapResponse,
  LimitOrderStatus,
  LimitOrderStatusGraphQL,
  LimitOrderUpdate,
} from "./types";
import getLimitOrdersForSwap from "./utils/getLimitOrdersForSwap";
import {log} from "./utils/logger";

@Service()
@Resolver(LimitOrder)
export class LimitOrderResolver {
  @InjectRepository(Pair)
  private pairsRepo: Repository<Pair>;

  @InjectRepository(LimitOrder)
  private limitOrdersRepo: Repository<LimitOrder>;

  @Query(() => [LimitOrder])
  async limitOrdersForOwner(
    @Args() {addrOwner}: LimitOrdersForOwnerArgs,
  ): Promise<LimitOrder[]> {
    const limitOrders = await this.limitOrdersRepo.find({
      where: {
        addrOwner,
      },
    });
    log("limitOrdersForOwner.length", limitOrders.length);

    return limitOrders;
  }

  @Query(() => LimitOrdersForSwapResponse)
  async limitOrdersForSwap(
    @Args() {addrPair, directionPair, amount, slippage}: LimitOrdersForSwapArgs,
  ): Promise<LimitOrdersForSwapResponse> {
    const pair = await this.pairsRepo.findOne({
      where: {addrPair},
    });

    if (!pair) throw new Error(PAIR_NULL);

    const swapRate =
      directionPair === DirectionPair.AB ? pair.abRatio : pair.baRatio;
    log("swapRate", swapRate);

    let limitOrders = await this.limitOrdersRepo.find({
      where: {
        price: LessThanOrEqual(swapRate + swapRate * (slippage / 100)),
        addrPair,
        directionPair,
      },
    });
    log(`DB.limitOrders.length (price < ${swapRate})`, limitOrders.length);
    limitOrders = getLimitOrdersForSwap(limitOrders, swapRate, amount);
    log("limitOrdersForSwap.length", limitOrders.length);

    const leftoverSwap = limitOrders.reduce(
      (acc, val) => acc - val.amount,
      amount,
    );

    return {
      leftoverSwap,
      limitOrders,
    };
  }

  @FieldResolver()
  priceRaw(@Root() limitOrder: LimitOrder): number {
    return Math.trunc(limitOrder.price * LIMIT_ORDER_PRICE);
  }

  @FieldResolver()
  amountRaw(@Root() limitOrder: LimitOrder): number {
    return Math.trunc(limitOrder.amount * 10 ** limitOrder.decimals);
  }

  @FieldResolver()
  async pair(@Root() limitOrder: LimitOrder): Promise<Pair> {
    const pair = await this.pairsRepo.findOne({
      where: {
        addrPair: limitOrder.addrPair,
      },
    });
    if (!pair) throw new Error(PAIR_NULL);
    return pair;
  }

  @Subscription(() => LimitOrderUpdate, {
    topics: NOTIF_UPDATE_ORDER,
    filter: ({
      payload,
      args,
    }: {
      args: LimitOrdersForOwnerArgs;
      payload: LimitOrderPayload;
    }) => {
      log(
        "updateLimitOrder->filter_params(payload,args)",
        `${JSON.stringify(payload, null, 2)},${JSON.stringify(args, null, 2)}`,
      );
      return (
        payload.dexClientAddr === args.addrOwner ||
        payload.limitOrder.addrOwner === args.addrOwner
      );
    },
  })
  async updateLimitOrder(
    @Args() {addrOwner}: LimitOrdersForOwnerArgs,
    @Root() {status, dexClientAddr, limitOrder}: LimitOrderPayload,
  ): Promise<LimitOrderUpdate> {
    log("updateLimitOrder->trigger_subscription");
    switch (status) {
      case LimitOrderStatus.APPLY_ORDER: {
        if (dexClientAddr === addrOwner)
          return {
            limitOrder,
            status: LimitOrderStatusGraphQL.APPLY_ORDER,
          };

        const loDb = await this.limitOrdersRepo.findOne({
          where: {
            addrOrder: limitOrder.addrOrder,
          },
        });
        if (loDb)
          return {
            limitOrder,
            status: LimitOrderStatusGraphQL.PART_CLOSE_ORDER,
          };
        else
          return {
            limitOrder,
            status: LimitOrderStatusGraphQL.CLOSE_ORDER,
          };
      }
      case LimitOrderStatus.CANCEL_ORDER:
        return {
          limitOrder,
          status: LimitOrderStatusGraphQL.CANCEL_ORDER,
        };
      case LimitOrderStatus.CHANGE_OWNER:
        if (dexClientAddr === addrOwner)
          return {
            limitOrder,
            status: LimitOrderStatusGraphQL.CHANGE_OWNER,
          };
        return {
          limitOrder,
          status: LimitOrderStatusGraphQL.GIFT_ORDER,
        };
      case LimitOrderStatus.CHANGE_PRICE:
        return {
          limitOrder,
          status: LimitOrderStatusGraphQL.CHANGE_PRICE,
        };
      case LimitOrderStatus.CLOSE_ORDER:
        return {
          limitOrder,
          status: LimitOrderStatusGraphQL.CLOSE_ORDER,
        };
      case LimitOrderStatus.DEPLOY_ORDER:
        return {
          limitOrder,
          status: LimitOrderStatusGraphQL.DEPLOY_ORDER,
        };
      case LimitOrderStatus.APPLY_ORDER_FAILE:
        return {
          limitOrder,
          status: LimitOrderStatusGraphQL.APPLY_ORDER_FAIL,
        };
      default:
        throw new Error(LIMIT_ORDER_UNKNOWN_STATUS);
    }
  }
}
