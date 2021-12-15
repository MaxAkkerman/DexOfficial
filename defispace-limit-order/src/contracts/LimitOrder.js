module.exports = {
  LimitOrderContract: {
    abi: {
      "ABI version": 2,
      header: ["time", "expire"],
      functions: [
        {
          name: "constructor",
          inputs: [
            {name: "codeIndex", type: "cell"},
            {name: "addrRouter", type: "address"},
            {name: "addrOwner", type: "address"},
            {name: "addrPair", type: "address"},
            {name: "directionPair", type: "uint8"},
            {name: "price", type: "uint128"},
            {name: "amount", type: "uint128"},
            {name: "walletOwnerRoot", type: "address"},
            {name: "walletOwnerFrom", type: "address"},
            {name: "walletOwnerTo", type: "address"},
            {name: "decimals", type: "uint8"},
          ],
          outputs: [],
        },
        {
          name: "applyOrder",
          inputs: [
            {name: "receivedAmount", type: "uint128"},
            {name: "price", type: "uint128"},
            {name: "idCallback", type: "uint256"},
            {name: "receivedDecimals", type: "uint8"},
          ],
          outputs: [],
        },
        {
          name: "applyOrderCallback",
          inputs: [
            {name: "result", type: "bool"},
            {name: "amount", type: "uint128"},
            {name: "originalGasTo", type: "address"},
          ],
          outputs: [],
        },
        {
          name: "transferOwnership",
          inputs: [
            {name: "addrNewOwner", type: "address"},
            {name: "walletNewOwnerFrom", type: "address"},
            {name: "walletNewOwnerTo", type: "address"},
          ],
          outputs: [],
        },
        {
          name: "changePrice",
          inputs: [{name: "newPrice", type: "uint128"}],
          outputs: [],
        },
        {name: "cancelOrder", inputs: [], outputs: []},
        {name: "cancelOrderCallback", inputs: [], outputs: []},
        {
          name: "convertToDecimal",
          inputs: [
            {name: "amount", type: "uint256"},
            {name: "decimal", type: "uint8"},
            {name: "newDecimal", type: "uint8"},
          ],
          outputs: [{name: "value0", type: "uint256"}],
        },
        {
          name: "add",
          inputs: [
            {name: "x", type: "uint256"},
            {name: "y", type: "uint256"},
          ],
          outputs: [
            {name: "value0", type: "bool"},
            {name: "value1", type: "uint256"},
          ],
        },
        {
          name: "integer",
          inputs: [{name: "x", type: "uint256"}],
          outputs: [{name: "value0", type: "uint256"}],
        },
        {
          name: "fractional",
          inputs: [{name: "x", type: "uint256"}],
          outputs: [{name: "value0", type: "uint256"}],
        },
        {
          name: "multiply",
          inputs: [
            {name: "x", type: "uint256"},
            {name: "y", type: "uint256"},
          ],
          outputs: [
            {name: "value0", type: "bool"},
            {name: "value1", type: "uint256"},
          ],
        },
        {
          name: "divide",
          inputs: [
            {name: "x", type: "uint256"},
            {name: "y", type: "uint256"},
          ],
          outputs: [
            {name: "value0", type: "bool"},
            {name: "value1", type: "uint256"},
          ],
        },
        {
          name: "getInfo",
          inputs: [],
          outputs: [
            {name: "addrRoot", type: "address"},
            {name: "addrRouter", type: "address"},
            {name: "addrOwner", type: "address"},
            {name: "addrPair", type: "address"},
            {name: "directionPair", type: "uint8"},
            {name: "price", type: "uint128"},
            {name: "amount", type: "uint128"},
            {name: "walletOwnerRoot", type: "address"},
            {name: "walletOwnerFrom", type: "address"},
            {name: "walletOwnerTo", type: "address"},
            {name: "status", type: "uint8"},
            {name: "decimals", type: "uint8"},
          ],
        },
        {
          name: "resolveCodeHashIndex",
          inputs: [
            {name: "addrRoot", type: "address"},
            {name: "addrOwner", type: "address"},
            {name: "addrPair", type: "address"},
            {name: "directionPair", type: "uint8"},
            {name: "price", type: "uint128"},
          ],
          outputs: [{name: "codeHashIndex", type: "uint256"}],
        },
        {
          name: "resolveIndex",
          inputs: [
            {name: "addrRoot", type: "address"},
            {name: "addrOwner", type: "address"},
            {name: "addrPair", type: "address"},
            {name: "directionPair", type: "uint8"},
            {name: "price", type: "uint128"},
            {name: "addrOrder", type: "address"},
          ],
          outputs: [{name: "addrIndex", type: "address"}],
        },
      ],
      data: [{key: 1, name: "_id", type: "uint256"}],
      events: [],
    },
    tvc: "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",
    code: "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",
  },
};
