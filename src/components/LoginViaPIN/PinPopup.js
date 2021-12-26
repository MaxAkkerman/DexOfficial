import './PinPopup.scss';

import { Grid } from '@material-ui/core';
import isNumber from 'lodash/isNumber';
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

  const { complete, handleBackspace, handleChange, value } = usePinInput();

  const valueArr = useMemo(
    () => value.split('').map((v, i) => ({ id: i, value: v })),
    [value],
  );

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
                PINS don't match!
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
                    value={value[i] === ' ' ? '' : value[i]}
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
                  handleClickNext={() =>
                    props.handleClickNext(valueArr, props.nextStep, complete)
                  }
                />
              </div>
            ) : (
              <NextBtn
                curBtnStyles={'curBtnStyles'}
                btnsClass={'enterSPRegBox'}
                btnText={props.btnText}
                errColor={null}
                handleClickNext={() =>
                  props.handleClickNext(valueArr, props.nextStep, complete)
                }
              />
            )}
          </>
        }
      />
    </div>
  );
}

function usePinInput({ length = 4 } = {}) {
  const [value, setValue] = useState(' '.repeat(length));

  const cursor = useMemo(() => value.trim().length, [value]);
  const complete = useMemo(() => value.trim().length === length, [value]);

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
    console.log({ str });

    setValue(str);
  }

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
    value,
  };
}

export default PinPopup;
