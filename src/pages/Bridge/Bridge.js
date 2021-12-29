import './Bridge.scss';

import {Grid} from '@material-ui/core';
import cls from 'classnames';
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {BigNumber} from 'bignumber.js';
import avatarPlaceholder from './avatar-placeholder.png';
import BridgeAssets from '@/pages/Bridge/test';

import BlockItem from '../../components/AmountBlock/AmountBlock';
import InputChange from '../../components/AmountBlock/InputChange';
import MaxBtn from '../../components/AmountBlock/MAXbtn';
import RightBlockBottom from '../../components/AmountBlock/RightBlockBottom';
import ShowBalance from '../../components/AmountBlock/ShowBalance';
import AssetsList from '../../components/AssetsList/AssetsList';
import {NextBtn} from '../../components/LoginViaPIN/NextBtn';
import MainBlock from '../../components/MainBlock/MainBlock';
import {NOT_ENOUGH_CAUSE_COMMISSION} from '../../constants/validationMessages';
import bnb from '../../images/bridgeNets/bnb.png';
import arrowDown from '../../images/icons/arrowBotThin.svg';
import sendAssetsimg from '../../images/sendAssets.svg';
import AddressPopup from './AddressPopup';
import AssetsListBridge from './AssetsListBridge';
import BridgeNetworksList from './BridgeNetworksList';
import {initNotify, initOnboard} from "@/pages/Bridge/services";
import {ethers} from "ethers";
// import BridgeAssets from "@/pages/Bridge/test";
import daiData from "./abis"
import networkEnum from "./networkEnum"
import SelectPopup from "@/components-v2/SelectPopup";
import {isEmpty} from 'lodash';
import {iconGenerator} from "@/iconGenerator";

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


function Bridge() {
    const {
        daiVaultWrapperAddress,
        daiVaultAddress,
        daiBEP20Address,
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

    const walletIsConnected = useSelector(
        (state) => state.appReducer.walletIsConnected,
    );
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
    const [approveValue, setApproveValue] = useState('');

    function handleOnAssetsListOpen(type) {
        setType(type);
        setOnAssetsList(true);
    }

    function changeAmountToSend(am, type) {
        if (type === 'from') {
            setAmountFrom(am);
        } else {
            setAmountTo(am);
        }
    }



    // useEffect(() => {
        // console.log("onboard changed",onboard,onboard.getState())
        // const previouslySelectedWallet =
        //     window.localStorage.getItem('selectedWallet');
        //
        // if (previouslySelectedWallet && onboard) {
        //     onboard.walletSelect(previouslySelectedWallet);
        // }
    // }, [onboard]);

    useEffect(() => {
        console.log("initOnboard changes",setNetwork)
        const onboard = initOnboard({
            address: setAddress,
            ens: setEns,
            network: setNetwork,
            balance: setBalance,
            wallet: (wallet) => {
                if (wallet.provider) {
                    setWallet(wallet);

                    provider = new ethers.providers.Web3Provider(wallet.provider, 'any');

                    internalTransferContract = new ethers.Contract(
                        '0xb8c12850827ded46b9ded8c1b6373da0c4d60370',
                        internalTransferABI,
                        provider.getUncheckedSigner(),
                    );

                    daiContract = new ethers.Contract(
                        daiBEP20Address,
                        daiABI,
                        provider.getUncheckedSigner(),
                    );

                    daiVaultContract = new ethers.Contract(
                        daiVaultWrapperAddress,
                        daiVaultABI,
                        provider.getUncheckedSigner(),
                    );

                    window.localStorage.setItem('selectedWallet', wallet.name);
                } else {
                    provider = null;
                    setWallet({});
                }
            },
        });

        setOnboard(onboard);

        // setNotify(initNotify());
    }, []);

    // const readyToTransact = async () => {
    //     if (!provider) {
    //         const walletSelected = await onboard.walletSelect();
    //         if (!walletSelected) return false;
    //     }
    //
    //     const ready = await onboard.walletCheck();
    //     return ready;
    // };

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

    // const approveForWrapper = async () => {
    //     if (!approveValue) {
    //         alert('value to approve is required.');
    //         return;
    //     }
    //
    //     let av = new BigNumber(approveValue).shiftedBy(daiDecimals).toFixed();
    //     console.log('approveValue: ', av);
    //
    //     const {hash} = await daiContract.approve(daiVaultAddress, av, {
    //         value: 0,
    //     });
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

    // const depositToVault = async () => {
    //     if (!approveValue) {
    //         alert('value to approve is required.');
    //         return;
    //     }
    //
    //     let av = new BigNumber(approveValue).shiftedBy(daiDecimals).toFixed();
    //     console.log('approveValue: ', av);
    //
    //     // if (!toAddress) {
    //     //   alert('An Ethereum address to send Eth to is required.')
    //     //   return
    //     // }
    //     //
    //     // const { hash } = await internalTransferContract.internalTransfer(
    //     //   toAddress,
    //     //   {
    //     //     value: av
    //     //   }
    //     // )
    //
    //     const {hash} = await daiVaultContract.depositToFactory(
    //         av,
    //         0,
    //         // DEXClient Addr for TON from Bridge
    //         '0xe6cd868e34a0558171483682b2dcbb19f0cc1ba8c13aef97c8c2c862b93d2094',
    //         '0x48b1daf7ff5c10ec590628e65702dcd01d947b36660a6348e5360f92c8b7bae5',
    //         // owber of income TIP3 wallet is DEXConnecror Addr from current DEXCLient. For token income from Bridge
    //         '0xe874c56af67b0c362ff8ac90912bae3bb137f693f84b3fa99056f081279c6246',
    //         0,
    //         0,
    //         0,
    //         5,
    //         100,
    //         '0x0000',
    //         {
    //             value: 0,
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
    function handleShowBridgeAssets() {
        console.log('handleShowBridgeAssets', address, "ens", ens, "network", network, "balance", balance, "wallet", wallet);

        onboard.walletSelect();
        // console.log('handleShowBridgeAssets');
        // setOnAssetsList(true);
    }

    function handleShowBridgeAssetsTest() {
        console.log('handleShowBridgeAssets', address, "ens", ens, "network", network, "balance", balance, "wallet", wallet);
        setOnAssetsList(true);
    }
    useEffect(async ()=>{
        if(!isEmpty(wallet)){
            const re = await onboard.walletCheck()
            console.log("rerere",re)
        }

    },[wallet])

    function handleSetBridgeAsset(e) {
        if (type === 'from') {
            setFromTokenSetted(true);
            setFromCurAsset(e);
        } else {
            setToTokenSetted(true);
            setToCurAsset(e);
        }
        setOnAssetsList(false);
    }

    function handleCloseAseetsList() {
        console.log("netw",network)
        console.log("wallet",  wallet, "onboard.getState()",onboard.getState(),"onboard",onboard, "accountSelect",onboard.accountSelect().then(it=>console.log("ioioioi",it)) )
//         let changeNet = onboard.config({ networkId: 1 })
// setOnboard(changeNet)

    }


    async function handleSetNetwork(e, t) {
        console.log("chain changes",t)
        // await onboard.config({ networkId: 1 })
        // await onboard.walletReset()
        // setNetwork(t.chainId)
        setChain(t)
        setOnNetworkChange(false)
    }

    return (
        <>
            {/*{onAssetsList ? (*/}
            {/*    <BridgeAssets />*/}
            {/*) : (*/}

            {onNetworkChange ?
                <SelectPopup
                    loading={false}
                    onClose={() => setOnNetworkChange(false)}
                    onSelect={(e, t) => handleSetNetwork(e, t)}
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
                                             cursor:"pointer"
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
                                                padding: "5px"
                                            }}
                                        >
                                            {chain.symbol}
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
                                         width: "173px",
                                         justifyContent: "start",
                                         cursor:"pointer"
                                     }}
                                >
                                <button
                                    onClick={() => handleShowBridgeAssets()}
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
                                </div>
                            </Grid>

                            <BlockItem
                                leftTitle={'You send'}
                                // currentToken={currentToken}
                                rightTopBlock={
                                    <>
                                        <ShowBalance
                                            classWrapper={'send_balance center'}
                                            balance={5}
                                            label={true}
                                            showBal={false}
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


                            <NextBtn
                                curBtnStyles={'curBtnStyles'}
                                btnsClass={'enterSPRegBox'}
                                btnText={'Next'}
                                errColor={null}
                                handleClickNext={null}
                            />
                        </div>
                    }
                />
            </div>

        </>
    );
}

export default Bridge;
