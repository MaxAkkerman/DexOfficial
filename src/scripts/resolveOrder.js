    const { TonClient, abiContract, signerKeys } = require("@tonclient/core");
    const { libNode } = require("@tonclient/lib-node");
    const { Account } = require("@tonclient/appkit");
    const { LimitOrderRootContract } = require("../ton-packages/LimitOrderRoot.js");
    const { LimitOrderContract } = require("../ton-packages/LimitOrder.js");
    const { IndexContract } = require("../ton-packages/Index.js");
    const { LimitOrderRouterContract } = require("../ton-packages/LimitOrderRouter.js");
    const { GiverContract } = require("../ton-packages/Giver.js");
    const { RootTokenContractContract } = require("../ton-packages/RootTokenContract.js");

    const hex2ascii = require('hex2ascii');
    const fs = require('fs');
    const pathJson = '../keys/LimitOrderRoot.json';

    const dotenv = require('dotenv').config();
    const networks = ["http://localhost",'net1.ton.dev','main.ton.dev','rustnet.ton.dev','https://gql.custler.net'];
    const hello = ["Hello localhost TON!","Hello dev net TON!","Hello main net TON!","Hello rust dev net TON!","Hello fld dev net TON!"];
    const networkSelector = 1;

    const zeroAddress = '0:0000000000000000000000000000000000000000000000000000000000000000';

    TonClient.useBinaryLibrary(libNode);

    async function logEvents(params, response_type) {
      // console.log(`params = ${JSON.stringify(params, null, 2)}`);
      // console.log(`response_type = ${JSON.stringify(response_type, null, 2)}`);
    }
    function getShard(string) {
      return string[2];
    }
    async function main(client) {
      let response;
      // let codeHash = '0eb29db5c28c866311d20aa8f716d5922be0b4a42e0204888b37bb0ff525449b';

      const rootAddr = JSON.parse(fs.readFileSync(pathJson,{encoding: "utf8"})).address;
      const rootKeys = JSON.parse(fs.readFileSync(pathJson,{encoding: "utf8"})).keys;

      let targetShard = getShard(rootAddr);

      console.log("target shard", targetShard)
      const rootAcc = new Account(LimitOrderRootContract, {
        address:rootAddr,
        signer: rootKeys,
        client,
      });

      let souint = 0;
      let curShard = null;

      while (curShard !== targetShard){

        response = await rootAcc.runLocal("resolveOrder", {id:souint});
        console.log("shards", targetShard,curShard);

        curShard = response.decoded.output.addrOrder[2]
        console.log("shards", targetShard,curShard);
        souint++
      }
    }

    (async () => {
      const client = new TonClient({network: { endpoints: [networks[networkSelector]],},});
      try {
        console.log(hello[networkSelector]);
        await main(client);
        process.exit(0);
      } catch (error) {
        if (error.code === 504) {
          console.error(`Network is inaccessible. Pls check connection`);
        } else {
          console.error(error);
        }
      }
      client.close();
    })();
