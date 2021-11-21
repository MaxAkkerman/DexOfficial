import {Account} from "@tonclient/appkit";
import {AbiContract, abiContract, TonClient} from "@tonclient/core";
import {libNode} from "@tonclient/lib-node";

import {RUN_LOCAL_FAIL} from "./constants/errors";
import {LIMIT_ORDER_PRICE} from "./constants/variables";
import {DEXClientContract} from "./contracts/DEXClient";
import {DEXPairContract} from "./contracts/DEXPair";
import {DEXRootContract} from "./contracts/DEXRoot";
import {LimitOrderContract} from "./contracts/LimitOrder";
import {LimitOrderRootContract} from "./contracts/LimitOrderRoot";
import {RootTokenContractContract} from "./contracts/RootTokenContract";
import LimitOrder from "./entities/LimitOrder";
import Pair from "./entities/Pair";
import {
  GraphQLResp,
  LimitOrderCallback,
  LimitOrderRaw,
  LimitOrderStatus,
} from "./types";
import hexToString from "./utils/hexToString";
import {log} from "./utils/logger";

TonClient.useBinaryLibrary(libNode);

export class TonService {
  private tonClient: TonClient;
  private DEXClientCode: string;

  constructor() {
    this.tonClient = new TonClient({
      network: {endpoints: [process.env.TON_ENDPOINT]},
    });
  }

  static parseLimitOrder<
    T extends {amount: string; price: string; decimals: string},
  >(
    limitOrder: T,
  ): Omit<T, "amount" | "price" | "decimals"> & {
    amount: number;
    price: number;
    decimals: number;
  } {
    log(`parseLimitOrder->params`, limitOrder);
    const amount = +limitOrder.amount / 10 ** +limitOrder.decimals;
    const price = +limitOrder.price / LIMIT_ORDER_PRICE;

    return {
      ...limitOrder,
      amount,
      price,
      decimals: +limitOrder.decimals,
    };
  }

  private static async decode(abi: AbiContract, boc: string) {
    try {
      return await TonClient.default.abi.decode_message({
        abi: abiContract(abi),
        message: boc,
      });
    } catch (e: any) {
      return e.code;
    }
  }

  async getAllLimitOrders() {
    const rootAcc = new Account(LimitOrderRootContract, {
      address: process.env.LIMIT_ROOT_ADDRESS,
      client: this.tonClient,
    });

    const response = await rootAcc.runLocal("resolveCodeHash", {});
    log("LimitOrderRoot.resolveCodeHash()", response.decoded?.output);
    if (!response.decoded) throw new Error(RUN_LOCAL_FAIL);

    let hash = response.decoded.output.codeHash;
    hash = hash.substring(2, hash.length);

    const data: GraphQLResp[] = [];
    let dataPortion: GraphQLResp[] = [];

    do {
      const last = dataPortion.length
        ? dataPortion[dataPortion.length - 1].last_trans_lt
        : "";

      dataPortion = (
        await this.tonClient.net.query_collection({
          collection: "accounts",
          filter: {
            code_hash: {eq: hash},
            last_trans_lt: {gt: last},
          },
          result: "id last_trans_lt",
          limit: 25,
        })
      ).result as GraphQLResp[];

      data.push(...dataPortion);
    } while (dataPortion.length);

    const orders: Omit<LimitOrder, "pair" | "amountRaw" | "priceRaw">[] = [];
    const processing: Promise<void>[] = [];

    data.forEach(({id}) => {
      processing.push(
        new Promise<void>(async (resolve) => {
          const orderAcc = new Account(LimitOrderContract, {
            address: id,
            client: this.tonClient,
          });

          const res = await orderAcc.runLocal("getInfo", {});
          if (!res.decoded) throw new Error(RUN_LOCAL_FAIL);

          const limitOrderRaw = res.decoded.output as LimitOrderRaw;
          const limitOrder = TonService.parseLimitOrder({
            ...limitOrderRaw,
            addrOrder: id,
          });

          if (limitOrder.amount >= limitOrder.price) orders.push(limitOrder);

          resolve();
        }),
      );
    });

    await Promise.all(processing);

    return orders;
  }

  async getAllPairsReserves() {
    const rootAcc = new Account(DEXRootContract, {
      address: process.env.DEX_ROOT_ADDRESS,
      client: this.tonClient,
    });

    const res = await rootAcc.runLocal("pairs", {});
    if (!res.decoded) throw new Error(RUN_LOCAL_FAIL);
    log("DEXRoot.pairs", res.decoded.output.pairs);

    const pairsReserves: Omit<Pair, "abRatio" | "baRatio">[] = [];
    const processing: Promise<void>[] = [];

    Object.entries(res.decoded.output.pairs).forEach(
      ([addrPair, {root0, root1}]: any) => {
        processing.push(
          new Promise<void>(async (resolve) => {
            const pairAcc = new Account(DEXPairContract, {
              address: addrPair,
              client: this.tonClient,
            });

            const fetchingDetails = [];

            let tokenAcc = new Account(RootTokenContractContract, {
              address: root0,
              client: this.tonClient,
            });
            fetchingDetails.push(
              tokenAcc.runLocal("getDetails", {
                _answer_id: 0,
              }),
            );
            tokenAcc = new Account(RootTokenContractContract, {
              address: root1,
              client: this.tonClient,
            });
            fetchingDetails.push(
              tokenAcc.runLocal("getDetails", {
                _answer_id: 0,
              }),
            );

            const [res0, res1] = await Promise.all(fetchingDetails);
            if (!res0.decoded || !res1.decoded) throw new Error(RUN_LOCAL_FAIL);

            const decimals0 = Number(res0.decoded.output.value0.decimals);
            const decimals1 = Number(res1.decoded.output.value0.decimals);

            const bal = await pairAcc.runLocal("balanceReserve", {});
            if (!bal.decoded) throw new Error(RUN_LOCAL_FAIL);

            const balance0 = Number(bal.decoded.output.balanceReserve[root0]);
            const balance1 = Number(bal.decoded.output.balanceReserve[root1]);

            pairsReserves.push({
              addrPair,
              aReserve: balance0 / decimals0,
              bReserve: balance1 / decimals1,
              aRoot: root0,
              bRoot: root1,
              aName: hexToString(res0.decoded.output.value0.name),
              bName: hexToString(res1.decoded.output.value0.name),
              aSymbol: hexToString(res0.decoded.output.value0.symbol),
              bSymbol: hexToString(res1.decoded.output.value0.symbol),
              aDecimals: decimals0,
              bDecimals: decimals1,
            });

            resolve();
          }),
        );
      },
    );

    await Promise.all(processing);
    log("pairsReservers", pairsReserves);

    return pairsReserves;
  }

  async subscribeLimitOrder(
    cb: (
      status: LimitOrderStatus,
      limitOrder: LimitOrderCallback,
      dst: string,
    ) => Promise<void>,
  ) {
    const DEXClientCode = await this.getDEXClientCode();

    this.tonClient.net.subscribe_collection(
      {
        collection: "messages",
        filter: {
          code: {eq: DEXClientCode},
        },
        result: "boc dst",
      },
      async (params) => {
        if (
          !params ||
          !params.result ||
          !params.result.boc ||
          !params.result.dst
        )
          return;

        const decoded = await TonService.decode(
          DEXClientContract.abi,
          params.result.boc,
        );

        if (
          typeof decoded === "number" ||
          decoded.name !== "limitOrderCallback"
        )
          return;
        log("subscribeLimitOrder->params", params);

        const {status, ...limitOrder} = decoded.value;
        log(
          "subscribeLimitOrder->payload(decoded)",
          `${status},${JSON.stringify(limitOrder, null, 2)}`,
        );
        await cb(status, limitOrder, params.result.dst);
      },
    );
  }

  async subscribeSwap(cb: () => Promise<void>) {
    const DEXClientCode = await this.getDEXClientCode();

    this.tonClient.net.subscribe_collection(
      {
        collection: "messages",
        filter: {
          code: {eq: DEXClientCode},
        },
        result: "boc",
      },
      async (params) => {
        if (!params || !params.result || !params.result.boc) return;

        const decoded = await TonService.decode(
          DEXClientContract.abi,
          params.result.boc,
        );

        if (
          typeof decoded === "number" ||
          (decoded.name !== "processSwapA" &&
            decoded.name !== "processSwapB" &&
            decoded.name !== "processLiquidity" &&
            decoded.name !== "returnLiquidity")
        )
          return;

        await cb();
      },
    );
  }

  private async getDEXClientCode(): Promise<string> {
    if (this.DEXClientCode) return this.DEXClientCode;

    const rootAcc = new Account(DEXRootContract, {
      address: process.env.DEX_ROOT_ADDRESS,
      client: this.tonClient,
    });

    const res = await rootAcc.runLocal("codeDEXclient", {});
    if (!res.decoded) throw new Error(RUN_LOCAL_FAIL);

    const {codeDEXclient} = res.decoded?.output.codeDEXclient;
    this.DEXClientCode = codeDEXclient;

    return codeDEXclient;
  }
}
