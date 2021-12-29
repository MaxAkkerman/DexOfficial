module.exports = {
  LimitOrderRootContract: {
    abi: {
      'ABI version': 2,
      version: '2.2',
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
            { name: 'souint', type: 'uint256' },
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
          name: 'soUINT',
          inputs: [],
          outputs: [{ name: 'soUINT', type: 'uint256' }],
        },
        {
          name: '_deployedNumber',
          inputs: [],
          outputs: [{ name: '_deployedNumber', type: 'uint256' }],
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
      data: [{ key: 1, name: 'soUINT', type: 'uint256' }],
      events: [],
      fields: [
        { name: '_pubkey', type: 'uint256' },
        { name: '_timestamp', type: 'uint64' },
        { name: '_constructorFlag', type: 'bool' },
        { name: '_codeOrder', type: 'cell' },
        { name: '_codeIndex', type: 'cell' },
        { name: 'soUINT', type: 'uint256' },
        { name: '_deployedNumber', type: 'uint256' },
        { name: '_deployedAddress', type: 'address' },
        { name: '_deployedRouter', type: 'address' },
      ],
    },
    tvc: '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',
    code: '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',
  },
};
