// import "./PinPopup.scss"
import './LoginViaPin.scss';

import { Box, Grid } from '@material-ui/core';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { setTips } from '@/store/actions/app';

import arrowBack from '../../images/arrowBack.png';
import CloseBtn from '../CloseBtn/CloseBtn';
import MainBlock from '../MainBlock/MainBlock';
import { NextBtn } from './NextBtn';
import PinKeyboard from './PinKeyboard';
import Steppers from './Steppers';
// margin-top: 40px;
// margin-right: 40px;

function WelcomePopup(props) {
  const appTheme = useSelector((state) => state.appReducer.appTheme);
  const router = useHistory();
  const dispatch = useDispatch();
  const [lockedInterface, setLockedInterface] = React.useState(false);
  function href(path) {
    if (path === 'gogle') window.open('https://google.com');
  }

  function goToRecovery() {
    if (!lockedInterface) {
      dispatch(
        setTips({
          message: 'Please, wait...',
          type: 'info',
        }),
      );
      setLockedInterface(true);
      props.handleClickNext(true);
    }
  }

  return (
    <div
      className="select-wrapper"
      style={{ backdropFilter: appTheme === 'light' ? null : 'blur(130px)' }}
    >
      <MainBlock
        title={props.title ? props.title : ''}
        button={
          props.showCloseBtn ? (
            <CloseBtn
              func={() => (lockedInterface ? null : props.handleClose())}
              width="20"
              height="20"
            />
          ) : null
        }
        classHeader={props.showCloseBtn ? 'fixPaddings' : ''}
        classNameContainer={'removePad'}
        classTitle={'fixFontSize'}
        content={
          <>
            {!props.showCloseBtn ? (
              <>
                <div className="head_wrapper specForSuccess">
                  <button
                    className="arrow_back"
                    onClick={() => props.handleGetBack(props.prevStep)}
                  >
                    <img className="arrowImg" src={arrowBack} alt={'arrow'} />
                  </button>
                  <div className="left_block boldFont">Success!</div>
                </div>
                <Grid
                  className="welcomeTextWrapper"
                  style={{ height: '59px', margin: '10px auto auto auto' }}
                >
                  You are registered in DeFiSpace
                </Grid>
              </>
            ) : (
              <>
                <Grid className="welcomeWrapper">Welcome to DeFiSpace!</Grid>
                <Grid
                  className="welcomeTextWrapper"
                  style={{ margin: '10px auto auto auto' }}
                >
                  Just read the user's agreement and set pin for registration
                </Grid>
              </>
            )}

            <Grid className="welcomeAgreementContainer">
              {props.showCloseBtn ? (
                <>
                  <input
                    className="agreementCheckBox"
                    type="checkbox"
                    onClick={() =>
                      props.handleSignAgreement(!props.agreementSigned)
                    }
                  />
                  <Grid className="welcomeTextWrapper agreementText">
                    I accept the terms in the&nbsp;
                    <a className="linkedText" onClick={() => href('gogle')}>
                      User's agreement
                    </a>
                  </Grid>
                </>
              ) : (
                <Grid className="welcomeTextWrapper" style={{ width: '55' }}>
                  Don't forget to save the seed-phrase from your&nbsp;
                  <a className="linkedText" onClick={goToRecovery}>
                    account recovery settings
                  </a>
                </Grid>
              )}
            </Grid>
            <Steppers step={props.step} />
            <NextBtn
              curBtnStyles={'curBtnStyles'}
              btnsClass={'enterSPRegBox'}
              marginBottom={'50px'}
              errColor={null}
              disabled={lockedInterface}
              btnText={props.btnText}
              handleClickNext={() => {
                setLockedInterface(true);
                dispatch(
                  setTips({
                    message: 'Please, wait...',
                    type: 'info',
                  }),
                );
                props.handleClickNext(props.nextStep);
              }}
            />
          </>
        }
      />
    </div>
  );
}

export default WelcomePopup;
