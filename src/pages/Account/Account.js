import "./Account.scss";

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import {resetPairs, resetTokens, resetTonContext} from "@/store/actions/ton";

import ExtensionsList from "../../components/ExtensionsList/ExtensionsList";
import Loader from "../../components/Loader/Loader";
import MainBlock from "../../components/MainBlock/MainBlock";
import PasswordEnterPopup from "../../components/PasswordEnterPopup/PasswordEnterPopup";
import WaitingPopup from "../../components/WaitingPopup/WaitingPopup";
import {getClientBalance} from "../../extensions/sdk_get/get";
import {deployClient} from "../../extensions/sdk_run/run";
import {decrypt, decryptPure, encryptPure} from "../../extensions/tonUtils";
import {saveLog} from "../../logging/logging";
import {copyToClipboard, InitializeClient} from "../../reactUtils/reactUtils";
import {
    setCurExt,
    setTips,
    setWalletIsConnected,
} from "../../store/actions/app";
import {
    setNewSide,
    setSeedPassword,
    showEnterSeedPhrase,
    wordOneEnterSeedPhrase,
} from "../../store/actions/enterSeedPhrase";
import {

	setClientData,
	setLiquidityList,
	setPairsList,
	setPin,
	setSubscribeReceiveTokens,
	setTokenList,
	setTransactionsList,
	setWallet,
} from "../../store/actions/wallet";
import PinPopup from "@/components/LoginViaPIN/PinPopup";

function Account() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isCopied, setCopied] = useState(false);
    const clientData = useSelector((state) => state.walletReducer.clientData);
    const transListReceiveTokens = useSelector(
        (state) => state.walletReducer.transListReceiveTokens,
    );
    const [transArr, setTransArr] = useState([]);
    const pin = useSelector((state) => state.walletReducer.pin);

    const [onDeploy, setonDeploy] = useState(false);
    const [passEnterPopup, setPasswordEnterPopup] = useState(false);

    const [clientPrepData, setclientPrepData] = useState({});

    useEffect(() => {
        setTransArr(transListReceiveTokens);
    }, [transListReceiveTokens]);
    useEffect(() => {
        setTransArr(transListReceiveTokens);
    }, []);

    async function onPassEnter() {
        const clientPrepData = JSON.parse(
            localStorage.getItem("clientDataPreDeploy"),
        );
        if (!clientPrepData) {
            dispatch(
                setTips({
                    message: `Something goes wrong, please re-generate client`,
                    type: "error",
                }),
            );
            return;
        }
        const accBalance = await getClientBalance(clientPrepData.address);
        setclientPrepData(clientPrepData);
        console.log("accBalance", accBalance)
        if (accBalance > 0.5) {
            setPasswordEnterPopup(true);
        } else {
            dispatch(
                setTips({
                    message: `Not enough balance, need at least 0.5 EVERs`,
                    type: "error",
                }),
            );
        }
    }

    async function deployHandler() {
        if (!compltePass) {
            dispatch(
                setTips({
                    message: `Wrong PIN, please try again`,
                    type: "error",
                }),
            );
            return
        }
        console.log("seedPhrasePassword", seedPhrasePassword)
        let password = "";
        pin.map((item) => {
            password += item.value.toString();
        });
        const encClData = await decryptPure(
            clientPrepData.secret,
            password,
        );
        console.log("password", password)
        const encrData = JSON.parse(JSON.stringify(clientPrepData));
        encrData.secret = encClData;
        setPasswordEnterPopup(false);
        setonDeploy(true);
        const deployRes = await deployClient(encrData);
        console.log("encrData", encrData);
        if (deployRes.code) {
            setonDeploy(false);
            dispatch(
                setTips({
                    message: `Something goes wrong - error code ${deployRes.code}`,
                    type: "error",
                }),
            );
        } else {
            saveLog(
                {
                    name: "deployNewClient",
                    clientAddress: encrData.address,
                    // deployData: deployRes,
                    created_at: (Date.now() + 10800000) / 1000,
                },
                "deployNewClient",
            );
            await InitializeClient(clientPrepData.public);
            localStorage.removeItem("clientDataPreDeploy");
            setonDeploy(false);
        }
    }

    // function disconnectHandler() {
    // 	dispatch(setWallet({id: "", balance: 0}));
    // 	dispatch(setWalletIsConnected(false));
    // 	// dispatch(setCurExt({}));
    // 	// dispatch(setTokenList([]));
    // 	// dispatch(setLiquidityList([]));
    // 	// dispatch(setPairsList([]))
    // 	console.log("disaconnect");
    // 	dispatch(setSeedPassword(""));
    // 	// dispatch(enterSeedPhraseSaveToLocalStorage(""));
    // 	dispatch(
    // 		setClientData({
    // 			status: false,
    // 			dexclient: "",
    // 			balance: 0,
    // 			public: "",
    // 		}),
    // 	);
    // 	store.dispatch(setTokenList([]));
    // 	store.dispatch(setLiquidityList([]));
    // 	localStorage.removeItem("setSubscribeReceiveTokens");
    // 	dispatch(showEnterSeedPhrase(false));
    //
    // 	// localStorage.removeItem("esp");
    // 	// window.location.reload();
    // 	history.push("/account");
    // }

    function disconnectHandler() {
        // dispatch(setCurExt({}));
        // dispatch(setTokenList([]));
        // dispatch(setLiquidityList([]));
        // dispatch(setPairsList([]))
        // dispatch(enterSeedPhraseSaveToLocalStorage(""));
        console.log("disaconnect");

        localStorage.removeItem("setSubscribeReceiveTokens");
        localStorage.removeItem("esp");
        localStorage.removeItem("clientDataPreDeploy");
        localStorage.removeItem("clientData");

        dispatch(resetTonContext());
        dispatch(resetTokens());
        dispatch(resetPairs());
        dispatch(setTokenList([]));
        dispatch(setLiquidityList([]));
        dispatch(setWallet({id: "", balance: 0}));
        dispatch(setWalletIsConnected(false));
        dispatch(setSeedPassword(""));
        dispatch(
            setClientData({
                status: false,
                dexclient: "",
                balance: 0,
                public: "",
            }),
        );

        saveLog(
            {
                name: "disconnect",
                clientAddress: clientData.address,
                created_at: (Date.now() + 10800000) / 1000,
            },
            "disconnect",
        );
        // localStorage.removeItem("esp");
        // window.location.reload();
        // history.push("/account");
    }

    function copied() {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
    }

    const [validPassword, setValidPassword] = useState(false);
    const [seedPhrasePassword, setSeedPhrasePassword] = useState(``);

    function enterClick(e) {
        if (e.code === "NumpadEnter" || e.code === "Enter") {
            deployHandler();
        }
    }

    const [compltePass, setCompletedPass] = useState(false)

    function handleCheckPin(pinArr, step, completed) {
        const curEmptyPin = pinArr.filter((item) => !item.value.length);
        if (!curEmptyPin.length) {
            setCompletedPass(true);
            let password = "";
            pin.map((item) => {
                password += item.value.toString();
            });
            setSeedPhrasePassword(password);
        } else {
            setCompletedPass(false);
        }
        dispatch(setPin(pinArr));
    }

    function passwordChange(event) {
        let password = event.target.value;
        if (password.length > 0) setValidPassword(true);
        setSeedPhrasePassword(password);
    }

    return (
        <div className="container">
            {passEnterPopup ? (
                <div className="select-wrapper">
                    <PinPopup
                        title={"Enter your PIN"}
                        showTwoBtns={true}
                        nextStep={"step3"}
                        prevStep={"step1"}
                        handleLogOut={null}
                        btnText={"Submit"}
                        pinCorrect={true}
                        handleClickBack={() => setPasswordEnterPopup(false)}
                        handleClose={null}
                        handleClickNext={() => deployHandler()}
                        handleCheckPin={(pin, step, completed) =>
                            handleCheckPin(pin, step, completed)
                        }
                    />
                </div>
                // <div className="select-wrapper">
                // 	<div className="mainblock">
                // 		<PasswordEnterPopup
                // 			goIntoApp={deployHandler}
                // 			enterClick={enterClick}
                // 			passwordChange={passwordChange}
                // 			validPassword={validPassword}
                // 			submitText={"Submit"}
                // 			cancelText={"Cancel"}
                // 			handleBack={() => setPasswordEnterPopup(false)}
                // 		/>
                // 	</div>
                // </div>
            ) : onDeploy ? (
                <WaitingPopup
                    text={`Creating dex client...please wait`}
                    handleClose={() => setonDeploy(false)}
                />
            ) : !clientData.status && !clientData.address ? (
                <ExtensionsList/>
            ) : (
                <MainBlock
                    class="account"
                    smallTitle={true}
                    normalTitle={true}
                    title={
                        <>
                            <svg
                                className="logo"
                                width="39"
                                height="35"
                                viewBox="0 0 39 35"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M37.8278 9.26675L30.435 1.21075C30.3129 1.07679 30.1371 1 29.9564 1H9.04421C8.86354 1 8.68775 1.07679 8.56568 1.21075L1.17283 9.26675C0.957979 9.50037 0.941703 9.85163 1.13377 10.1049L18.9827 33.7419C19.1048 33.9052 19.2969 34 19.5003 34C19.7038 34 19.8958 33.9036 20.0179 33.7419L37.8669 10.1032C38.0573 9.85163 38.0427 9.49874 37.8278 9.26675ZM22.5034 2.307L24.5689 9.05599H14.4334L16.4989 2.307H22.5034ZM24.6144 10.3614L19.5003 30.6802L14.3862 10.3614H24.6144ZM13.0434 10.3614L18.0859 30.3911L2.96163 10.3614H13.0434ZM25.9573 10.3614H36.039L20.9148 30.3911L25.9573 10.3614ZM35.8649 9.05599H25.9312L23.8657 2.307H29.6683L35.8649 9.05599ZM9.33068 2.307H15.1333L13.0678 9.05599H3.13579L9.33068 2.307Z"
                                    fill="white"
                                    stroke="white"
                                />
                            </svg>
                            <span className="account-title">Your Wallet</span>
                        </>
                    }
                    button={
                        <svg
                            onClick={() => history.goBack()}
                            className="close"
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                opacity="0.6"
                                d="M21.7676 25.272L13 16.507L4.23239 25.272C4.00265 25.5027 3.7296 25.6858 3.42891 25.8108C3.12822 25.9357 2.80582 26 2.48021 26C2.15459 26 1.83219 25.9357 1.5315 25.8108C1.23081 25.6858 0.957759 25.5027 0.728021 25.272C0.497277 25.0422 0.314182 24.7692 0.189248 24.4685C0.0643133 24.1678 0 23.8454 0 23.5198C0 23.1942 0.0643133 22.8718 0.189248 22.5711C0.314182 22.2704 0.497277 21.9973 0.728021 21.7676L9.49296 13L0.728021 4.23239C0.497277 4.00265 0.314182 3.7296 0.189248 3.42891C0.0643133 3.12822 0 2.80582 0 2.48021C0 2.15459 0.0643133 1.83219 0.189248 1.5315C0.314182 1.23081 0.497277 0.957759 0.728021 0.728021C0.957759 0.497277 1.23081 0.314182 1.5315 0.189248C1.83219 0.0643133 2.15459 0 2.48021 0C2.80582 0 3.12822 0.0643133 3.42891 0.189248C3.7296 0.314182 4.00265 0.497277 4.23239 0.728021L13 9.49296L21.7676 0.728021C21.9973 0.497277 22.2704 0.314182 22.5711 0.189248C22.8718 0.0643133 23.1942 0 23.5198 0C23.8454 0 24.1678 0.0643133 24.4685 0.189248C24.7692 0.314182 25.0422 0.497277 25.272 0.728021C25.5027 0.957759 25.6858 1.23081 25.8108 1.5315C25.9357 1.83219 26 2.15459 26 2.48021C26 2.80582 25.9357 3.12822 25.8108 3.42891C25.6858 3.7296 25.5027 4.00265 25.272 4.23239L16.507 13L25.272 21.7676C25.5027 21.9973 25.6858 22.2704 25.8108 22.5711C25.9357 22.8718 26 23.1942 26 23.5198C26 23.8454 25.9357 24.1678 25.8108 24.4685C25.6858 24.7692 25.5027 25.0422 25.272 25.272C25.0422 25.5027 24.7692 25.6858 24.4685 25.8108C24.1678 25.9357 23.8454 26 23.5198 26C23.1942 26 22.8718 25.9357 22.5711 25.8108C22.2704 25.6858 21.9973 25.5027 21.7676 25.272Z"
                                fill="white"
                            />
                        </svg>
                    }
                    content={
                        <div className="account-body">
                            <p className="account-wallet-key">
                                {clientData.address.slice(0, 5)}...
                                {clientData.address.slice(-4)}
                            </p>
                            <div className="account-wrapper">
                                <button
                                    className="account-btn"
                                    onClick={async () =>
                                        await copyToClipboard(clientData.address)
                                    }
                                >
                                    <svg
                                        width="19"
                                        height="23"
                                        viewBox="0 0 19 23"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15.7905 9H8.21049C7.35914 9 6.54267 9.3382 5.94068 9.94019C5.33868 10.5422 5.00049 11.3587 5.00049 12.21V19.79C5.00049 20.6413 5.33868 21.4578 5.94068 22.0598C6.54267 22.6618 7.35914 23 8.21049 23H15.7905C16.6418 23 17.4583 22.6618 18.0603 22.0598C18.6623 21.4578 19.0005 20.6413 19.0005 19.79V12.21C19.0005 11.3587 18.6623 10.5422 18.0603 9.94019C17.4583 9.3382 16.6418 9 15.7905 9ZM17.0005 19.79C17.0005 19.9489 16.9692 20.1062 16.9084 20.253C16.8476 20.3998 16.7584 20.5332 16.6461 20.6456C16.5337 20.758 16.4003 20.8471 16.2535 20.9079C16.1067 20.9687 15.9494 21 15.7905 21H8.21049C8.05159 21 7.89425 20.9687 7.74744 20.9079C7.60064 20.8471 7.46725 20.758 7.35489 20.6456C7.24253 20.5332 7.1534 20.3998 7.09259 20.253C7.03179 20.1062 7.00049 19.9489 7.00049 19.79V12.21C7.00049 11.8891 7.12797 11.5813 7.35489 11.3544C7.58181 11.1275 7.88958 11 8.21049 11H15.7905C16.1114 11 16.4192 11.1275 16.6461 11.3544C16.873 11.5813 17.0005 11.8891 17.0005 12.21V19.79Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M3.31039 2H10.6904C11.0378 2 11.371 2.13802 11.6167 2.38369C11.8624 2.62936 12.0004 2.96257 12.0004 3.31V8H14.0004V3.31C14.0004 2.43213 13.6517 1.59022 13.0309 0.969477C12.4102 0.348731 11.5683 0 10.6904 0L3.31039 0C2.43252 0 1.59061 0.348731 0.969866 0.969477C0.34912 1.59022 0.000389299 2.43213 0.000389299 3.31V11.25C-0.00622737 11.6781 0.0715585 12.1034 0.229304 12.5014C0.38705 12.8995 0.621666 13.2626 0.919752 13.5699C1.21784 13.8773 1.57355 14.1229 1.96659 14.2928C2.35962 14.4627 2.78227 14.5535 3.21039 14.56V12.56C3.04488 12.5536 2.88227 12.5146 2.73185 12.4452C2.58143 12.3759 2.44616 12.2775 2.33378 12.1559C2.22139 12.0342 2.1341 11.8916 2.0769 11.7361C2.01969 11.5807 1.99369 11.4155 2.00039 11.25V3.31C2.00039 2.96257 2.13841 2.62936 2.38408 2.38369C2.62975 2.13802 2.96296 2 3.31039 2Z"
                                            fill="white"
                                        />
                                    </svg>
                                    {!isCopied && <span>Copy address</span>}
                                    {isCopied && <span>Address copied</span>}
                                </button>
                                <a
                                    href={`https://ton.live/accounts/accountDetails?id=${clientData.address}`}
                                    target="_blank"
                                    className="account-link"
                                    rel="noreferrer"
                                >
                                    Ton.live
                                </a>
                                {!clientData.status ? (
                                    <button
                                        className="account-btn account-deploy"
                                        onClick={() => onPassEnter()}
                                    >
                                        Deploy
                                    </button>
                                ) : null}
                                <button
                                    className="account-btn account-disconnect"
                                    onClick={() => disconnectHandler()}
                                >
                                    Disconnect
                                </button>
                            </div>


							{!clientData.status ?
                            <div style={{fontSize: "14px", marginTop: "20px"}}>


                                To deploy wallet send at least 10 EVERs to this address and then click "Deploy"
                            </div>
								:null}

                        </div>
                    }
                    footer={
                        // transactionsList.length ? (
                        <div className="mainblock-footer account-footer">
                            <div className="mainblock-footer-wrap">
                                <h4 className="account-footer-title">Recent transactions</h4>
                                <span
                                    className="account-footer-clear"
                                    onClick={() => dispatch(setSubscribeReceiveTokens([]))}
                                >

									Clear all
								</span>
                            </div>
                            <ul className="account-footer-list">
                                {transArr &&
                                transArr.map((i, index) => (
                                    <li className="account-footer-list-item" key={index}>
                                        <span>{i.message}</span>
                                        <svg
                                            width="20"
                                            height="20"
                                            style={{minWidth: "20px", maxWidth: "20px"}}
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M5.73312 0H14.3057C17.4574 0 19.9998 2.54737 19.9998 5.70526V14.2947C19.9998 17.4526 17.4364 20 14.3057 20H5.73312C2.58143 20 0.0390625 17.4316 0.0390625 14.2947V5.70526C0.0390625 2.54737 2.58143 0 5.73312 0Z"
                                                fill="#3569F0"
                                            />
                                            <path
                                                d="M13.1921 6.58954L9.03188 11.3053L6.80469 9.07375C6.42649 8.6948 5.79615 8.6948 5.39693 9.07375C5.01873 9.45269 5.01873 10.0843 5.39693 10.4843L8.38053 13.4737C8.56964 13.6632 8.82177 13.7685 9.07391 13.7685C9.09492 13.7685 9.09492 13.7685 9.11593 13.7685C9.38907 13.7685 9.64121 13.6422 9.83031 13.4316L14.6839 7.8948C15.0411 7.47375 14.9991 6.84217 14.5999 6.48427C14.1796 6.12638 13.5493 6.16848 13.1921 6.58954Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                />
            )}
        </div>
    );
}

export default Account;
