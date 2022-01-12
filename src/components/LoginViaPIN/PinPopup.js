import './PinPopup.scss';

import { Grid } from '@material-ui/core';
import clone from 'lodash/clone';
import constant from 'lodash/constant';
import fill from 'lodash/fill';
import range from 'lodash/range';
import times from 'lodash/times';
import without from 'lodash/without';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useKey } from 'react-use';

import arrowBack from '../../images/arrowBack.png';
import MainBlock from '../MainBlock/MainBlock';
import { NextBtn } from './NextBtn';
import PinKeyboard from './PinKeyboard';
import Steppers from './Steppers';

export default function PinPopup(props) {
  const appTheme = useSelector((state) => state.appReducer.appTheme);

  const [pin, setPin] = useState(times(4, constant('')));

  const curSetPin = props.onSetPin ? props.onSetPin : setPin;
  const curPin = props.pin ? props.pin : pin;

  const { complete, handleBackspace, handleChange } = usePinInput({
    handleEnter: handleNextClick,
    handleSetValue: curSetPin,
    value: curPin,
  });

  function handleNextClick() {
    props.handleClickNext({ complete, pin: curPin });
  }

  return (
    <div
      className="select-wrapper"
      style={{ backdropFilter: appTheme === 'light' ? null : 'blur(130px)' }}
    >
      <MainBlock
        classHeader="fixFontSize"
        classTitle="fixFontSize"
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
                    value={curPin[i]}
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
            <Steppers step={props.step} lastStep={props.lastStep} />
            {!props.showTwoBtns ? (
              <div style={{ display: 'flex', width: '100%' }}>
                <NextBtn
                  curBtnStyles={'curBtnStylesLogin'}
                  btnsClass={'LoginViaPinBtns'}
                  btnsWrapper={'btnsWrapper'}
                  btnText={'Log out'}
                  errColor={true}
                  handleClickNext={props.handleLogOut}
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

PinPopup.propTypes = {
  onSetPin: PropTypes.func,
  pin: PropTypes.array,
};

function usePinInput({ handleEnter, handleSetValue, value }) {
  const cursor = useMemo(() => without(value, '').length, [value]);
  const complete = useMemo(
    () => without(value, '').length === value.length,
    [value],
  );

  function handleChange(v) {
    if (complete) return;

    const cloneValue = clone(value);
    cloneValue[cursor] = v;
    handleSetValue(cloneValue);
  }

  function handleBackspace() {
    const stripArr = without(value, '');
    stripArr.pop();
    const oldLength = stripArr.length;
    stripArr.length = value.length;
    const filled = fill(stripArr, '', oldLength);
    handleSetValue(filled);
  }

  useKey('Enter', handleEnter, {}, [value]);
  useKey('Backspace', handleBackspace, {}, [value]);
  useKey('Delete', handleBackspace, {}, [value]);
  useKey(
    (event) => /^[0-9]$/.test(event.key),
    () => handleChange(event.key),
    {},
    [value],
  );

  return {
    complete,
    handleBackspace,
    handleChange,
  };
}
