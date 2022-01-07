import './PinPopup.scss';

import { Grid } from '@material-ui/core';
import range from 'lodash/range';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useKey } from 'react-use';

import arrowBack from '../../images/arrowBack.png';
import MainBlock from '../MainBlock/MainBlock';
import { NextBtn } from './NextBtn';
import PinKeyboard from './PinKeyboard';
import Steppers from './Steppers';

function PinPopup(props) {
  const appTheme = useSelector((state) => state.appReducer.appTheme);

  const { complete, handleBackspace, handleChange, value } = usePinInput({
    handleEnter: handleNextClick,
  });

  function handleNextClick() {
    props.handleClickNext({ complete, pin: value });
  }

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
            <div style={{ height: '23px' }}></div>
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
  const [rawValue, setRawValue] = useState(' '.repeat(length));

  const cursor = useMemo(() => rawValue.trim().length, [rawValue]);
  const complete = useMemo(() => rawValue.trim().length === length, [rawValue]);
  const valueArr = useMemo(
    () => rawValue.split('').map((v) => (v === ' ' ? '' : v)),
    [rawValue],
  );

  function handleChange(v) {
    if (complete) return;

    const arr = rawValue.split('');
    arr[cursor] = v;
    const str = arr.join('');

    setRawValue(str);
  }

  function handleBackspace() {
    let str = rawValue.trim().slice(0, -1);
    str = str.padEnd(length);

    setRawValue(str);
  }

  useKey('Enter', handleEnter, {}, [rawValue]);
  useKey('Backspace', handleBackspace, {}, [rawValue]);
  useKey('Delete', handleBackspace, {}, [rawValue]);
  useKey(
    (event) => /^[0-9]$/.test(event.key),
    () => handleChange(event.key),
    {},
    [rawValue],
  );

  return {
    complete,
    handleBackspace,
    handleChange,
    value: valueArr,
  };
}

export default PinPopup;
