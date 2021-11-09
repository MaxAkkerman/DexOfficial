import React, {useEffect, useState} from "react";
import "./PinPopup.scss"
import PinPopup from "./PinPopup";
import WelcomePopup from "./WelcomePopup";

const cloneDeep = require('lodash.clonedeep');

function LoginViaPin(props) {
    const [agreementSigned, setAgreementSigned] = useState(false)

    const [steps, setStep] = useState([
            {name: "step1", weAreHere: true},
            {name: "step2", weAreHere: false},
            {name: "step3", weAreHere: false},
            {name: "step4", weAreHere: false}
        ]
    )

    function handleClickNext(nxtStp) {
        const makeNextStep = JSON.parse(JSON.stringify(steps))
        makeNextStep.map(item => {
            item.weAreHere = item.name === nxtStp;
        })
        setStep(makeNextStep)
    }
    function handleClickBack(bckStp) {
        const makeNextStep = JSON.parse(JSON.stringify(steps))
        makeNextStep.map(item => {
            item.weAreHere = item.name === bckStp;
        })
        setStep(makeNextStep)
    }
    function handleCheckPin() {

    }

    function handleClose() {

    }

    function handleSignAgreement(bl) {
        console.log(steps)
        setAgreementSigned(bl)
    }

    return (
        <>
            <div style={{width:"100px",height:"100px", background:"skyblue"}} onClick={()=>console.log(steps)}>button</div>
            {steps[0].weAreHere ?
                <WelcomePopup
                    nextStep={"step2"}
                    step={"1"}
                    showCloseBtn={true}
                    btnText={"Next"}
                    handleGetBack={(bckStp)=>handleClickBack(bckStp)}
                    agreementSigned={agreementSigned}
                    handleSignAgreement={(bl) => handleSignAgreement(bl)}
                    handleClose={() => handleClose()}
                    handleClickNext={(nxtStp) => handleClickNext(nxtStp)}
                />
                 : null}

            {steps[1].weAreHere ?
                <PinPopup
                    title={"Set PIN for quick login"}
                    step={"2"}
                    nextStep={"step3"}
                    prevStep={"step1"}
                    btnText={"Next"}
                    handleClickBack={(bckStp)=>handleClickBack(bckStp)}
                    handleClickNext={(nxtStp) => handleClickNext(nxtStp)}
                    handleCheckPin={(pin) => handleCheckPin(pin)}
                />
            :
            null}
            {steps[2].weAreHere ?
                <PinPopup
                    title={"Repeat PIN"}
                    step={"3"}
                    nextStep={"step4"}
                    prevStep={"step2"}
                    btnText={"Next"}
                    handleClickBack={(bckStp)=>handleClickBack(bckStp)}
                    handleClickNext={(nxtStp) => handleClickNext(nxtStp)}
                    handleCheckPin={(pin) => handleCheckPin(pin)}
                />
                :
                null}
            {steps[3].weAreHere ?
                <WelcomePopup
                    nextStep={"step1"}
                    prevStep={"step3"}
                    step={"4"}
                    closeBtn={false}
                    btnText={"Greate!"}
                    agreementSigned={agreementSigned}
                    handleGetBack={(bckStp)=>handleClickBack(bckStp)}
                    handleSignAgreement={(bl) => handleSignAgreement(bl)}
                    handleClose={() => handleClose()}
                    handleClickNext={(nxtStp) => handleClickNext(nxtStp)}
                />
                : null}

        </>
    )
}

export default LoginViaPin;
