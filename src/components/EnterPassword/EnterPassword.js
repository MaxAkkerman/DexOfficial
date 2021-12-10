import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import MainBlock from "../MainBlock/MainBlock";
import "./EnterPassword.scss";
import client, {
    getClientBalance,
    getClientKeys,
} from "../../extensions/sdk_get/get";
import {decrypt} from "../../extensions/tonUtils";
import {
    hideEnterSeedPhraseUnlock,
    setSeedPassword,
} from "../../store/actions/enterSeedPhrase";
import {Alert, AlertTitle, Box, TextField} from "@material-ui/core";
import {
    setClientData, setPin,
    setSubscribeReceiveTokens,
    setTransactionsList,
} from "../../store/actions/wallet";
import {setTips} from "../../store/actions/app";
import {InitializeClient} from "../../reactUtils/reactUtils";
import WaitingPopup from "../WaitingPopup/WaitingPopup";
import styled from "@emotion/styled";
import {saveLog} from "../../logging/logging";
import PinPopup from "../LoginViaPIN/PinPopup";

function EnterPassword(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [seedPhrasePassword, setSeedPhrasePassword] = useState(``);
    const [validPassword, setValidPassword] = useState(false);

    const [decryptResult, setDecryptResult] = React.useState(null);
    const [loadingUserDataIsWaiting, setloadingUserDataIsWaiting] =
        useState(false);

    function enterClick(e) {
        if (e.code === "NumpadEnter" || e.code === "Enter") {
            handleLogIn();
        }
    }

    async function handleLogIn(pin, step) {
        console.log("pin,step", pin, step)
        if (!pin) return;
        const curEmptyPin = pin.filter((item) => !item.value.length);
        if (!curEmptyPin.length) {

            let seedPhrasePassword = "";
            pin.map(item => {
                seedPhrasePassword += item.value.toString()
            })
            let esp = localStorage.getItem("esp");
            let clientDataLS = JSON.parse(localStorage.getItem("clientData"));
            let clientDataPreDeploy = JSON.parse(localStorage.getItem("clientDataPreDeploy"));

            let decrypted = await decrypt(esp, seedPhrasePassword);
            const clientKeys = await getClientKeys(decrypted.phrase);

            if (decrypted.valid === false) {
                setDecryptResult(false);
                dispatch(
                    setTips({
                        message: `Something goes wrong - invalid password`,
                        type: "error",
                    }),
                );
            }
            if (decrypted.valid === true) {

                setloadingUserDataIsWaiting(true);
                setDecryptResult(true);
                if (!clientDataLS.status && clientDataPreDeploy && clientDataPreDeploy.address) {
                    saveLog({
                        name: "login",
                        clientAddress: clientDataPreDeploy.address,
                        deployed: false,
                        created_at: (Date.now() + 10800000) / 1000,
                    }, "login")
                    const dexClientAddress = clientDataPreDeploy.address;
                    const dexClientBalance = await getClientBalance(dexClientAddress);
                    dispatch(
                        setClientData({
                            status: false,
                            dexclient: dexClientAddress,
                            balance: dexClientBalance,
                            public: clientKeys.public,
                        }),
                    );
                    dispatch(setTransactionsList([]));

                    dispatch(setSeedPassword(seedPhrasePassword));

                    setloadingUserDataIsWaiting(false);
                    dispatch(hideEnterSeedPhraseUnlock());
                    history.push("/swap");
                    return;
                }
                saveLog({
                    name: "login",
                    clientAddress: clientDataLS.dexclient,
                    deployed: true,
                    created_at: (Date.now() + 10800000) / 1000,
                }, "login")
                await InitializeClient(clientKeys.public);
                dispatch(setSeedPassword(seedPhrasePassword));

                const receiveTokensData = JSON.parse(
                    localStorage.getItem("setSubscribeReceiveTokens"),
                );
                if (receiveTokensData) {
                    dispatch(setSubscribeReceiveTokens(receiveTokensData));
                }

                // setSeedPhraseString("");
            }
            setloadingUserDataIsWaiting(false);
            dispatch(hideEnterSeedPhraseUnlock());
            history.push("/swap");
        } else {
            dispatch(
                setTips({
                    message: `Wrong PIN, please try again`,
                    type: "error",
                }),
            );
        }
    }

    function passwordChange(event) {
        let password = event.target.value;
        if (password.length > 0) setValidPassword(true);
        else setDecryptResult(null);
        setSeedPhrasePassword(password);
    }

    function handleLogOut() {
        localStorage.removeItem("esp");
        localStorage.removeItem("setSubscribeReceiveTokens");
        window.location.reload();
    }

    const CssTextField = styled(TextField)({
        "& .MuiOutlinedInput-input": {
            "&.Mui-disabled": {
                color: "var(--text-color)",
                "-webkit-text-fill-color": "unset",
            },
            color: "var(--text-color)",
        },
        "& .Mui-disabled": {
            color: "var(--text-color)",
        },
    });

    const [pinsConfirmed, setPinsConfirmed] = useState(true);

    function handleCheckPin(pinArr, step) {
        console.log("pinArr", pinArr)
        dispatch(setPin(pinArr));

    }

    return (
        <>
            {loadingUserDataIsWaiting ? (
                <WaitingPopup
                    hide={true}
                    title={"Connecting to blockchain"}
                    text={`Loading user data...`}
                />
            ) : (
                <div className="select-wrapper">
                    <PinPopup
                        title={"Enter your Pin"}
                        nextStep={"step3"}
                        prevStep={"step1"}
                        handleLogOut={() => handleLogOut()}
                        btnText={"Log in"}
                        pinCorrect={pinsConfirmed}
                        handleClickBack={null}
                        handleClose={null}
                        handleClickNext={(pin) => handleLogIn(pin)}
                        handleCheckPin={(pin, step, completed) => handleCheckPin(pin, step,completed)}
                    />
                </div>
            )
            }

        </>
    )
}

export default EnterPassword;
