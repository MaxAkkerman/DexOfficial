const internalTransferABI = [
    {
        inputs: [
            {
                internalType: 'address payable',
                name: 'to',
                type: 'address',
            },
        ],
        name: 'internalTransfer',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
];

const daiABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'spender',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
        ],
        name: 'Approval',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'previousOwner',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'newOwner',
                type: 'address',
            },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {indexed: true, internalType: 'address', name: 'from', type: 'address'},
            {indexed: true, internalType: 'address', name: 'to', type: 'address'},
            {
                indexed: false,
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
        ],
        name: 'Transfer',
        type: 'event',
    },
    {
        constant: true,
        inputs: [],
        name: '_decimals',
        outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: '_name',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: '_symbol',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {internalType: 'address', name: 'owner', type: 'address'},
            {internalType: 'address', name: 'spender', type: 'address'},
        ],
        name: 'allowance',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {internalType: 'address', name: 'spender', type: 'address'},
            {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'approve',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [{internalType: 'address', name: 'account', type: 'address'}],
        name: 'balanceOf',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
        name: 'burn',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [{internalType: 'uint8', name: '', type: 'uint8'}],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {internalType: 'address', name: 'spender', type: 'address'},
            {internalType: 'uint256', name: 'subtractedValue', type: 'uint256'},
        ],
        name: 'decreaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'getOwner',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {internalType: 'address', name: 'spender', type: 'address'},
            {internalType: 'uint256', name: 'addedValue', type: 'uint256'},
        ],
        name: 'increaseAllowance',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [{internalType: 'uint256', name: 'amount', type: 'uint256'}],
        name: 'mint',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'owner',
        outputs: [{internalType: 'address', name: '', type: 'address'}],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [{internalType: 'string', name: '', type: 'string'}],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [{internalType: 'uint256', name: '', type: 'uint256'}],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {internalType: 'address', name: 'recipient', type: 'address'},
            {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transfer',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {internalType: 'address', name: 'sender', type: 'address'},
            {internalType: 'address', name: 'recipient', type: 'address'},
            {internalType: 'uint256', name: 'amount', type: 'uint256'},
        ],
        name: 'transferFrom',
        outputs: [{internalType: 'bool', name: '', type: 'bool'}],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [{internalType: 'address', name: 'newOwner', type: 'address'}],
        name: 'transferOwnership',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
];

const daiVaultABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'int8',
                name: 'wid',
                type: 'int8',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'user',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'creditor',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'recipient',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'tokenAmount',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'tonAmount',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint8',
                name: 'swapType',
                type: 'uint8',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'slippageNumerator',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'uint128',
                name: 'slippageDenominator',
                type: 'uint128',
            },
            {
                indexed: false,
                internalType: 'bytes1',
                name: 'separator',
                type: 'bytes1',
            },
            {
                indexed: false,
                internalType: 'bytes',
                name: 'level3',
                type: 'bytes',
            },
        ],
        name: 'FactoryDeposit',
        type: 'event',
    },
    {
        inputs: [],
        name: 'apiVersion',
        outputs: [
            {
                internalType: 'string',
                name: 'api_version',
                type: 'string',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes',
                name: 'payload',
                type: 'bytes',
            },
        ],
        name: 'decodeWithdrawEventData',
        outputs: [
            {
                internalType: 'int8',
                name: 'sender_wid',
                type: 'int8',
            },
            {
                internalType: 'uint256',
                name: 'sender_addr',
                type: 'uint256',
            },
            {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
            },
            {
                internalType: 'uint160',
                name: '_recipient',
                type: 'uint160',
            },
            {
                internalType: 'uint32',
                name: 'chainId',
                type: 'uint32',
            },
        ],
        stateMutability: 'pure',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'int128',
                        name: 'wid',
                        type: 'int128',
                    },
                    {
                        internalType: 'uint256',
                        name: 'addr',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct IVault.TONAddress',
                name: 'recipient',
                type: 'tuple',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'uint128',
                name: 'amount',
                type: 'uint128',
            },
            {
                internalType: 'int8',
                name: 'wid',
                type: 'int8',
            },
            {
                internalType: 'uint256',
                name: 'user',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'creditor',
                type: 'uint256',
            },
            {
                internalType: 'uint256',
                name: 'recipient',
                type: 'uint256',
            },
            {
                internalType: 'uint128',
                name: 'tokenAmount',
                type: 'uint128',
            },
            {
                internalType: 'uint128',
                name: 'tonAmount',
                type: 'uint128',
            },
            {
                internalType: 'uint8',
                name: 'swapType',
                type: 'uint8',
            },
            {
                internalType: 'uint128',
                name: 'slippageNumerator',
                type: 'uint128',
            },
            {
                internalType: 'uint128',
                name: 'slippageDenominator',
                type: 'uint128',
            },
            {
                internalType: 'bytes',
                name: 'level3',
                type: 'bytes',
            },
        ],
        name: 'depositToFactory',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: 'int128',
                        name: 'wid',
                        type: 'int128',
                    },
                    {
                        internalType: 'uint256',
                        name: 'addr',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct IVault.TONAddress',
                name: 'recipient',
                type: 'tuple',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
            {
                components: [
                    {
                        internalType: 'address',
                        name: 'recipient',
                        type: 'address',
                    },
                    {
                        internalType: 'uint256',
                        name: 'id',
                        type: 'uint256',
                    },
                ],
                internalType: 'struct IVault.PendingWithdrawalId[]',
                name: 'pendingWithdrawalsIdsToFill',
                type: 'tuple[]',
            },
        ],
        name: 'depositWithFillings',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'getChainID',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: '_vault',
                type: 'address',
            },
        ],
        name: 'initialize',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'bytes',
                name: 'payload',
                type: 'bytes',
            },
            {
                internalType: 'bytes[]',
                name: 'signatures',
                type: 'bytes[]',
            },
            {
                internalType: 'uint256',
                name: 'bounty',
                type: 'uint256',
            },
        ],
        name: 'saveWithdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'vault',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];

const netwArray = [
    {
        symbol: 'Ethereum',
        chainID: 1,
    },
    {
        symbol: 'BSC',
        chainID: 56,
    },
    {
        symbol: 'Polygon',
        chainID: 137,
    },
    {
        symbol: 'Fantom',
        chainID: 250,
    }
]

const daiData = {
    daiVaultWrapperAddress: '0xdE62EE1014E1ae5f37D27Ee20BcE7Ae0B3FfD0CD',
    daiVaultAddress: '0xe05052a189771888c4a1202ceec3be57c5efe891',
    daiBEP20Address: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
    daiDecimals: 18,
}

export default {
    ...daiData,
    daiVaultABI: daiVaultABI,
    internalTransferABI: internalTransferABI,
    daiABI: daiABI,
    netwArray: netwArray,
}
