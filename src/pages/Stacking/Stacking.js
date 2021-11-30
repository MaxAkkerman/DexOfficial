import './Stacking.scss';

import {
  Alert,
  Box,
  Button,
  CardActions,
  Grid,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import MainBlock from '../../components/MainBlock/MainBlock';
import StackingConfirmPopup from '../../components/StackingConfirmPopup/StackingConfirmPopup';
import WaitingPopup from '../../components/WaitingPopup/WaitingPopup';
import { STACKING as STACKING_COMMISSION } from '../../constants/commissions';
import { marks, programs } from '../../constants/defaultData';
import {
  NOT_ENOUGH as NOT_ENOUGH_MSG,
  NOT_ENOUGH_CAUSE_COMMISSION as NOT_ENOUGH_CAUSE_COMMISSION_MSG,
} from '../../constants/validationMessages';
import useAssetList from '../../hooks/useAssetList';
import TON from '../../images/tonCrystalDefault.svg';
import { calculateRate } from '../../reactUtils/reactUtils';
import {
  setAPYforStaking,
  setShowStakingWaitingPopup,
  setStackingAmount,
  setStackingPeriod,
} from '../../store/actions/staking';
import { hideStackingConfirmPopup } from '../../store/actions/wallet';

function Stacking() {
  const history = useHistory();
  const dispatch = useDispatch();

  const walletIsConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );
  const showWaitingStakingPopup = useSelector(
    (state) => state.stakingReducer.showWaitingStakingPopup,
  );

  const [period, setPeriod] = useState(1 / 30);
  const [curProgram, setProgram] = useState(0);
  const [showConfirmPopup, setStackingConfirmPopup] = useState(false);

  const { assetList } = useAssetList();
  const {
    errors,
    isValid: valid,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: {
      stake: 1000,
      profit: 0.1619,
      APY: 6,
    },
    async validate({ stake }) {
      const errors = {};

      const tonAsset = assetList.find((t) => t.symbol === 'TON Crystal');
      if (!tonAsset) return;

      if (tonAsset.balance < stake) errors.stake = NOT_ENOUGH_MSG;

      if (tonAsset.balance - STACKING_COMMISSION < stake)
        errors.commission = `${NOT_ENOUGH_CAUSE_COMMISSION_MSG}\nCommission is ${STACKING_COMMISSION} TON`;

      return errors;
    },
  });

  function valuetext(value) {
    return `${value}°C`;
  }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  function onPeriodChange(event) {
    let curPeriod = Number(event.target.value);
    if (curPeriod === 12) setProgram(1);
    else if (curPeriod === 48) setProgram(2);
    else setProgram(0);
    setPeriod(curPeriod);

    const curMark = marks.filter((item) => item.value === curPeriod);

    setFieldValue('APY', curMark[0].rate);
    reCalc(curMark[0].rate, curMark[0].value);
  }

  function reCalc(percent, period) {
    const totalProfit = calculateRate(values.stake, percent, period);

    const profit = totalProfit - values.stake;

    setFieldValue('profit', profit);
  }

  function calculateButton(item) {
    setProgram(item.id);
    setPeriod(item.period);
    setFieldValue('APY', item.apy);
    reCalc(item.apy, item.period);
  }

  function onStakeChange(event) {
    let newStake = Number(event.target.value);

    if (newStake < 1) newStake = 0;

    const totalProfit = calculateRate(newStake, values.APY, period);

    const profit = totalProfit - newStake;
    setFieldValue('profit', profit);
    setFieldValue('stake', newStake);
  }

  function handlestake(show) {
    if (!valid) return;

    let periodInSeconds = 0;
    if (period === 1 / 30) {
      periodInSeconds = 86400;
    } else {
      periodInSeconds = Number(period) * 30 * 60 * 60 * 24;
    }

    const stakeInNanotons = Number(values.stake) * 1000000000;

    dispatch(setStackingPeriod(periodInSeconds));
    dispatch(setStackingAmount(stakeInNanotons));
    dispatch(setAPYforStaking(values.APY));

    setStackingConfirmPopup(show);
  }

  function handleCloseStackingConfirm() {
    setStackingConfirmPopup(false);
  }

  function handleDrop() {
    dispatch(setStackingPeriod(12 * 30 * 60 * 60 * 24));
    dispatch(setStackingAmount(1000000000000));
    setFieldValue('APY', 10.57);
    setFieldValue('profit', 105.7);
    setFieldValue('stake', 0);
    setPeriod(12);
    setStackingConfirmPopup(false);
  }
  function handleClose() {
    dispatch(setShowStakingWaitingPopup(false));
  }

  return (
    <div className="container">
      {showConfirmPopup ? (
        <StackingConfirmPopup
          stake={values.stake}
          period={period}
          // program={programs[curProgram]}
          programName={programs[curProgram].name}
          profit={values.profit}
          handleClose={() => handleCloseStackingConfirm()}
          APY={values.APY}
          hideConfirmPopup={() => dispatch(hideStackingConfirmPopup())}
          handleDrop={() => handleDrop()}
        />
      ) : null}
      {showWaitingStakingPopup ? (
        <WaitingPopup
          text={`Stacking ${values.stake} TONS`}
          handleClose={() => handleClose()}
        />
      ) : null}
      {!showWaitingStakingPopup && !showConfirmPopup ? (
        <MainBlock
          smallTitle={false}
          // centerTitle={true}
          classTitle="headerTitleFix"
          // title={'Staking with TON Crystal'}
          content={
            <div>
              <div
                className="head_wrapper"
                onClick={() =>
                  console.log(
                    'profit',
                    values.profit,
                    'stake',
                    values.stake,
                    'APY',
                    values.APY,
                    'priod',
                    period,
                  )
                }
              >
                <div className="left_block boldFont">
                  Staking with TON Crystal
                </div>
              </div>
              <div className="program_block_wrapper">
                {/*<Grid item>*/}
                <div className="program_item_wrapper_head">
                  <div className={'Stacking__program'}>Program</div>
                  <div className={'Stacking__term'}>Term</div>
                  <div className={'Stacking__apy'}>APY</div>
                  {/*</CardContent>*/}
                </div>
                {programs.map((item) => {
                  return (
                    <div key={item.apy} className="program_item_wrapper">
                      <div className={'Stacking__program_data_block'}>
                        <Typography
                          variant="h5"
                          className={'Staking__text program'}
                          sx={{ fontWeight: 'bold' }}
                          color="var(--primary-color)"
                          style={{ width: '27%' }}
                        >
                          {item.name}
                          {item.period === 0 ? `` : `* `}
                        </Typography>
                        <Typography
                          variant="h5"
                          className={'Staking__text term'}
                          color="var(--primary-color)"
                        >
                          {item.info}
                        </Typography>
                        <Typography
                          variant="h5"
                          className={'Staking__text apy'}
                          sx={{ fontWeight: 'bold', wordBreak: 'all' }}
                          color="var(--primary-color)"
                        >
                          ~{item.apy}%
                        </Typography>
                      </div>
                      {/*</CardContent>*/}
                      <CardActions>
                        {/*{item.id === 0*/}
                        {/*    ?*/}
                        {/*    <div style={{fontSize: "14px", width: "100px", color: "#3569F0"}}>Coming soon</div>*/}
                        {/*    :*/}
                        <Button
                          size="small"
                          disabled={item.disabledBtn}
                          disableRipple
                          sx={{
                            '&:hover': {
                              backgroundColor:
                                programs[curProgram].name === item.name
                                  ? 'rgba(53, 105, 240, 0.4)'
                                  : 'rgba(0, 31, 111, 0.85)',
                              color:
                                programs[curProgram].name === item.name
                                  ? '#3569F0'
                                  : '#F4F7FF',
                              boxShadow: 'none',
                            },
                            background:
                              programs[curProgram].name === item.name
                                ? 'rgba(0, 31, 111, 0.85)'
                                : 'rgba(53, 105, 240, 0.4)',
                            border: 'none',
                            // height: "37px",
                            color:
                              programs[curProgram].name === item.name
                                ? '#F4F7FF'
                                : '#3569F0',
                            borderRadius: '12px',
                            padding: '8px',
                            fontSize: '11px',
                            width: '95px',
                            height: '34px',
                          }}
                          onClick={() => calculateButton(item)}
                        >
                          {item.status}
                        </Button>
                        {/*}*/}
                      </CardActions>
                    </div>
                  );
                })}
              </div>

              <Box className="Stacking__calculator_box">
                <Stack spacing={2} sx={{ width: '95%' }}>
                  <div className="mainblock-header mainblock-header--center">
                    <h2 className="mainblock-title mainblock-title--small">
                      Deposit calculator
                    </h2>
                  </div>

                  <div>
                    <div className="Stacking__calculator_deposit_term_text">
                      Choose deposit term:{' '}
                      {period === 1 / 30 ? '1 day' : `${period} months`}
                    </div>
                    <Box sx={{ width: '100%' }}>
                      <Slider
                        aria-label="Always visible"
                        defaultValue={12}
                        value={period}
                        sx={{
                          color: 'var(--accent)',
                        }}
                        componentsProps={{
                          markLabel: {
                            style: {
                              color: 'var(--primary-color)',
                            },
                          },
                        }}
                        disabled
                        getAriaValueText={valuetext}
                        onChange={onPeriodChange}
                        min={6}
                        step={3}
                        max={48}
                        marks={marks}
                      />
                    </Box>
                  </div>

                  <Stack spacing={2}>
                    <Stack
                      spacing={2}
                      direction={'row'}
                      sx={{ justifyContent: 'space-between' }}
                    >
                      <Grid item>
                        <Stack spacing={1}>
                          <div className="Stacking__calculator_deposit_term_text">
                            Enter amount to stake
                          </div>
                          <TextField
                            sx={{ borderRadius: '12px' }}
                            value={values.stake}
                            inputProps={{
                              style: {
                                color: 'var(--primary-color)',
                              },
                            }}
                            onChange={onStakeChange}
                            id="stacking-amount"
                            size="small"
                            variant="outlined"
                            error={errors.stake ? errors.stake : null}
                            helperText={walletIsConnected ? errors.stake : null}
                            disabled={walletIsConnected ? null : 'disabled'}

                            // placeholder="1000"
                          />
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Stack spacing={1} sx={{ alignItems: 'flex-end' }}>
                          <div className="Stacking__calculator_deposit_term_text end">
                            In{' '}
                            {period === 1 / 30 ? '1 day' : `${period} months`}{' '}
                            you will have
                          </div>
                          <Stack spacing={1} direction={'row'}>
                            <Typography
                              sx={{
                                fontWeight: '700',
                                fontSize: '24px',
                                lineHeight: 'unset',
                                color: 'var(--primary-color)',
                              }}
                            >
                              <img
                                style={{ marginRight: '5px' }}
                                src={TON}
                                alt={'Ton Crystal'}
                              />{' '}
                              {Number(values.stake + values.profit).toFixed(
                                4,
                              ) || 0}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Stack>

                    {/*<div className={"Stacking__calculator_div_container"}>*/}
                    {/*	<Stack spacing={1}>*/}
                    {/*		<div className="Stacking__calculator_deposit_term_text">*/}
                    {/*			Enter amount to stake*/}
                    {/*		</div>*/}
                    {/*		<TextField*/}
                    {/*			sx={{borderRadius: "12px"}}*/}
                    {/*			value={values.stake}*/}
                    {/*			inputProps={{*/}
                    {/*				style: {*/}
                    {/*					color: "var(--primary-color)",*/}
                    {/*				},*/}
                    {/*			}}*/}
                    {/*			onChange={onStakeChange}*/}
                    {/*			id="stacking-amount"*/}
                    {/*			size="small"*/}
                    {/*			variant="outlined"*/}
                    {/*			error={errors.stake ? errors.stake : null}*/}
                    {/*			helperText={walletIsConnected ? errors.stake : null}*/}
                    {/*			disabled={walletIsConnected ? null : "disabled"}*/}

                    {/*// placeholder="1000"*/}
                    {/*/>*/}
                  </Stack>

                  {/*<Stack*/}
                  {/*	spacing={1}*/}
                  {/*	className={"Stacking__calculator_item end"}*/}
                  {/*>*/}
                  {/*	<div className="Stacking__calculator_deposit_term_text end">*/}
                  {/*		In {period} months you will have*/}
                  {/*	</div>*/}
                  {/*	<Stack spacing={1} direction={"row"}>*/}
                  {/*		<Typography*/}
                  {/*			sx={{*/}
                  {/*				fontWeight: "700",*/}
                  {/*				fontSize: "24px",*/}
                  {/*				lineHeight: "unset",*/}
                  {/*				color: "var(--primary-color)",*/}
                  {/*				wordBreak: "break-all",*/}
                  {/*			}}*/}
                  {/*		>*/}
                  {/*			<img*/}
                  {/*				style={{marginRight: "5px"}}*/}
                  {/*				src={TON}*/}
                  {/*				alt={"Ton Crystal"}*/}
                  {/*			/>{" "}*/}

                  {/*			{Number(profit).toFixed(4) || 0}*/}

                  {/*			/!*{Number(values.stake + values.profit).toFixed(1) ||*!/*/}
                  {/*			/!*	0}*!/*/}

                  {/*		</Typography>*/}
                  {/*	</Stack>*/}
                  {/*</Stack>*/}
                  {/*</div>*/}

                  <div className={'Stacking__calculator_div_container'}>
                    <Stack
                      spacing={1}
                      className={'Stacking__calculator_item end'}
                    >
                      <div className="Stacking__calculator_deposit_term_text">
                        Your profit
                      </div>
                      <Typography
                        sx={{
                          fontWeight: '700',
                          fontSize: '24px',
                          lineHeight: 'unset',
                          color: 'var(--primary-color)',
                          wordBreak: 'break-all',
                        }}
                      >
                        <img
                          style={{ marginRight: '5px' }}
                          src={TON}
                          alt={'Ton Crystal'}
                        />{' '}
                        {Number(values.profit).toFixed(1) || 0}
                      </Typography>
                    </Stack>
                    <Stack
                      spacing={1}
                      className={'Stacking__calculator_item end'}
                    >
                      <div className="Stacking__calculator_deposit_term_text end">
                        Annual Percentage Yield (APY)
                      </div>
                      <Stack spacing={1} direction={'row'}>
                        <Typography
                          sx={{
                            fontWeight: '700',
                            fontSize: '24px',
                            lineHeight: 'unset',
                            color: 'var(--primary-color)',
                          }}
                        >
                          {values.APY || 0}%
                        </Typography>
                      </Stack>
                    </Stack>
                  </div>
                </Stack>
                <Stack style={{ width: '100%' }}>
                  {walletIsConnected ? (
                    <button
                      // disabled
                      onClick={() => handlestake(true)}
                      disabled={errors.commission || errors.stake}
                      style={{ borderRadius: '16px', height: '59px' }}
                      // className={"btn mainblock-btn btn--disabled"}

                      className="btn mainblock-btn"
                      // {error || period !== 1 / 30
                      // 	? "btn mainblock-btn btn--disabled"
                      // 	: "btn mainblock-btn"
                      // 	}
                    >
                      {' '}
                      {period === 1 / 30 ? 'Stake' : 'Coming soon'}
                    </button>
                  ) : (
                    <button
                      className="btn mainblock-btn"
                      onClick={() => history.push('/account')}
                    >
                      Connect wallet
                    </button>
                  )}
                </Stack>
              </Box>
              <Box style={{ marginTop: '20px' }}>
                <Alert severity="info">
                  *These deposits are TrueNFT-ready. You can use your deposit
                  certificate as collateral to get liquidity before the end of
                  term or simply sell it on auction.
                </Alert>
              </Box>
              {/*</Stack>*/}
            </div>
          }
        />
      ) : null}
    </div>
  );
}

export default Stacking;
