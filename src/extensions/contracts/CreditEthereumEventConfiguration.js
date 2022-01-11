module.exports = {
  CreditEthereumEventConfigurationContract: {
      abi: {
          "ABI version": 2,
          "version": "2.1",
          "header": [
              "time",
              "expire"
          ],
          "functions": [
              {
                  "name": "constructor",
                  "inputs": [
                      {
                          "name": "_owner",
                          "type": "address"
                      },
                      {
                          "name": "_meta",
                          "type": "cell"
                      }
                  ],
                  "outputs": []
              },
              {
                  "name": "setMeta",
                  "inputs": [
                      {
                          "name": "_meta",
                          "type": "cell"
                      }
                  ],
                  "outputs": []
              },
              {
                  "name": "setCreditProcessorCode",
                  "inputs": [
                      {
                          "name": "value",
                          "type": "cell"
                      }
                  ],
                  "outputs": []
              },
              {
                  "name": "getCreditProcessorCode",
                  "inputs": [
                      {
                          "name": "answerId",
                          "type": "uint32"
                      }
                  ],
                  "outputs": [
                      {
                          "name": "value0",
                          "type": "cell"
                      }
                  ]
              },
              {
                  "name": "setEndBlockNumber",
                  "inputs": [
                      {
                          "name": "endBlockNumber",
                          "type": "uint32"
                      }
                  ],
                  "outputs": []
              },
              {
                  "name": "deployEvent",
                  "inputs": [
                      {
                          "components": [
                              {
                                  "name": "eventTransaction",
                                  "type": "uint256"
                              },
                              {
                                  "name": "eventIndex",
                                  "type": "uint32"
                              },
                              {
                                  "name": "eventData",
                                  "type": "cell"
                              },
                              {
                                  "name": "eventBlockNumber",
                                  "type": "uint32"
                              },
                              {
                                  "name": "eventBlock",
                                  "type": "uint256"
                              }
                          ],
                          "name": "eventVoteData",
                          "type": "tuple"
                      }
                  ],
                  "outputs": []
              },
              {
                  "name": "deriveEventAddress",
                  "inputs": [
                      {
                          "name": "answerId",
                          "type": "uint32"
                      },
                      {
                          "components": [
                              {
                                  "name": "eventTransaction",
                                  "type": "uint256"
                              },
                              {
                                  "name": "eventIndex",
                                  "type": "uint32"
                              },
                              {
                                  "name": "eventData",
                                  "type": "cell"
                              },
                              {
                                  "name": "eventBlockNumber",
                                  "type": "uint32"
                              },
                              {
                                  "name": "eventBlock",
                                  "type": "uint256"
                              }
                          ],
                          "name": "eventVoteData",
                          "type": "tuple"
                      }
                  ],
                  "outputs": [
                      {
                          "name": "eventContract",
                          "type": "address"
                      }
                  ]
              },
              {
                  "name": "getDetails",
                  "inputs": [
                      {
                          "name": "answerId",
                          "type": "uint32"
                      }
                  ],
                  "outputs": [
                      {
                          "components": [
                              {
                                  "name": "eventABI",
                                  "type": "bytes"
                              },
                              {
                                  "name": "staking",
                                  "type": "address"
                              },
                              {
                                  "name": "eventInitialBalance",
                                  "type": "uint64"
                              },
                              {
                                  "name": "eventCode",
                                  "type": "cell"
                              }
                          ],
                          "name": "_basicConfiguration",
                          "type": "tuple"
                      },
                      {
                          "components": [
                              {
                                  "name": "chainId",
                                  "type": "uint32"
                              },
                              {
                                  "name": "eventEmitter",
                                  "type": "uint160"
                              },
                              {
                                  "name": "eventBlocksToConfirm",
                                  "type": "uint16"
                              },
                              {
                                  "name": "proxy",
                                  "type": "address"
                              },
                              {
                                  "name": "startBlockNumber",
                                  "type": "uint32"
                              },
                              {
                                  "name": "endBlockNumber",
                                  "type": "uint32"
                              }
                          ],
                          "name": "_networkConfiguration",
                          "type": "tuple"
                      },
                      {
                          "name": "_meta",
                          "type": "cell"
                      }
                  ]
              },
              {
                  "name": "getType",
                  "inputs": [
                      {
                          "name": "answerId",
                          "type": "uint32"
                      }
                  ],
                  "outputs": [
                      {
                          "name": "_type",
                          "type": "uint8"
                      }
                  ]
              },
              {
                  "name": "broxusBridgeCallback",
                  "inputs": [
                      {
                          "components": [
                              {
                                  "components": [
                                      {
                                          "name": "eventTransaction",
                                          "type": "uint256"
                                      },
                                      {
                                          "name": "eventIndex",
                                          "type": "uint32"
                                      },
                                      {
                                          "name": "eventData",
                                          "type": "cell"
                                      },
                                      {
                                          "name": "eventBlockNumber",
                                          "type": "uint32"
                                      },
                                      {
                                          "name": "eventBlock",
                                          "type": "uint256"
                                      }
                                  ],
                                  "name": "voteData",
                                  "type": "tuple"
                              },
                              {
                                  "name": "configuration",
                                  "type": "address"
                              },
                              {
                                  "name": "staking",
                                  "type": "address"
                              },
                              {
                                  "name": "chainId",
                                  "type": "uint32"
                              }
                          ],
                          "name": "eventInitData",
                          "type": "tuple"
                      },
                      {
                          "name": "gasBackAddress",
                          "type": "address"
                      }
                  ],
                  "outputs": []
              },
              {
                  "name": "transferOwnership",
                  "inputs": [
                      {
                          "name": "newOwner",
                          "type": "address"
                      }
                  ],
                  "outputs": []
              },
              {
                  "name": "renounceOwnership",
                  "inputs": [],
                  "outputs": []
              },
              {
                  "name": "owner",
                  "inputs": [],
                  "outputs": [
                      {
                          "name": "owner",
                          "type": "address"
                      }
                  ]
              },
              {
                  "name": "basicConfiguration",
                  "inputs": [],
                  "outputs": [
                      {
                          "components": [
                              {
                                  "name": "eventABI",
                                  "type": "bytes"
                              },
                              {
                                  "name": "staking",
                                  "type": "address"
                              },
                              {
                                  "name": "eventInitialBalance",
                                  "type": "uint64"
                              },
                              {
                                  "name": "eventCode",
                                  "type": "cell"
                              }
                          ],
                          "name": "basicConfiguration",
                          "type": "tuple"
                      }
                  ]
              },
              {
                  "name": "networkConfiguration",
                  "inputs": [],
                  "outputs": [
                      {
                          "components": [
                              {
                                  "name": "chainId",
                                  "type": "uint32"
                              },
                              {
                                  "name": "eventEmitter",
                                  "type": "uint160"
                              },
                              {
                                  "name": "eventBlocksToConfirm",
                                  "type": "uint16"
                              },
                              {
                                  "name": "proxy",
                                  "type": "address"
                              },
                              {
                                  "name": "startBlockNumber",
                                  "type": "uint32"
                              },
                              {
                                  "name": "endBlockNumber",
                                  "type": "uint32"
                              }
                          ],
                          "name": "networkConfiguration",
                          "type": "tuple"
                      }
                  ]
              },
              {
                  "name": "meta",
                  "inputs": [],
                  "outputs": [
                      {
                          "name": "meta",
                          "type": "cell"
                      }
                  ]
              }
          ],
          "data": [
              {
                  "components": [
                      {
                          "name": "eventABI",
                          "type": "bytes"
                      },
                      {
                          "name": "staking",
                          "type": "address"
                      },
                      {
                          "name": "eventInitialBalance",
                          "type": "uint64"
                      },
                      {
                          "name": "eventCode",
                          "type": "cell"
                      }
                  ],
                  "key": 1,
                  "name": "basicConfiguration",
                  "type": "tuple"
              },
              {
                  "components": [
                      {
                          "name": "chainId",
                          "type": "uint32"
                      },
                      {
                          "name": "eventEmitter",
                          "type": "uint160"
                      },
                      {
                          "name": "eventBlocksToConfirm",
                          "type": "uint16"
                      },
                      {
                          "name": "proxy",
                          "type": "address"
                      },
                      {
                          "name": "startBlockNumber",
                          "type": "uint32"
                      },
                      {
                          "name": "endBlockNumber",
                          "type": "uint32"
                      }
                  ],
                  "key": 2,
                  "name": "networkConfiguration",
                  "type": "tuple"
              }
          ],
          "events": [
              {
                  "name": "OwnershipTransferred",
                  "inputs": [
                      {
                          "name": "previousOwner",
                          "type": "address"
                      },
                      {
                          "name": "newOwner",
                          "type": "address"
                      }
                  ],
                  "outputs": []
              },
              {
                  "name": "NewEventContract",
                  "inputs": [
                      {
                          "name": "eventContract",
                          "type": "address"
                      }
                  ],
                  "outputs": []
              }
          ],
          "fields": [
              {
                  "name": "_pubkey",
                  "type": "uint256"
              },
              {
                  "name": "_timestamp",
                  "type": "uint64"
              },
              {
                  "name": "_constructorFlag",
                  "type": "bool"
              },
              {
                  "name": "owner",
                  "type": "address"
              },
              {
                  "components": [
                      {
                          "name": "eventABI",
                          "type": "bytes"
                      },
                      {
                          "name": "staking",
                          "type": "address"
                      },
                      {
                          "name": "eventInitialBalance",
                          "type": "uint64"
                      },
                      {
                          "name": "eventCode",
                          "type": "cell"
                      }
                  ],
                  "name": "basicConfiguration",
                  "type": "tuple"
              },
              {
                  "components": [
                      {
                          "name": "chainId",
                          "type": "uint32"
                      },
                      {
                          "name": "eventEmitter",
                          "type": "uint160"
                      },
                      {
                          "name": "eventBlocksToConfirm",
                          "type": "uint16"
                      },
                      {
                          "name": "proxy",
                          "type": "address"
                      },
                      {
                          "name": "startBlockNumber",
                          "type": "uint32"
                      },
                      {
                          "name": "endBlockNumber",
                          "type": "uint32"
                      }
                  ],
                  "name": "networkConfiguration",
                  "type": "tuple"
              },
              {
                  "name": "meta",
                  "type": "cell"
              },
              {
                  "name": "creditProcessorCode",
                  "type": "cell"
              }
          ]
      },
      tvc: "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",
      code: "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",
      codeHash: "47fafd55710f81b656d718dc9e7554d87f5f4abb35767b1f028af8aa96b13c25",
  },  
};
