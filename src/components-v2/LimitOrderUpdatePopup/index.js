import { FormHelperText } from '@mui/material';
import cls from 'classnames';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconCross from '@/components-v2/IconCross';
import MainBlock from '@/components-v2/MainBlock';
import { UPDATE_LIMIT_ORDER } from '@/constants/commissions';
import {
  ADDRESS_INCORRECT_LENGTH,
  NOT_POSITIVE,
} from '@/constants/validationMessages';
import { iconGenerator } from '@/iconGenerator';
import {
  closeLimitOrderUpdatePopup,
  resetLimitOrderPopupValues,
} from '@/store/actions/limitOrder';
import {
  resetWaitingPopupValues,
  setWaitingPopupValues,
} from '@/store/actions/waitingPopup';
import truncateNum from '@/utils/truncateNum';

import classes from './index.module.scss';

const NO_CHANGE = 'Values are not changed';

export default function LimitOrderUpdatePopup() {
  const dispatch = useDispatch();

  const appTheme = useSelector((state) => state.appReducer.appTheme);
  const initialValues = useSelector((state) => state.limitOrderReducer.values);
  const visible = useSelector(
    (state) => state.limitOrderReducer.updatePopupVisible,
  );
  const clientData = useSelector((state) => state.walletReducer.clientData);
  const updateLimitOrderPrice = useSelector(
    (state) => state.tonContext.functions.updateLimitOrderPrice,
  );
  const transferLimitOrder = useSelector(
    (state) => state.tonContext.functions.transferLimitOrder,
  );

  const { errors, handleBlur, handleChange, handleSubmit, values } = useFormik({
    enableReinitialize: true,
    initialValues: {
      newAddress: clientData ? clientData.address : '',
      newPrice: initialValues ? initialValues.toPrice : '',
    },
    onSubmit: handleConfirm,
    validate,
  });

  const { enqueueSnackbar } = useSnackbar();

  async function validate({ newAddress, newPrice }) {
    const errors = {};

    if (newPrice <= 0) errors.newPrice = NOT_POSITIVE;
    else if (newAddress.length !== 66)
      errors.newAddress = ADDRESS_INCORRECT_LENGTH;
    else if (
      newPrice === initialValues.toPrice &&
      newAddress === clientData.address
    )
      errors.common = NO_CHANGE;

    return errors;
  }

  async function handleClose() {
    dispatch(resetLimitOrderPopupValues());
    dispatch(closeLimitOrderUpdatePopup());
  }

  async function handleConfirm() {
    const { addrOrder, fromToken, toPrice, toToken } = initialValues;

    dispatch(resetLimitOrderPopupValues());
    dispatch(closeLimitOrderUpdatePopup());
    dispatch(
      setWaitingPopupValues({
        hidable: true,
        text: `Updating limit order ${truncateNum(fromValue)} ${
          fromToken.symbol
        } for ${truncateNum(toValue)} ${toToken.symbol}`,
        title: 'Sending message to blockchain',
      }),
    );

    const processes = [];

    if (values.newPrice !== toPrice) {
      const changePriceProcess = updateLimitOrderPrice({
        addrOrder: addrOrder,
        newPrice: values.newPrice,
      }).then((r) => r.changePriceStatus);

      processes.push(changePriceProcess);
    }

    if (values.newAddress !== clientData.address) {
      const transferProcess = transferLimitOrder({
        addrOrder,
        newOwnerAddress: values.newAddress,
        walletOwnerFrom: fromToken.walletAddress,
        walletOwnerTo: toToken.walletAddress,
      }).then((r) => r.transferLimitOrderStatus);

      processes.push(transferProcess);
    }

    const result = await Promise.all(processes);

    if (result.every((s) => s))
      enqueueSnackbar({
        message: `Updating limit order ${fromToken.symbol} - ${toToken.symbol} ⏳`,
        type: 'info',
      });
    else
      enqueueSnackbar({
        message: `Failed to update limit order ${fromToken.symbol} - ${toToken.symbol}`,
        type: 'error',
      });

    dispatch(resetWaitingPopupValues());
  }

  if (!visible || !initialValues) return null;

  const { fromToken, fromValue, toPrice, toToken, toValue } = initialValues;

  return (
    <div className="popup-wrapper">
      <MainBlock
        class={classes['reset-fixed']}
        button={
          <button onClick={handleClose} className={classes.btn}>
            <IconCross
              fill="none"
              className={cls('close', classes.btn__icon)}
            />
          </button>
        }
        title="Update Limit Order"
        helperText={errors.common}
        error={errors.common}
        content={
          <form onSubmit={handleSubmit}>
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
            <div
              className={cls(
                'recipient_wrapper',
                errors.newPrice && 'amount_wrapper_error',
              )}
              style={{
                height: 100,
                marginTop: 25,
                padding: 15,
              }}
            >
              <div className="send_text_headers">New price</div>
              <div className="send_inputs">
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.newPrice}
                  name="newPrice"
                  className="recipient_input"
                  placeholder="0"
                  style={{ marginTop: 0 }}
                  type="number"
                />
              </div>
            </div>
            {errors.newPrice && (
              <FormHelperText error>{errors.newPrice}</FormHelperText>
            )}
            <div
              className={cls(
                'recipient_wrapper',
                errors.newAddress && 'amount_wrapper_error',
              )}
              style={{
                height: 100,
                marginTop: 25,
                padding: 15,
              }}
            >
              <div className="send_text_headers">New owner</div>
              <div className="send_inputs">
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.newAddress}
                  name="newAddress"
                  className="recipient_input"
                  placeholder="0:..."
                  style={{ marginTop: 0 }}
                />
              </div>
            </div>
            {errors.newAddress && (
              <FormHelperText error>{errors.newAddress}</FormHelperText>
            )}
            <button type="submit" className={cls('btn popup-btn')}>
              Update Order
            </button>
          </form>
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
                  {UPDATE_LIMIT_ORDER} EVER
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
