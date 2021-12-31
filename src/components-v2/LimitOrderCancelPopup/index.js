import cls from 'classnames';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconCross from '@/components-v2/IconCross';
import MainBlock from '@/components-v2/MainBlock';
import { CANCEL_LIMIT_ORDER } from '@/constants/commissions';
import { iconGenerator } from '@/iconGenerator';
import { closeLimitOrderCancelPopup } from '@/store/actions/limitOrder';
import { resetLimitOrderPopupValues } from '@/store/actions/limitOrder';
import {
  resetWaitingPopupValues,
  setWaitingPopupValues,
} from '@/store/actions/waitingPopup';
import truncateNum from '@/utils/truncateNum';

import classes from './index.module.scss';

export default function LimitOrderCancelPopup() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const appTheme = useSelector((state) => state.appReducer.appTheme);
  const values = useSelector((state) => state.limitOrderReducer.values);
  const visible = useSelector(
    (state) => state.limitOrderReducer.cancelPopupVisible,
  );
  const cancelLimitOrder = useSelector(
    (state) => state.tonContext.functions.cancelLimitOrder,
  );

  if (!values || !visible) return null;

  async function handleClose() {
    dispatch(closeLimitOrderCancelPopup());
  }

  async function handleConfirm() {
    const { addrOrder, fromToken, fromValue, toToken, toValue } = values;

    dispatch(closeLimitOrderCancelPopup());
    dispatch(
      setWaitingPopupValues({
        hidable: true,
        text: `Cancelling limit order ${truncateNum(fromValue)} ${
          fromToken.symbol
        } for ${truncateNum(toValue)} ${toToken.symbol}`,
        title: 'Sending message to blockchain',
      }),
    );

    try {
      const { cancelOrderStatus } = await cancelLimitOrder(addrOrder);

      if (cancelOrderStatus)
        enqueueSnackbar({
          message: `Canceling limit order ${fromToken.symbol} - ${toToken.symbol} ⏳`,
          type: 'info',
        });
      else
        enqueueSnackbar({
          message: `Failed to cancel limit order ${fromToken.symbol} - ${toToken.symbol}`,
          type: 'error',
        });
    } catch (e) {
      enqueueSnackbar({
        message: `Something went wrong, error code - ${e.code}`,
        type: 'error',
      });
    }

    dispatch(resetWaitingPopupValues());
    dispatch(resetLimitOrderPopupValues());
    dispatch(closeLimitOrderCancelPopup());
  }

  const { fromToken, fromValue, toPrice, toToken, toValue } = values;

  return (
    <div className="popup-wrapper">
      <MainBlock
        button={
          <button onClick={handleClose} className={classes.btn}>
            <IconCross
              fill="none"
              className={cls('close', classes.btn__icon)}
            />
          </button>
        }
        title="Cancel limit order"
        content={
          <>
            <div
              className={cls('confirm-block', classes['swap-confirm-block'])}
            >
              <span className="confirm-token">
                <img
                  className="confirm-icon"
                  src={iconGenerator(fromToken.symbol)}
                  alt={fromToken.symbol}
                />
                {fromValue}
              </span>
              {appTheme === 'light' ? (
                <svg
                  width="68"
                  height="19"
                  viewBox="0 0 68 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M0.897098 10.5H64.9499L58.8496 17.3C58.4908 17.7 58.4908 18.3 58.8496 18.7C59.029 18.9 59.2982 19 59.4776 19C59.657 19 59.9261 18.9 60.1055 18.7L67.7309 10.2C68.0897 9.8 68.0897 9.2 67.7309 8.8L60.1055 0.3C59.7467 -0.1 59.2084 -0.1 58.8496 0.3C58.4908 0.7 58.4908 1.3 58.8496 1.7L64.9499 8.5H0.897098C0.358839 8.5 0 8.9 0 9.5C0 10.1 0.358839 10.5 0.897098 10.5Z"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="68.0035"
                      y1="9.49999"
                      x2="-13.031"
                      y2="-17.3695"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#41444E" />
                      <stop offset="1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                <svg
                  className="swap-confirm-arrow"
                  width="68"
                  height="20"
                  viewBox="0 0 68 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M0.897098 11H64.9499L58.8496 17.8C58.4908 18.2 58.4908 18.8 58.8496 19.2C59.029 19.4 59.2982 19.5 59.4776 19.5C59.657 19.5 59.9261 19.4 60.1055 19.2L67.7309 10.7C68.0897 10.3 68.0897 9.7 67.7309 9.3L60.1055 0.8C59.7467 0.4 59.2084 0.4 58.8496 0.8C58.4908 1.2 58.4908 1.8 58.8496 2.2L64.9499 9H0.897098C0.358839 9 0 9.4 0 10C0 10.6 0.358839 11 0.897098 11Z"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="68.0035"
                      y1="9.99999"
                      x2="-13.031"
                      y2="-16.8695"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
              <span className="confirm-token">
                <img
                  className="confirm-icon"
                  src={iconGenerator(toToken.symbol)}
                  alt={toToken.symbol}
                />
                {truncateNum(toValue)}
              </span>
            </div>
            <button
              className="btn popup-btn btn-error unlock"
              onClick={handleConfirm}
            >
              Cancel
            </button>
          </>
        }
        footer={
          <div className="mainblock-footer">
            <div className="mainblock-footer-wrap">
              <div className={classes['swap-confirm-wrap']}>
                <p className="mainblock-footer-value">
                  {toPrice} {toToken.symbol}
                </p>
                <p className="mainblock-footer-subtitle">Price</p>
              </div>
              <div className="swap-confirm-wrap">
                <p className="mainblock-footer-value">
                  {CANCEL_LIMIT_ORDER} EVER
                </p>
                <p className="mainblock-footer-subtitle">Fee</p>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
