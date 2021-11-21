import "reflect-metadata";
import "dotenv-safe/config";

import fastify from "fastify";
import fastifyCors from "fastify-cors";
import {PubSub} from "graphql-subscriptions";
import mercurius from "mercurius";
import {buildSchema, registerEnumType} from "type-graphql";
import {Container} from "typedi";
import {createConnection, getConnectionOptions, useContainer} from "typeorm";
import {Container as ContainerDb} from "typeorm-typedi-extensions";

import {PAIR_NULL} from "./constants/errors";
import {NOTIF_UPDATE_ORDER} from "./constants/variables";
import LimitOrder from "./entities/LimitOrder";
import Pair from "./entities/Pair";
import {LimitOrderResolver} from "./resolvers";
import {TonService} from "./services";
import {
  DirectionPair,
  LimitOrderStatus,
  LimitOrderStatusGraphQL,
} from "./types";
import {error, log} from "./utils/logger";

async function start() {
  const server = fastify();
  server.register(fastifyCors, {
    origin: "*",
  });

  // Add container for typeorm to use injection
  useContainer(ContainerDb);
  const dbOptions = await getConnectionOptions(
    process.env.NODE_ENV === "development" ? "dev" : "prod",
  );
  const con = await createConnection({
    ...dbOptions,
    name: "default",
  });

  // Seeding DB
  const ton = new TonService();
  // Seeding limit orders
  const repoLimitOrder = con.getRepository(LimitOrder);
  const limitOrders = await ton.getAllLimitOrders();
  await repoLimitOrder.insert(limitOrders);
  // Seeding pairs rate
  const repoPair = con.getRepository(Pair);
  let pairsReserves = await ton.getAllPairsReserves();
  await repoPair.insert(pairsReserves);

  // Subscriptions
  const pubsub = new PubSub();
  // Subscription for limit orders
  await ton.subscribeLimitOrder(async (status, limitOrderCallback, dst) => {
    const pair = await repoPair.findOne({
      where: {addrPair: limitOrderCallback.addrPair},
    });
    if (!pair) throw new Error(PAIR_NULL);
    const limitOrder = TonService.parseLimitOrder({
      ...limitOrderCallback,
      decimals:
        limitOrderCallback.directionPair === DirectionPair.AB
          ? pair.aDecimals.toString()
          : pair.bDecimals.toString(),
    });

    if (
      status === LimitOrderStatus.DEPLOY_ORDER ||
      status === LimitOrderStatus.CHANGE_PRICE ||
      status === LimitOrderStatus.CHANGE_OWNER ||
      status === LimitOrderStatus.APPLY_ORDER ||
      status === LimitOrderStatus.CANCEL_ORDER ||
      status === LimitOrderStatus.APPLY_ORDER_FAILE
    ) {
      log("subscribeLimitOrder->called_with_status", status);
      await pubsub.publish(NOTIF_UPDATE_ORDER, {
        status,
        limitOrder,
        dexClientAddr: dst,
      });
    }

    if (status === LimitOrderStatus.DEPLOY_ORDER) {
      log("subscribeLimitOrder->deploy", limitOrder.addrOrder);
      await repoLimitOrder.insert(limitOrder);
    } else if (
      status === LimitOrderStatus.CHANGE_PRICE ||
      status === LimitOrderStatus.CHANGE_OWNER
    ) {
      log("subscribeLimitOrder->update_addr", limitOrderCallback.addrOrder);
      await repoLimitOrder.update(
        {addrOrder: limitOrder.addrOrder},
        limitOrder,
      );
    } else if (status === LimitOrderStatus.APPLY_ORDER) {
      log("subscribeLimitOrder->apply_addr", limitOrder.addrOrder);
      const loDb = await repoLimitOrder.findOne({
        addrOrder: limitOrderCallback.addrOrder,
      });
      if (!loDb) {
        log("subscribeLimitOrder->apply_addr (404)");
        return;
      }

      log("subscribeLimitOrder->apply_addr (left amount)", limitOrder.amount);
      if (limitOrder.amount <= 1e-9) {
        log("subscribeLimitOrder->apply_addr (delete)");
        await repoLimitOrder.delete({addrOrder: loDb.addrOrder});
      } else {
        log("subscribeLimitOrder->apply_addr (update)");
        await repoLimitOrder.update({addrOrder: loDb.addrOrder}, limitOrder);
      }
    } else if (status === LimitOrderStatus.CANCEL_ORDER) {
      log("subscribeLimitOrder->cancel_addr", limitOrderCallback.addrOrder);
      await repoLimitOrder.delete({addrOrder: limitOrder.addrOrder});
    } else if (status === LimitOrderStatus.APPLY_ORDER_FAILE) {
      log("subscribeLimitOrder->apply_failed");
    } else {
      log("subscribeLimitOrder->unknown_addr", limitOrder.addrOrder);
      log("subscribeLimitOrder->got_unknown_status", status);
    }
  });
  // Subscription for swap
  await ton.subscribeSwap(async () => {
    log("subscribeSwap->triggered");
    await repoPair.clear();
    pairsReserves = await ton.getAllPairsReserves();
    await repoPair.insert(pairsReserves);
  });

  // Generate GraphQL enum types
  registerEnumType(LimitOrderStatusGraphQL, {
    name: "LimitOrderStatus",
  });
  registerEnumType(DirectionPair, {
    name: "DirectionPair",
  });
  // Generate schema
  const schema = await buildSchema({
    resolvers: [LimitOrderResolver],
    // Add container for type-graphql to use injection
    container: Container,
    pubSub: pubsub,
  });

  server.register(mercurius, {
    schema,
    graphiql: true,
    subscription: true,
  });

  server.listen(process.env.PORT, process.env.HOST, (err, address) => {
    if (err) {
      error(err);
      process.exit(1);
    }
    log(`GraphQL server listening at ${address}/graphql`);
  });

  process.on("SIGTERM", async () => {
    await server.close();
    log("Server closed");
  });
}

start();
