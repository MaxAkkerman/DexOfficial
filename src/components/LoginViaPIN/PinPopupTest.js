import './PinPopup.scss';

import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { onlyNums, pincodeArray } from '../../constants/defaultData';
import arrowBack from '../../images/arrowBack.png';
import CloseBtn from '../CloseBtn/CloseBtn';
import MainBlock from '../MainBlock/MainBlock';
import { NextBtn } from './NextBtn';
import PinKeyboard from './PinKeyboard';
import Steppers from './Steppers';

function PinPopup(props) {
  const [pinArr, setPinArr] = useState(pincodeArray);
  const [completed, setCompleted] = useState(false);
  const appTheme = useSelector((state) => state.appReducer.appTheme);

  let myRefs = [];
  const saveThisRef = (element) => {
    myRefs.push(element);
  };

  useEffect(() => {
    if (!pinArr) return;
    const curEmptyPin = pinArr.filter((item) => !item.value.length);
    if (!curEmptyPin.length) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [pinArr]);

  // useEffect(() => {
  //     props.handleCheckPin(pinArr, props.step,completed);
  // }, [pinArr]);

  function handleClickNumKeyboard(e) {
    let newPin = JSON.parse(JSON.stringify(pinArr));
    const curEmptyPin = newPin.filter((item) => !item.value.length);
    if (!curEmptyPin.length) return;
    newPin.map((item) => {
      if (item.id === curEmptyPin[0].id) {
        item.value = e.target.value;
        item.focused = false;
      }
      if (!curEmptyPin[1]) {
      } else if (item.id === curEmptyPin[1].id) {
        item.focused = true;
      }
    });
    setPinArr(newPin);
  }

  function handleClickNumInp(e) {
    let newPin = JSON.parse(JSON.stringify(pinArr));
    newPin.map((item) => {
      item.focused = item.id.toString() === e.target.id;
    });
    // console.log("newPinnewPin",newPin)
    setPinArr(newPin);
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
  }, []);

  function keyDownHandler(e) {
    // console.log(!e.key.match(onlyNums),e.key === "Meta",!e.key.match("Backspace"),!e.key.match("Delete"))
    console.log(e.key);

    if (e.key === 'Meta') return;

    let newPin = JSON.parse(JSON.stringify(pinArr));
    console.log(e.key);

    if (e.key === 'Backspace' || e.key === 'Delete') {
      let focusedItem = newPin.filter((item) => item.focused);

      if (focusedItem.length) {
        console.log('focusedItem', focusedItem);
        let backID = +focusedItem[0].id - 1 === -1 ? 0 : +focusedItem[0].id - 1;
        console.log('backID', backID);

        if (!backID) return;
        newPin.map((it) => {
          if (it.id === backID) {
            it.focused = true;
          }
          if (it.id === focusedItem[0].id) {
            it.value = '';
            it.focused = false;
          }
        });
        console.log('newPin', newPin);

        setPinArr(newPin);
        return;
      }
      // else {
      //     // if (!e.key.match(onlyNums)) return;
      //
      //     let lastFilledArr = newPin.filter(item => item.value.length)
      //     console.log("lastFilledArr",lastFilledArr)
      //
      //     if (!lastFilledArr.length) return
      //
      //     let lastFilledItem = lastFilledArr[lastFilledArr.length - 1]
      //     let preLastFilledItem = lastFilledArr[lastFilledArr.length - 2]
      //     console.log("lastFilledItem",lastFilledItem)
      //     console.log("preLastFilledItem",preLastFilledItem)
      //
      //     // if (!preLastFilledItem) return
      //
      //     newPin.map(it => {
      //         if(it.id === lastFilledItem.id && lastFilledItem.id === 0){
      //             it.value = "";
      //             it.focused = true;
      //         }else if(it.id === lastFilledItem.id && lastFilledItem.id !== 0) {
      //             it.value = "";
      //             it.focused = false;
      //         }
      //         if (preLastFilledItem && (it.id === preLastFilledItem)) {
      //             it.focused = true;
      //
      //         }
      //     })
      //
      //     setPinArr(newPin);
      //
      // }
      return;
    }
    console.log('1', 1);
    if (!e.key.match(onlyNums)) return;

    const curEmptyPin = newPin.filter((item) => !item.value.length);
    console.log('curEmptyPin', curEmptyPin);

    if (!curEmptyPin.length) return;

    if (!curEmptyPin[1]) {
      if (!newPin[3].value) {
        newPin[3].value = e.key;
      }

      newPin[3].focused = true;
      setPinArr(newPin);

      return;
    }

    newPin.map((item) => {
      if (item.focused) {
        item.value = e.key;
        item.focused = false;
      }
      if (!curEmptyPin[1]) {
      } else if (item.id === curEmptyPin[1].id) {
        item.focused = true;
      }
    });
    console.log('newPin', newPin);

    setPinArr(newPin);
  }

  // useEffect(()=>{
  //     const fRefs = myRefs.filter((item) => item);
  //     fRefs[0].focus()
  //
  // },[])
  // function handleClickNum(e, i) {
  //     // if (e.key === "Meta") return;
  //     if (e.key.match(onlyNums) || !e.key.match("Backspace") || !e.key.match("Delete")|| e.key === "Meta") return;
  //
  //     let newPin = JSON.parse(JSON.stringify(pinArr));
  //     const fRefs = myRefs.filter((item) => item);
  //     const forwardIndex = i + 1;
  //     const backIndex = i - 1;
  //     // if (!e.key.match(onlyNums)) return;
  //
  //     if (e.key === "Backspace" || e.key === "Delete") {
  //         if (backIndex === -1) {
  //             newPin[i].value = "";
  //             newPin[i].focused = true;
  //             setPinArr(newPin);
  //             return;
  //         }
  //         newPin[i].value = "";
  //         newPin[i].focused = false;
  //         newPin[backIndex].focused = true;
  //         setPinArr(newPin);
  //         if (backIndex < fRefs.length) fRefs[backIndex].focus();
  //         return;
  //     }
  //     newPin[i].value = e.key;
  //     newPin[i].focused = false;
  //     if (forwardIndex < fRefs.length) {
  //         fRefs[forwardIndex].focus();
  //         newPin[forwardIndex].focused = true;
  //     }
  //     setPinArr(newPin);
  // }

  return (
    <div
      className="select-wrapper"
      style={{ backdropFilter: appTheme === 'light' ? null : 'blur(130px)' }}
      onClick={() => console.log('pinArr', pinArr)}
    >
      <MainBlock
        // title={props.title ? props.title : "default"}
        classHeader={'fixFontSize'}
        classTitle={'fixFontSize'}
        content={
          <>
            <div className="head_wrapper" style={{ marginBottom: '20px' }}>
              {props.showTwoBtns ? (
                <button
                  className="arrow_back"
                  onClick={() => props.handleClickBack(props.prevStep)}
                >
                  <img src={arrowBack} alt={'arrow'} />
                </button>
              ) : null}
              <div className="left_block boldFont fixMedia">{props.title}</div>
            </div>

            {completed && !props.pinCorrect ? (
              <Grid style={{ color: 'red', textAlign: 'center' }}>
                PINS don't match!
              </Grid>
            ) : (
              <div style={{ height: '23px' }}></div>
            )}
            <Grid className="numsInputContainer">
              {pinArr.map((item, i) => {
                return (
                  <input
                    key={item.id}
                    ref={saveThisRef}
                    type={'password'}
                    style={{
                      cursor: 'pointer',
                      caretColor: 'transparent',
                      borderBottomColor: completed
                        ? !props.pinCorrect
                          ? 'red'
                          : `var(--accent)`
                        : item.focused
                        ? `var(--mainblock-title-color)`
                        : null,
                      color: completed
                        ? !props.pinCorrect
                          ? 'red'
                          : `var(--accent)`
                        : null,
                    }}
                    className="pinInput"
                    readOnly
                    id={item.id}
                    onClick={(e) => handleClickNumInp(e)}
                    maxLength={1}
                    value={item.value}
                    // onKeyDown={(e) => handleClickNum(e, i)}
                  />
                );
              })}
            </Grid>
            <PinKeyboard
              onClickNumKeyboard={(e) => handleClickNumKeyboard(e)}
            />

            <Steppers step={props.step} />
            {!props.showTwoBtns ? (
              <div style={{ display: 'flex', width: '100%' }}>
                <NextBtn
                  curBtnStyles={'curBtnStylesLogin'}
                  btnsClass={'LoginViaPinBtns'}
                  btnText={'Log out'}
                  errColor={true}
                  handleClickNext={() => props.handleLogOut()}
                />
                <NextBtn
                  curBtnStyles={'curBtnStylesLogin'}
                  btnsClass={'LoginViaPinBtns'}
                  btnText={props.btnText}
                  errColor={null}
                  handleClickNext={() => props.handleClickNext(pinArr)}
                />
              </div>
            ) : (
              <NextBtn
                curBtnStyles={'curBtnStyles'}
                btnsClass={'enterSPRegBox'}
                btnText={props.btnText}
                errColor={null}
                handleClickNext={() =>
                  props.handleClickNext(pinArr, props.nextStep, completed)
                }
              />
            )}
          </>
        }
      />
    </div>
  );
}

export default PinPopup;
