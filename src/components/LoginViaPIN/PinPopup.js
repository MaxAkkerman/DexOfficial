import './PinPopup.scss';

import { Grid } from '@material-ui/core';
import isNumber from 'lodash/isNumber';
import range from 'lodash/range';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useKey } from 'react-use';

import arrowBack from '../../images/arrowBack.png';
import MainBlock from '../MainBlock/MainBlock';
import { NextBtn } from './NextBtn';
import PinKeyboard from './PinKeyboard';
import Steppers from './Steppers';

function PinPopup(props) {
  const appTheme = useSelector((state) => state.appReducer.appTheme);

  function handleNextClick() {
    props.handleClickNext(valueArr, props.nextStep, complete);
  }

  const { complete, handleBackspace, handleChange, value } = usePinInput({
    handleEnter: handleNextClick,
  });

  // Intermediate variable to match api of previous code
  const valueArr = useMemo(
    () =>
      value.map((v, i) => ({
        error: false,
        focused: false,
        id: i,
        value: v,
      })),
    [value],
  );

  // Hook to match api of previous code
  useEffect(() => {
    props.handleCheckPin(valueArr, props.nextStep, complete);
  }, [value]);

  return (
    <div
      className="select-wrapper"
      style={{ backdropFilter: appTheme === 'light' ? null : 'blur(130px)' }}
    >
      <MainBlock
        // title={props.title ? props.title : "default"}
        classHeader={'fixFontSize'}
        classTitle={'fixFontSize'}
        content={
          <>
            <div className="pin_head_wrapper">
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

            {complete && !props.pinCorrect ? (
              <Grid style={{ color: 'red', textAlign: 'center' }}>
                PINS don&apos;t match!
              </Grid>
            ) : (
              <div style={{ height: '23px' }}></div>
            )}
            <Grid className="numsInputContainer">
              {range(4).map((i) => {
                return (
                  <input
                    key={i}
                    type="password"
                    style={{
                      borderBottomColor: complete
                        ? 'var(--accent)'
                        : 'var(--mainblock-title-color)',
                      caretColor: 'transparent',
                      color: complete
                        ? 'var(--accent)'
                        : 'var(--mainblock-title-color)',
                    }}
                    className="pinInput"
                    id={i}
                    maxLength={1}
                    value={value[i]}
                    disabled
                  />
                );
              })}
            </Grid>
            <PinKeyboard
              onClickNumKeyboard={(e, v) => {
                if (v === 11) handleBackspace();
                else handleChange(v + 1);
              }}
            />

            <Steppers step={props.step} />
            {!props.showTwoBtns ? (
              <div style={{ display: 'flex', width: '100%' }}>
                <NextBtn
                  curBtnStyles={'curBtnStylesLogin'}
                  btnsClass={'LoginViaPinBtns'}
                  btnsWrapper={'btnsWrapper'}
                  btnText={'Log out'}
                  errColor={true}
                  handleClickNext={() => props.handleLogOut()}
                />
                <NextBtn
                  curBtnStyles={'curBtnStylesLogin'}
                  btnsClass={'LoginViaPinBtns'}
                  btnsWrapper={'btnsWrapper'}
                  btnText={props.btnText}
                  errColor={null}
                  handleClickNext={handleNextClick}
                />
              </div>
            ) : (
              <NextBtn
                curBtnStyles={'curBtnStyles'}
                btnsClass={'enterSPRegBox'}
                btnText={props.btnText}
                errColor={null}
                handleClickNext={handleNextClick}
              />
            )}
          </>
        }
      />
    </div>
  );
}

function usePinInput({ handleEnter = () => {}, length = 4 } = {}) {
  const [value, setValue] = useState(' '.repeat(length));

  const cursor = useMemo(() => value.trim().length, [value]);
  const complete = useMemo(() => value.trim().length === length, [value]);
  const valueArr = useMemo(() =>
    value.split('').map((v) => (v === ' ' ? '' : v)),
  );

  function handleChange(v) {
    if (complete || /[^0-9]/.test(v)) return;

    const arr = value.split('');
    arr[cursor] = v;
    const str = arr.join('');

    setValue(str);
  }

  function handleBackspace() {
    let str = value.trim().slice(0, -1);
    str = str.padEnd(length);

    setValue(str);
  }

  useKey('Enter', handleEnter, {}, [value]);
  useKey('Backspace', handleBackspace, {}, [value]);
  useKey('Delete', handleBackspace, {}, [value]);
  useKey(
    (event) => isNumber(+event.key),
    () => handleChange(event.key),
    {},
    [value],
  );

  return {
    complete,
    handleBackspace,
    handleChange,
    value: valueArr,
  };
}

export default PinPopup;
