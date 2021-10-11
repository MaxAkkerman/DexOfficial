import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import cls from "classnames";
import MainBlock from "../../components/MainBlock/MainBlock";
import arrowBack from "../../images/arrowBack.png";
import CloseIcon from "@material-ui/icons/Close";
import {FormHelperText} from "@material-ui/core";
import {
    setAddressForSend,
} from "../../store/actions/walletSeed";
import InputChange from "../AmountBlock/InputChange";
import BlockItem from "../AmountBlock/AmountBlock";
import MaxBtn from "../AmountBlock/MAXbtn";
import ShowBalance from "../AmountBlock/ShowBalance";
import SendConfirmPopup from "../SendConfirmPopup/SendConfirmPopup";
import {withdrawAll, withdrawPart} from "../../extensions/sdk/run";
import WaitingPopup from "../WaitingPopup/WaitingPopup";
import {getAccType, getAccTypeHex} from "../../extensions/webhook/script";
import SetTokenBlock from "../AmountBlock/SetTokenBlock";
import useKeyPair from "../../hooks/useKeyPair";

function WithDraw(props) {
    const dispatch = useDispatch();
    const clientData = useSelector((state) => state.walletReducer.clientData);

    const [sendConfirmPopupIsVisible, setsendConfirmPopupIsVisible] = useState(false);
    const [showWaitingSendAssetPopup, setshowWaitingSendAssetPopup] = useState(false);
    const [amountValidation,setAmountValidation] = useState({})
    const [addressValidation,setAddressValidation] = useState({})
    const [addrForWithdraw, setAddressForWithDraw] = useState(null);
    const [amountWD,setAmountWD] = useState(0)
    const [addressToSendView, setaddressToSendView] = useState(null);

    const {keyPair} = useKeyPair();

    useEffect(()=>{
        if(amountWD > props.curNFTForWithdraw.stakeTotal/1000000000){
            setAmountValidation(
                {
                    isInvalid:true,
                    validationMsg: "Insufficient balance"
                }
            )
        }else{
            setAmountValidation(
                {
                    isInvalid:false,
                    validationMsg: "Insufficient balance"
                }
            )
        }
    },[amountWD])

    useEffect(async()=>{
        if(addrForWithdraw === null)return
        const res = await getAccTypeHex(addrForWithdraw)
        if(res.code){
            setAddressValidation({
                isInvalid:true,
                validationMsg: "Invalid address"
            })
        }else{
            setAddressValidation({
                isInvalid:false,
                validationMsg: "Invalid address"
            })
            setAddressForWithDraw(addrForWithdraw)
            handleSetView(addrForWithdraw)
        }
    },[addrForWithdraw])

    function handleChangeAddress(e) {
        setAddressForWithDraw(e.currentTarget.value)
    }

    function handleBack() {
        props.handleShow()
    }

    function handleSetWithDrawPopupVisibility() {
        setsendConfirmPopupIsVisible(true)
    }

    async function handleWithDraw(){
        const clientAddr = clientData.address;
        const keyContrAddr = props.curNFTForWithdraw.addrData

        if(amountWD === props.curNFTForWithdraw.stakeTotal/1000000000){
            setshowWaitingSendAssetPopup(true)
            setsendConfirmPopupIsVisible(false);
            const res = await withdrawAll(keyContrAddr,clientAddr,keyPair)
            setAmountWD(0)
            setAddressForWithDraw(null)
            setaddressToSendView(null)
            props.handleShow()
        }else{
            setshowWaitingSendAssetPopup(true)
            setsendConfirmPopupIsVisible(false);
            const res = await withdrawPart(keyContrAddr,clientAddr,keyPair,amountWD)
            setAmountWD(0)
            setAddressForWithDraw(null)
            setaddressToSendView(null)
            props.handleShow()
        }
    }

    function handleHideConfirmPopup() {
        setsendConfirmPopupIsVisible(false);
    }

    function handleSetView() {
        let spliced = addrForWithdraw.slice(0, 7);
        let splicedpart2 = addrForWithdraw.slice(59);
        let view = spliced + "..." + splicedpart2;
        setaddressToSendView(view);
    }

    function handleClearInput() {
        setaddressToSendView("");
        dispatch(setAddressForSend(""));
    }

    function handleClose() {
        props.handleShow()
    }

    function handleChangeAmountWithdraw(am){
        setAmountWD(am)
    }
    function handleSetMaxAmount(){
        setAmountWD(props.curNFTForWithdraw.stakeTotal/1000000000)
    }

    return (
        <div className="container">
            {!showWaitingSendAssetPopup && (
                <MainBlock
                    smallTitle={false}
                    content={
                        <div>
                            <div className="head_wrapper">
                                <button
                                    className="arrow_back"
                                    onClick={() => handleBack(false)}
                                >
                                    <img src={arrowBack} alt={"arrow"}/>
                                </button>
                                <div className="left_block boldFont">Withdraw stake</div>
                            </div>
                            <div
                                className={cls("recipient_wrapper", {
                                    amount_wrapper_error: addressValidation.isInvalid,
                                    amount_wrapper_success: !addressValidation.isInvalid,
                                })}
                            >
                                <div className="send_text_headers">Recipient address</div>
                                <div>
                                    <div className="send_inputs">
                                        <input
                                            onChange={(e) => handleChangeAddress(e)}
                                            value={addressToSendView ? addressToSendView : addrForWithdraw}
                                            className="recipient_input"
                                            placeholder={"0:..."}
                                        />

                                        <CloseIcon
                                            // style=
                                            fontSize="medium"
                                            onClick={() => handleClearInput("address")}
                                        />
                                    </div>
                                </div>
                            </div>
                            {addressValidation.isInvalid && (
                                <FormHelperText
                                    style={{marginLeft: "27px", marginTop: "4px"}}
                                    error
                                    id="component-error-text"
                                >
                                    {addressValidation.validationMsg}
                                </FormHelperText>
                            )}
                            <BlockItem
                                leftTitle={"Amount"}
                                rightTopBlock={
                                    <ShowBalance
                                        classWrapper={"send_balance center"}
                                        balance={props.curNFTForWithdraw.stakeTotal/1000000000}
                                        label={true}
                                        showBal={true}
                                    />
                                }
                                rightBottomBlock={
                                    <div className="send_set_token_wrap column">
                                        <MaxBtn
                                            setMAX={()=>handleSetMaxAmount()}
                                        />
                                        <SetTokenBlock
                                            handleTouchTokenModal={null}
                                            currentToken={props.curNFTForWithdraw}
                                        />
                                    </div>
                                }
                                leftBlockBottom={
                                    <InputChange
                                        amount={amountWD}
                                        changeAmout={(am)=>handleChangeAmountWithdraw(am)}

                                    />}
                                className={
                                    amountValidation.isInvalid
                                        ? "amount_wrapper_error"
                                        : "amount_wrapper_success"
                                }
                            />
                            {amountValidation.isInvalid && (
                                <FormHelperText
                                    style={{marginLeft: "27px", marginTop: "4px"}}
                                    error
                                    id="component-error-text"
                                >
                                    {amountValidation.validationMsg}
                                </FormHelperText>
                            )}

                            <div className="btn_wrapper ">
                                <button
                                    onClick={() => handleSetWithDrawPopupVisibility()}
                                    className={`btn mainblock-btn`}>
                                    Withdraw
                                </button>
                            </div>
                        </div>
                    }
                />
            )}
            {sendConfirmPopupIsVisible && (
                <SendConfirmPopup
                    hideConfirmPopup={() => handleHideConfirmPopup(false)}
                    addressToSend={addressToSendView}
                    currentAsset={props.curNFTForWithdraw}
                    amountToSend={amountWD}
                    title={"Withdraw stake"}
                    btnText={"Withdraw"}
                    msgText={"You are going to withdraw your stake"}
                    handleSend={() => handleWithDraw()}
                />
            )}

            {showWaitingSendAssetPopup && (
                <WaitingPopup
                    text={`Withdrawing ${amountWD} ${props.curNFTForWithdraw.symbol}`}
                    handleClose={() => handleClose()}
                />
            )}
        </div>
    );
}

export default WithDraw;
