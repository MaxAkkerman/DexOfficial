import './Bridge.scss';

import {Grid} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BigNumber} from 'bignumber.js';

import BlockItem from '../../components/AmountBlock/AmountBlock';
import InputChange from '../../components/AmountBlock/InputChange';
import RightBlockBottom from '../../components/AmountBlock/RightBlockBottom';
import ShowBalance from '../../components/AmountBlock/ShowBalance';
import {NextBtn} from '../../components/LoginViaPIN/NextBtn';
import MainBlock from '../../components/MainBlock/MainBlock';
import bnb from '../../images/bridgeNets/bnb.png';
import {initNotify, initOnboard} from "@/pages/Bridge/services";
import {ethers} from "ethers";
// import BridgeAssets from "@/pages/Bridge/test";
import daiData from "./abis"
import SelectPopup from "@/components-v2/SelectPopup";
import {isEmpty} from 'lodash';
import {iconGenerator} from "@/iconGenerator";
import {getBridgeAssetsForAddress,} from '../../extensions/sdk_get/get';
import {FormHelperText} from "@mui/material";
import {setCurrentTokenForSend, setTokenSetted} from "@/store/actions/walletSeed";
import {setTips} from "@/store/actions/app";
import SendConfirmPopup from "@/components/SendConfirmPopup/SendConfirmPopup";
import {useUnmount} from "react-use";
import {useHistory} from "react-router-dom";
import {handleCutAddress} from "@/reactUtils/reactUtils";
// import {
//     setNotify, setOnboard} from "@/store/actions/bridge";

const assetsBridge = [
    {
        name: 'DAI Stablecoin',
        symbol: 'DAI',
        balance: 4,
        icon: bnb,
    },
    {
        name: 'Bitcoin',
        symbol: 'BTC',
        balance: 4,
        icon: bnb,
    },
    {
        name: 'Ethereum',
        symbol: 'ETH',
        balance: 4,
        icon: bnb,
    },
];
// function Bridge() {
//
//     return (
//         <Grid className="container">
//
//             <Grid className="netContainer">
//                 <Grid className="mainblock addToMain">
//
//
//                     <Grid className="bridge_title_wrapper">
//                         Network bridge
//                     </Grid>
//                 </Grid>
//
//             </Grid>
//
//         </Grid>
//     );
// }
//
// export default Bridge;

let provider;

let objc = {
    1: "eth1",
    56: "bcs56",
    127: "polygon137",
    250: "phantom250"
}

function Bridge() {
    const dispatch = useDispatch();
    const history = useHistory();

    const {
        daiVaultWrapperAddress,
        daiVaultAddress,
        // daiBEP20Address,
        daiDecimals,
        daiVaultABI,
        internalTransferABI,
        daiABI,
        netwArray
    } = daiData
    // console.log("daidai",daiVaultWrapperAddress,daiVaultAddress,daiBEP20Address,daiDecimals,daiVaultABI,internalTransferABI,daiABI)
    let internalTransferContract;
    let daiContract;
    let daiVaultContract;
    const tokenList = useSelector((state) => state.walletReducer.tokenList);

    // const onboard = useSelector((state) => state.bridgeReducer.onboard);
    // const notify = useSelector((state) => state.bridgeReducer.notify);
    // const address = useSelector((state) => state.bridgeReducer.address);
    // const ens = useSelector((state) => state.bridgeReducer.ens);
    // const network = useSelector((state) => state.bridgeReducer.network);
    // const balance = useSelector((state) => state.bridgeReducer.balance);


    const amountToSend = useSelector((state) => state.walletSeedReducer.amountToSend);
    const currentTokenForSend = useSelector((state) => state.walletSeedReducer.currentTokenForSend);
    const walletIsConnected = useSelector((state) => state.appReducer.walletIsConnected);
    const clientData = useSelector((state) => state.walletReducer.clientData);

    const [amountTo, setAmountTo] = useState(null);
    const [amountFrom, setAmountFrom] = useState(null);

    const [toTokenSetted, setToTokenSetted] = useState(false);
    const [onAssetsList, setOnAssetsList] = useState(false);

    const [fromTokenSetted, setFromTokenSetted] = useState(false);
    const [toCurAsset, setToCurAsset] = useState({});
    const [fromCurAsset, setFromCurAsset] = useState({});
    const [type, setType] = useState('from');

    const [onboard, setOnboard] = useState(null);
    const [notify, setNotify] = useState(null);

    const [address, setAddress] = useState(null);
    const [ens, setEns] = useState(null);
    const [network, setNetwork] = useState(56);
    const [balance, setBalance] = useState(null);
    const [wallet, setWallet] = useState({});

    const [chain, setChain] = useState({})
    const [onNetworkChange, setOnNetworkChange] = useState(false)

    const [toAddress, setToAddress] = useState('');
    const [ethAddress, setEthAddress] = useState('');
    const [curToken, setCurToken] = useState({})
    const [amountValidate, setamountValidate] = useState({error: false, helperText: "Insufficient balance"})
    // const [walletState,setWalletState] = useState({})
    const [walletSelected, setWalletSelected] = useState(false)
    const [onConfirmPopup, setOnConfirmPopup] = useState(false)
    const [onApprove, setOnApprove] = useState(false)
    const [onFetchTokens, setonFetchTokens] = useState(false)
    const [tokensArr, setTokensArr] = useState([])

    async function clearState() {
        // notify.close()
        // notify.unsubscribe(await onboard.getState().address)
        // provider = null
        // setWallet({})
        // setChain({})
        // setNetwork(56)
        // setNotify(null)
        // setOnboard(null)
        setFromTokenSetted(false)
        await onboard.walletReset()
        dispatch(setCurrentTokenForSend({}));
        setCurToken({})
        setFromCurAsset({});
        dispatch(setTokenSetted(false));
    }

    useUnmount(async () => {
        await clearState()

    });

    async function handleOnAssetsListOpen(type) {


        if (!wallet.provider) {
            setTokensArr([])
            setOnAssetsList(true)
            setonFetchTokens(true)
        } else {
            // if (tokensArr.length) {
            //     console.log("tokensArr", tokensArr, tokensArr.length)
            //     setOnAssetsList(true);
            //     // setType(type);
            //     if (!isEmpty(curToken) && curToken.balance) {
            //         changeAmountToSend(amountFrom, "from")
            //     }
            //     return
            // }
            setOnAssetsList(true);
            console.log("should fetch")
            setType(type);

            setonFetchTokens(false)

            let res = await getTokens()
            setTokensArr(res)
            setonFetchTokens(true)

            if (!isEmpty(curToken) && curToken.balance) {
                changeAmountToSend(amountFrom, "from")
            }

        }

    }

    function changeAmountToSend(am, type) {
        console.log("curToken", curToken,"amountFrom",amountFrom)
        if (isEmpty(curToken) || (curToken && (curToken.balance === 0))) {
            console.log("I am here amountFrom",amountFrom)
            setamountValidate({...amountValidate, error: true})
            setAmountFrom(am);
            return
        }

        let tokenBalance = curToken.balance / 10 ** curToken.decimals

        if (type === 'from') {
            console.log("amamam", am, "tokenBalance", tokenBalance)
            if (am > tokenBalance) {
                setamountValidate({...amountValidate, error: true})
                setAmountFrom(am);

            } else {
                setamountValidate({...amountValidate, error: false})
                setAmountFrom(am);
            }
        } else {
            setAmountTo(am);
        }
    }


    // useEffect(() => {
    //     // console.log("onboard changed",onboard,onboard.getState())
    //     const previouslySelectedWallet =
    //         window.localStorage.getItem('selectedWallet');
    //
    //     if (previouslySelectedWallet && onboard) {
    //         onboard.walletSelect(previouslySelectedWallet);
    //     }
    // }, [onboard]);

    useEffect(() => {
        console.log("onboard", onboard, "notify", notify, "wallet", wallet)
        const onboard = initOnboard({
            address: setAddress,
            ens: setEns,
            network: setNetwork,
            balance: setBalance,
            wallet: (wallet) => {
                if (wallet.provider) {
                    setWallet(wallet);

                    provider = new ethers.providers.Web3Provider(wallet.provider, 'any');

                    // internalTransferContract = new ethers.Contract(
                    //     '0xb8c12850827ded46b9ded8c1b6373da0c4d60370',
                    //     internalTransferABI,
                    //     provider.getUncheckedSigner(),
                    // );

                    // daiContract = new ethers.Contract(
                    //     daiBEP20Address,
                    //     daiABI,
                    //     provider.getUncheckedSigner(),
                    // );

                    // daiVaultContract = new ethers.Contract(
                    //     daiVaultWrapperAddress,
                    //     daiVaultABI,
                    //     provider.getUncheckedSigner(),
                    // );

                    window.localStorage.setItem('selectedWallet', wallet.name);
                } else {
                    provider = null;
                    setWallet({});
                }
            },
        });
        // if(!onboard){
        console.log("onboard", onboard)
        // dispatch(setOnboard(onboard))
        setOnboard(onboard)
        // }
        // if(!notify){
        console.log("notify", notify)

        // dispatch(setNotify(initNotify()))
        setNotify(initNotify())
        // }
        //
        // setOnboard(onboard);
        //     setNotify(initNotify());


    }, []);


    const readyToTransact = async () => {
        if (!provider) {
            const walletSelected = await onboard.walletSelect();
            if (!walletSelected) return false;
        }

        return await onboard.walletCheck();
    };

    // const sendHash = async () => {
    //     if (!toAddress) {
    //         alert('An Ethereum address to send Eth to is required.');
    //         return;
    //     }
    //
    //     const signer = provider.getUncheckedSigner();
    //
    //     const {hash} = await signer.sendTransaction({
    //         to: toAddress,
    //         value: 1000000000000000,
    //     });
    //
    //     const {emitter} = notify.hash(hash);
    //
    //     emitter.on('txPool', (transaction) => {
    //         return {
    //             // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
    //             // or you could use onclick for when someone clicks on the notification itself
    //             onclick: () =>
    //                 window.open(`https://rinkeby.etherscan.io/tx/${transaction.hash}`),
    //         };
    //     });
    //
    //     emitter.on('txSent', console.log);
    //     emitter.on('txConfirmed', console.log);
    //     emitter.on('txSpeedUp', console.log);
    //     emitter.on('txCancel', console.log);
    //     emitter.on('txFailed', console.log);
    // };

    // const sendInternalTransaction = async () => {
    //     if (!toAddress) {
    //         alert('An Ethereum address to send Eth to is required.');
    //         return;
    //     }
    //
    //     const {hash} = await internalTransferContract.internalTransfer(
    //         toAddress,
    //         {
    //             value: 1000000000000000,
    //         },
    //     );
    //
    //     const {emitter} = notify.hash(hash);
    //
    //     emitter.on('txSent', console.log);
    //     emitter.on('txPool', console.log);
    //     emitter.on('txConfirmed', console.log);
    //     emitter.on('txSpeedUp', console.log);
    //     emitter.on('txCancel', console.log);
    //     emitter.on('txFailed', console.log);
    // };
    useEffect(async () => {

        let tokens = await getTokens()
        setTokensArr(tokens)
    }, [address])

    async function handleCloseAseetsList() {
        // console.log("curToken", curToken, wallet, "onboard", await onboard.getState().balance)
        // console.log("curToken.evmtoken, await onboard.getState().address, curToken.vault", cur
        // console.log("network",network)
        //
        //
        //
        // const approvedAmount = await getApproval(curToken.evmtoken, await onboard.getState().address, curToken.vault)
        // console.log("approvedAmount", approvedAmount, "amountFrom", amountFrom)        // Token.evmtoken, "onboard.getState()",await onboard.getState(), curToken.vault)
        // await getApproval(curToken.evmtoken, await onboard.getState().address, curToken.vault)
    }

    const approveForWrapper = async () => {
        console.log("om a[[rove")
        if (!amountFrom) {
            alert('value to approve is required.');
            return;
        }
        const daiContract = new ethers.Contract(
            curToken.evmtoken,
            daiABI,
            provider.getUncheckedSigner(),
        );
        console.log('approveValue: ', amountFrom, "curToken", curToken);

        let av = new BigNumber(curToken.balance / 10 ** curToken.decimals).shiftedBy(Number(curToken.decimals)).toFixed();
        console.log('approveValue: ', av, "curToken", curToken, "daiContract", daiContract);

        const res = await daiContract.approve(curToken.vault, av, {
            value: 0,
        });
        console.log("hashhash", res)
        const {emitter} = notify.hash(res.hash);
        console.log("emitter", emitter)
        emitter.on('txSent', (data) => {
            console.log("txSent", data)
        })
        emitter.on('txPool', (data) => {
            console.log("txPool", data)
        })
        emitter.on('txConfirmed', (data) => {
            console.log("txConfirmed", data)
        })
        emitter.on('txSpeedUp', (data) => {
            console.log("txSpeedUp", data)
        });
        emitter.on('txCancel', (data) => {
                console.log("txCancel", data)
            }
        );

        emitter.on('txFailed', (data) => {
            console.log("txFailed", data)
        });
    };

    const depositToVault = async () => {
        console.log("on deposit", curToken)
        if (!amountFrom) {
            dispatch(
                setTips({
                    message: `Insufficient balance`,
                    type: 'error',
                }),
            );
            return;
        }
        const daiVaultContract = new ethers.Contract(
            curToken.vaultWrapper,
            daiVaultABI,
            provider.getUncheckedSigner(),
        );
        console.log("amountFrom", amountFrom)
        let av = new BigNumber(amountFrom).shiftedBy(Number(curToken.decimals)).toFixed();
        console.log('approveValue: ', av);

        const connetorAddress = tokenList.filter(it => it.symbol === curToken.symbol)
        console.log("connetorAddress", connetorAddress)
        // if (!toAddress) {
        //   alert('An Ethereum address to send Eth to is required.')
        //   return
        // }
        //
        // const { hash } = await internalTransferContract.internalTransfer(
        //   toAddress,
        //   {
        //     value: av
        //   }
        // )
        console.log("clientData.address.replace(\":\",\"x\")", clientData.address.replace(":", "x"))
        const gasPrice = () => provider.getGasPrice().then((res) => res.toString());

        console.log("connetorAddress[0].owner_address", connetorAddress[0].owner_address.replace(":", "x"), "gasPrice", await gasPrice(), "avavav", av)
        const {hash} = await daiVaultContract.depositToFactory(
            av,
            0,
            // DEXClient Addr for TON from Bridge
            clientData.address.replace(":", "x"),
            '0x48b1daf7ff5c10ec590628e65702dcd01d947b36660a6348e5360f92c8b7bae5',
            // owber of income TIP3 wallet is DEXConnecror Addr from current DEXCLient. For token income from Bridge
            connetorAddress[0].owner_address.replace(":", "x"),
            0,
            0,
            0,
            5,
            100,
            `0x${Buffer.from('te6ccgEBAQEAAgAAAA==', 'base64').toString('hex')}`,
            {
                value: 0,
            },
        );
        //
        const {emitter} = notify.hash(hash);
        // emitter.on('txRequest', data=> console.log("txRequest",data));
        // emitter.on('txAwaitingApproval', data=> console.log("txAwaitingApproval",data));
        // emitter.on('txConfirmReminder', data=> console.log("txConfirmReminder",data));
        // emitter.on("all", transaction => {
        //     console.log("allllll",transaction)
        //     // called on every event that doesn't have a listener defined on this transaction
        // })
        emitter.on('txSent', transaction =>
            dispatch(
                setTips({
                    message: `Transaction link is ready`,
                    link: `https://v2.tonbridge.io/transfer/evm-${network}/ton-1/${transaction.hash}/credit`,
                    type: 'success',
                }),
            ));
        // emitter.on('txPool', data=> console.log("txPool",data));
        // emitter.on('txConfirmed', data=> console.log("txConfirmed",data));
        // emitter.on('txSpeedUp', data=> console.log("txSpeedUp",data));
        // emitter.on('txCancel', data=> console.log("txCancel",data));
        // emitter.on('txFailed', data=> console.log("txFailed",data));
    };

    // const sendTransaction = async () => {
    //     if (!toAddress) {
    //         alert('An Ethereum address to send Eth to is required.');
    //     }
    //
    //     const signer = provider.getUncheckedSigner();
    //
    //     const txDetails = {
    //         to: toAddress,
    //         value: 1000000000000000,
    //     };
    //
    //     const sendTransaction = () => {
    //         return signer.sendTransaction(txDetails).then((tx) => tx.hash);
    //     };
    //
    //     const gasPrice = () => provider.getGasPrice().then((res) => res.toString());
    //
    //     const estimateGas = () => {
    //         return provider.estimateGas(txDetails).then((res) => res.toString());
    //     };
    //
    //     const {emitter} = await notify.transaction({
    //         sendTransaction,
    //         gasPrice,
    //         estimateGas,
    //         balance: onboard.getState().balance,
    //         txDetails,
    //     });
    //
    //     emitter.on('txRequest', console.log);
    //     emitter.on('nsfFail', console.log);
    //     emitter.on('txRepeat', console.log);
    //     emitter.on('txAwaitingApproval', console.log);
    //     emitter.on('txConfirmReminder', console.log);
    //     emitter.on('txSendFail', console.log);
    //     emitter.on('txError', console.log);
    //     emitter.on('txUnderPriced', console.log);
    //     emitter.on('txSent', console.log);
    //     emitter.on('txPool', console.log);
    //     emitter.on('txConfirmed', console.log);
    //     emitter.on('txSpeedUp', console.log);
    //     emitter.on('txCancel', console.log);
    //     emitter.on('txFailed', console.log);
    // };

    // if (!onboard || !notify) return <div>Loading...</div>;


    async function handleShowBridgeAssets() {
        console.log('handleShowBridgeAssets onboard', onboard, "address", address, "ens", ens, "network", network, "balance", balance, "wallet", wallet);
        await onboard.walletReset()

        // if (!provider) {
        const walletSelected = await onboard.walletSelect();
        console.log("walletSelected", walletSelected)
        if (!walletSelected) {
            // dispatch(
            //     setTips({
            //         message: `Please select wallet first`,
            //         type: 'error',
            //     }),
            // );
            return
        }
        ;
        // }

        const ready = await onboard.walletCheck();

        // if(!ready){
        dispatch(setTokenSetted(false));
        dispatch(setCurrentTokenForSend({}));

        // setWalletSelected(false)
        setFromTokenSetted(false)
        setFromCurAsset({});
        setCurToken({})
        if (!ready) {
            setWalletSelected(false)
        }


        // }
        console.log("ready", ready)
        //
        // return ready;


        // onboard.walletSelect();
        // console.log('handleShowBridgeAssets');
        // setOnAssetsList(true);
    }


    async function setAppNetwork(e, t) {
        console.log("chain changes", t)
        let res = await onboard.config({networkId: t.chainID})
        await onboard.walletReset()
        setWalletSelected(false)
        console.log("chain changes set new", res, "onboard")
        // await onboard.walletReset()
        // setNetwork(t.chainId)
        setChain(t)
        setOnNetworkChange(false)
    }

    useEffect(async () => {
        // console.log("walletStatewalletState",wallet,"walletState",walletState,"onboard",onboard)
        if (isEmpty(wallet)) {
            return
        }

        const r = await wallet.provider.isConnected()
        console.log("wallet is here", r)
        if (r) {
            console.log("onboard.getState()", await onboard.getState())
            setWalletSelected(r)
            // let tokens = await getTokens()
            // setTokensArr(tokens)
            // setWalletState(await onboard.getState())
        } else {
            setWalletSelected(false)

            console.log("rtrt", r)
        }


    }, [wallet])

    async function getTokens() {
        let curNet = objc[network]
        let tokens = await getBridgeAssetsForAddress(network, address)
        return tokens[curNet]
    }

    function handleSetToken(e, t) {
        dispatch(setCurrentTokenForSend(t));
        setCurToken(t)
        console.log("ttt", t)
        setFromCurAsset(t);
        dispatch(setTokenSetted(true));
        console.log("onAssetsList e,t", e, t)
    }

    async function handleOnConfirm() {
        console.log("amountToSend",amountToSend, "currentTokenForSend.balance",currentTokenForSend.balance)
        if (amountToSend > currentTokenForSend.balance) {
            dispatch(
                setTips({
                    message: `Insufficient balance`,
                    type: 'error',
                }),
            );
            return
        }

        const approvedAmount = await getApproval(curToken.evmtoken, await onboard.getState().address, curToken.vault)
        console.log("approvedAmount", approvedAmount, "amountFrom", amountFrom)

        let amFrom = +amountFrom * 10 ** +curToken.decimals;

        console.log("amFrom", amFrom)
        if (approvedAmount > amFrom) {
            setOnApprove(false)
        } else {
            setOnApprove(true)

        }
        setOnConfirmPopup(true)


    }

    async function getApproval(rootAddress, owner, spender) {
        if (!rootAddress || !owner || !spender) {
            dispatch(
                setTips({
                    message: `Can not get approved value for your token, please try again`,
                    type: 'error',
                }),
            );
            return
        }
        const {daiABI} = daiData

        const rootContract = new ethers.Contract(
            rootAddress,
            daiABI,
            provider.getUncheckedSigner(),
        );
        const res = await rootContract.allowance(owner, spender, {
            value: 0,
        });
        console.log("reeeee", Number(res))
        return Number(res)

    }

    const minBalances = {
        USDT: 3,
        DAI: 5,
        USDC: 5,
        WBTC: 0.000010,
        WETH: 0.00012,

    }

    async function handleSendAssetToBridge() {
        if (network !== onboard.getState().appNetworkId) {
            dispatch(
                setTips({
                    message: `Networks do not match, please select ${network} chain in app, or change your extension network to ${onboard.getState().appNetworkId}`,
                    type: 'error',
                }),
            );
            return
        }
        if (amountValidate.error) {
            dispatch(
                setTips({
                    message: `Insufficient balance`,
                    type: 'error',
                }),
            );
            return
        } else if (isEmpty(curToken)) {
            dispatch(
                setTips({
                    message: `Please select token`,
                    type: 'error',
                }),
            );
            return
        }


        if (onApprove) {
            approveForWrapper()
            setOnConfirmPopup(false)

        } else {
            let shiftedBalance = curToken.balance / 10 ** curToken.decimals;
            let minBalanceForCur = minBalances[curToken.symbol]

            if (minBalanceForCur > shiftedBalance) {
                dispatch(
                    setTips({
                        message: `Min balance for transfer ${minBalanceForCur} ${curToken.symbol}`,
                        type: 'error',
                    }),
                );
                return
            }

            depositToVault()
        }
        setOnConfirmPopup(false)


    }

    function handlePushToLogin() {
        history.push('/account');
    }

    return (
        <>
            {onConfirmPopup ?
                <SendConfirmPopup
                    // showConfirmPopup={()=>handleSetSendPopupVisibility(false)}
                    msgText={onApprove ? "First you need to approve to vault your token, just click Submit and follow the instructions in your wallet." : "Transfer to you Everscale wallet will take about 5-8 minuts, after you submit, you can track your transaction from account page"}
                    title={onApprove ? "Approve to vault" : "Send tokens"}
                    hideConfirmPopup={() => setOnConfirmPopup(false)}
                    addressToSend={onApprove ? curToken.vault : handleCutAddress(clientData.address)}
                    currentAsset={curToken}
                    amountToSend={amountFrom}
                    handleSend={() => handleSendAssetToBridge()}
                />
                : null
            }
            {onAssetsList ?
                <SelectPopup
                    loading={!onFetchTokens}
                    onClose={() => setOnAssetsList(false)}
                    onSelect={(e, t) => handleSetToken(e, t)}
                    tokens={tokensArr}
                    title={"Select a token"}
                />
                :
                null
            }

            {onNetworkChange ?
                <SelectPopup
                    loading={false}
                    onClose={() => setOnNetworkChange(false)}
                    onSelect={(e, t) => setAppNetwork(e, t)}
                    tokens={netwArray}
                    title={"Select a chain"}
                />
                :
                null
            }
            <div className="container">
                <MainBlock
                    smallTitle={false}
                    // title={'Assets'}
                    content={
                        <div>
                            <div className="head_wrapper">
                                <div className="left_block boldFont"
                                     onClick={() => handleCloseAseetsList()}>Bridge
                                </div>
                            </div>

                            <Grid className="bridge_netSelector_wrapper">
                                {/*<Grid onClick={() => console.log("chain ", isEmpty(chain))}>Binance > Ethereum</Grid>*/}

                                {!isEmpty(chain) ?

                                    <div className="select-item-wrapper"
                                         style={{
                                             display: "flex",
                                             width: "173px",
                                             justifyContent: "start",
                                             cursor: "pointer"
                                         }}
                                    >
                                        <img
                                            className="item_icon_bridge"
                                            src={iconGenerator(chain.symbol)}
                                            alt={chain.symbol}
                                        />


                                        <button
                                            onClick={() => setOnNetworkChange(true)}
                                            className="btn input-btn"
                                            style={{
                                                fontSize: '16px',
                                                color: "var(--mainblock-title-color)",
                                                backgroundColor: "transparent",
                                                padding: "5px",
                                            }}
                                        >
                                            {chain.symbol}

                                        </button>
                                    </div>
                                    :

                                    <button
                                        onClick={() => setOnNetworkChange(true)}
                                        className="btn input-btn"
                                        style={{fontSize: '12px', borderRadius: '13px'}}
                                    >
                                        Select Chain
                                        <svg
                                            width="12"
                                            height="8"
                                            viewBox="0 0 16 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M3.06066 0.93934C2.47487 0.353553 1.52513 0.353553 0.93934 0.93934C0.353553 1.52513 0.353553 2.47487 0.93934 3.06066L3.06066 0.93934ZM8 8L6.93934 9.06066C7.52513 9.64645 8.47487 9.64645 9.06066 9.06066L8 8ZM15.0607 3.06066C15.6464 2.47487 15.6464 1.52513 15.0607 0.93934C14.4749 0.353553 13.5251 0.353553 12.9393 0.93934L15.0607 3.06066ZM0.93934 3.06066L6.93934 9.06066L9.06066 6.93934L3.06066 0.93934L0.93934 3.06066ZM9.06066 9.06066L15.0607 3.06066L12.9393 0.93934L6.93934 6.93934L9.06066 9.06066Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </button>
                                }
                                <div className="select-item-wrapper"
                                     style={{
                                         display: "flex",
                                         // width: "173px",
                                         justifyContent: "start",
                                         cursor: "pointer"
                                     }}
                                >
                                    {walletSelected ?
                                        <button
                                            onClick={handleShowBridgeAssets}
                                            className="btn input-btn"
                                            style={{
                                                fontSize: '16px',
                                                color: "var(--mainblock-title-color)",
                                                backgroundColor: "transparent",
                                                padding: "5px",
                                                display: "flex",

                                            }}
                                        >
                                            {address && address}

                                        </button>
                                        :
                                        <button
                                            onClick={handleShowBridgeAssets}
                                            disabled={!isEmpty(chain) ? "" : "disabled"}
                                            // className="btn input-btn"
                                            className={
                                                !isEmpty(chain)
                                                    ? 'btn input-btn'
                                                    : 'btn input-btn btn--disabled'
                                            }
                                            style={{fontSize: '12px', borderRadius: '13px'}}
                                        >
                                            Select wallet
                                            <svg
                                                width="12"
                                                height="8"
                                                viewBox="0 0 16 10"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M3.06066 0.93934C2.47487 0.353553 1.52513 0.353553 0.93934 0.93934C0.353553 1.52513 0.353553 2.47487 0.93934 3.06066L3.06066 0.93934ZM8 8L6.93934 9.06066C7.52513 9.64645 8.47487 9.64645 9.06066 9.06066L8 8ZM15.0607 3.06066C15.6464 2.47487 15.6464 1.52513 15.0607 0.93934C14.4749 0.353553 13.5251 0.353553 12.9393 0.93934L15.0607 3.06066ZM0.93934 3.06066L6.93934 9.06066L9.06066 6.93934L3.06066 0.93934L0.93934 3.06066ZM9.06066 9.06066L15.0607 3.06066L12.9393 0.93934L6.93934 6.93934L9.06066 9.06066Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </button>
                                    }

                                </div>
                            </Grid>

                            <BlockItem
                                leftTitle={'You send'}
                                // currentToken={currentToken}
                                rightTopBlock={
                                    <>
                                        <ShowBalance
                                            classWrapper={'send_balance center'}
                                            balance={curToken.balance ? (curToken.balance / 10 ** curToken.decimals) : 0}
                                            label={true}
                                            showBal={true}
                                        />
                                        {/*<AddressPopup*/}
                                        {/*	netIcon={toCurAsset.icon}*/}
                                        {/*	classWrapper={""}*/}
                                        {/*	address={*/}
                                        {/*		"0:575ae3f0babf72903f51af69a4d4f0d010f232b405a687d1ef81cd731869cb07"*/}
                                        {/*	}*/}
                                        {/*/>*/}
                                    </>
                                }
                                rightBottomBlock={
                                    <RightBlockBottom
                                        tokenSetted={fromTokenSetted}
                                        curAsset={fromCurAsset}
                                        showAssetsList={() => handleOnAssetsListOpen('from')}
                                        enableMax={null}
                                    />
                                }
                                leftBlockBottom={
                                    <InputChange
                                        changeAmout={(am) => changeAmountToSend(am, 'from')}
                                        amount={amountFrom}
                                    />
                                }

                            />
                            {amountValidate.error ? (
                                    <FormHelperText
                                        error={amountValidate.error}
                                        style={{
                                            marginLeft: "20px"
                                        }} select-item-wrapper
                                    >
                                        {amountValidate.helperText}
                                    </FormHelperText>
                                )
                                :
                                <div style={{height: "19.91px", marginTop: "3px"}}/>
                            }

                            <NextBtn
                                curBtnStyles={`curBtnStyles ${amountValidate.error ? "disabled" : null}`}
                                btnsClass={"enterSPRegBox"}
                                btnText={walletIsConnected ? 'Submit' : (!clientData.status && clientData.address.length === 66)
                                    ? 'Deploy wallet'
                                    : 'Connect wallet'}
                                errColor={null}
                                handleClickNext={walletIsConnected ? (amountValidate.error ? null : () => handleOnConfirm()) : handlePushToLogin()}
                            />
                        </div>
                    }
                />
            </div>

        </>
    );
}

export default Bridge;
