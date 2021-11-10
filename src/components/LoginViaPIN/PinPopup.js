import React, {useEffect, useState} from "react";
import MainBlock from "../MainBlock/MainBlock";
import "./PinPopup.scss"
import {
    Grid
} from "@material-ui/core";
import {numPadArr, pincodeArray} from "../../constants/defaultData";
import PinKeyboard from "./PinKeyboard";
import {NextBtn} from "./NextBtn";
import Steppers from "./Steppers";
import arrowBack from "../../images/arrowBack.png";

const pattern = "[0-9]+"

function PinPopup(props) {
    const [pinArr, setPinArr] = useState(pincodeArray)
    const [completed, setCompleted] = useState(false)

    let myRefs = [];
    const saveThisRef = (element) => {
        myRefs.push(element);
    }

    useEffect(() => {
        if (!pinArr) return
        const curEmptyPin = pinArr.filter(item => !item.value.length)
        if (!curEmptyPin.length) {
            setCompleted(true)
        } else {
            setCompleted(false)
        }
    }, [pinArr])


    useEffect(() => {
        props.handleCheckPin(pinArr, props.step)
    }, [pinArr])

    function handleClickNumKeyboard(e) {
        let newPin = JSON.parse(JSON.stringify(pinArr))
        const curEmptyPin = newPin.filter(item => !item.value.length)
        if (!curEmptyPin.length) return
        newPin.map(item => {
            if (item.id === curEmptyPin[0].id) {
                item.value = e.target.value
                item.focused = false
            }
            if (!curEmptyPin[1]) {
                console.log("last one")
            } else if (item.id === curEmptyPin[1].id) {
                item.focused = true
            }
        })
        setPinArr(newPin)
    }

    function handleClickNumInp(e) {
        let newPin = JSON.parse(JSON.stringify(pinArr))
        newPin.map(item => {
            item.focused = item.id.toString() === e.target.id;
        })
        setPinArr(newPin)
    }

    // useEffect(() => {
    //     window.addEventListener("keydown", keyDownHandler)
    // }, [])
    //
    // function keyDownHandler(e) {
    //
    //     const fRefs = myRefs.filter(item => item)
    //     if (e.key === "Meta") return
    //     let newPin = JSON.parse(JSON.stringify(pinArr))
    //     const curEmptyPin = newPin.filter(item => item.focused)
    //     console.log("curEmptyPin", curEmptyPin)
    //
    //     if (!curEmptyPin.length) return
    //     let nextId;
    //     let ind;
    //     newPin.map((item,i) => {
    //
    //         if (item.id === curEmptyPin[0].id) {
    //             console.log("item.id",item.id)
    //             item.value = e.key
    //             item.focused = false
    //             ind = i
    //             nextId = +item.id + 1
    //         }
    //     })
    //     // newPin.map(item => {
    //     //     console.log("next one ocused")
    //     //     if(item.id === nextId){
    //     //         item.focused = true
    //     //     }
    //     // })
    //     if (ind < fRefs.length) {
    //         fRefs[nextId].focus();
    //         newPin[nextId].focused = true;
    //     }
    //
    //     setPinArr(newPin)
    // }

    function handleClickNum(e, i) {
        let newPin = JSON.parse(JSON.stringify(pinArr))
        const fRefs = myRefs.filter(item => item)
        const forwardIndex = i + 1;
        const backIndex = i - 1;
        if (e.key === "Meta") return

        if ((e.key === "Backspace") || (e.key === "Delete")) {

            if (backIndex === -1) {
                newPin[i].value = "";
                newPin[i].focused = true;
                setPinArr(newPin)
                return
            }
            newPin[i].value = "";
            newPin[i].focused = false;
            newPin[backIndex].focused = true;
            setPinArr(newPin)
            if (backIndex < fRefs.length) fRefs[backIndex].focus();
            return
        }
        if (!e.key.match(pattern)) return
        newPin[i].value = e.key
        newPin[i].focused = false;
        if (forwardIndex < fRefs.length) {
            fRefs[forwardIndex].focus();
            newPin[forwardIndex].focused = true;
        }
        setPinArr(newPin)
    }

    return (
        <div className="select-wrapper" onClick={() => console.log("pinArr", pinArr)}>
            <MainBlock
                // title={props.title ? props.title : "default"}
                classHeader={"fixFontSize"}
                classTitle={"fixFontSize"}

                content={
                    <>
                        <div className="head_wrapper" style={{marginBottom: "20px"}}>
                            <button className="arrow_back" onClick={() => props.handleClickBack(props.prevStep)}>
                                <img src={arrowBack} alt={"arrow"}/>
                            </button>
                            <div className="left_block boldFont fixMedia">{props.title}</div>
                        </div>

                        {completed && !props.pinCorrect ?
                            <Grid style={{color: "red", textAlign: "center"}}>
                                PINS don't match!
                            </Grid>
                            :
                            <div style={{height: "23px"}}>

                            </div>
                        }
                        <Grid className="numsInputContainer">
                            {pinArr.map((item, i) => {
                                return <input
                                    key={item.id}
                                    ref={saveThisRef}
                                    type={"password"}
                                    style={{
                                        cursor: "pointer",
                                        caretColor: "transparent",
                                        borderBottomColor: completed ? (!props.pinCorrect ? "red" : "#3569f0") : (item.focused ? "#3569f0" : null),
                                        color: completed ? (!props.pinCorrect ? "red" : "#3569f0") : null
                                    }}
                                    className="pinInput"
                                    readOnly
                                    id={item.id}
                                    onClick={(e) => handleClickNumInp(e)}
                                    maxLength={1}
                                    value={item.value}
                                    onKeyDown={(e) => handleClickNum(e, i)}
                                />
                            })
                            }
                        </Grid>
                        <PinKeyboard
                            numPadArr={numPadArr}
                            handleClickNumKeyboard={(e) => handleClickNumKeyboard(e)}
                        />

                        <Steppers
                            step={props.step}
                        />
                        <NextBtn
                            btnText={props.btnText}
                            handleClickNext={() => props.handleClickNext(props.nextStep, completed)}
                        />

                    </>

                }
            />
        </div>
    )
}

export default PinPopup;
