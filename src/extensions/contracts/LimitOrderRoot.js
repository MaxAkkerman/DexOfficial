module.exports = {
  LimitOrderRootContract: {
    abi: {
      'ABI version': 2,
      header: ['time', 'expire'],
      functions: [
        {
          name: 'constructor',
          inputs: [
            { name: 'codeIndex', type: 'cell' },
            { name: 'codeOrder', type: 'cell' },
            { name: 'codeRouter', type: 'cell' },
            { name: 'rootArr', type: 'address[]' },
          ],
          outputs: [],
        },
        {
          name: 'deployRouterCallback',
          inputs: [{ name: 'router', type: 'address' }],
          outputs: [],
        },
        {
          name: 'connectRouterToRoot',
          inputs: [{ name: 'root', type: 'address' }],
          outputs: [],
        },
        {
          name: 'createOrder',
          inputs: [
            { name: 'addrOwner', type: 'address' },
            { name: 'addrPair', type: 'address' },
            { name: 'directionPair', type: 'uint8' },
            { name: 'price', type: 'uint128' },
            { name: 'amount', type: 'uint128' },
            { name: 'walletOwnerRoot', type: 'address' },
            { name: 'walletOwnerFrom', type: 'address' },
            { name: 'walletOwnerTo', type: 'address' },
            { name: 'decimals', type: 'uint8' },
          ],
          outputs: [],
        },
        {
          name: 'cancelOrder',
          inputs: [
            { name: 'id', type: 'uint256' },
            { name: 'amount', type: 'uint128' },
            { name: 'addrOwner', type: 'address' },
            { name: 'walletOwnerRoot', type: 'address' },
            { name: 'walletOwnerFrom', type: 'address' },
          ],
          outputs: [],
        },
        {
          name: 'resolveCodeHashIndex',
          inputs: [
            { name: 'addrRoot', type: 'address' },
            { name: 'addrOwner', type: 'address' },
            { name: 'addrPair', type: 'address' },
            { name: 'directionPair', type: 'uint8' },
            { name: 'price', type: 'uint128' },
          ],
          outputs: [{ name: 'codeHashIndex', type: 'uint256' }],
        },
        {
          name: 'resolveIndex',
          inputs: [
            { name: 'addrRoot', type: 'address' },
            { name: 'addrOwner', type: 'address' },
            { name: 'addrPair', type: 'address' },
            { name: 'directionPair', type: 'uint8' },
            { name: 'price', type: 'uint128' },
            { name: 'addrOrder', type: 'address' },
          ],
          outputs: [{ name: 'addrIndex', type: 'address' }],
        },
        {
          name: 'resolveCodeHash',
          inputs: [],
          outputs: [{ name: 'codeHash', type: 'uint256' }],
        },
        {
          name: 'resolveOrder',
          inputs: [{ name: 'id', type: 'uint256' }],
          outputs: [{ name: 'addrOrder', type: 'address' }],
        },
        {
          name: '_deployedAddress',
          inputs: [],
          outputs: [{ name: '_deployedAddress', type: 'address' }],
        },
        {
          name: '_deployedRouter',
          inputs: [],
          outputs: [{ name: '_deployedRouter', type: 'address' }],
        },
      ],
      data: [],
      events: [],
    },
    tvc: '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',
    code: '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',
  },
};
