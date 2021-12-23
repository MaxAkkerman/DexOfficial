import { Box, Collapse, Stack, Tooltip, Typography } from '@mui/material';
import cls from 'classnames';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { BA_DIRECTION_GRAPHQL } from '../../constants/runtimeVariables';
import { iconGenerator } from '../../iconGenerator';
import {
  openOrderCancelPopup,
  openOrderUpdatePopup,
} from '../../store/actions/limitOrder';
import truncateNum from '../../utils/truncateNum';
import IconCross from '../IconCross/IconCross';
import IconEdit from '../IconEdit/IconEdit';
import classes from './AssetListOrderItem.module.scss';

export default function AssetListOrderItem({ limitOrder }) {
  const { addrOrder, amount, directionPair, pair, price } = limitOrder;
  let { aRoot, aSymbol, bRoot, bSymbol } = pair;
  if (directionPair === BA_DIRECTION_GRAPHQL)
    [aSymbol, bSymbol] = [bSymbol, aSymbol];

  const dispatch = useDispatch();
  const [fold, setFold] = useState(false);

  async function handleCancel(e) {
    e.stopPropagation();
    dispatch(
      openOrderCancelPopup({
        order: {
          addrOrder,
          fromSymbol: aSymbol,
          toSymbol: bSymbol,
          fromValue: amount,
          toValue: amount * price,
          price,
        },
      }),
    );
  }

  async function handleUpdate(e) {
    e.stopPropagation();
    dispatch(
      openOrderUpdatePopup({
        order: {
          addrOrder,
          fromSymbol: aSymbol,
          toSymbol: bSymbol,
          fromValue: amount,
          toValue: amount * price,
          fromRootAddr: aRoot,
          toRootAddr: bRoot,
          price,
        },
      }),
    );
  }

  return (
    <>
      <Box className={classes.wrapper} onClick={() => setFold(!fold)}>
        <Stack direction="row" className={classes.container}>
          <Box>
            <img
              src={iconGenerator(aSymbol)}
              alt={aSymbol}
              className={cls(classes.icon, classes.icon_first)}
            />
            <img
              src={iconGenerator(bSymbol)}
              alt={bSymbol}
              className={classes.icon}
            />
          </Box>
          <Stack alignItems="flex-start" className={classes.content}>
            <Typography className={classes.header} component="h2">
              {aSymbol} - {bSymbol}
            </Typography>
            <Typography className={classes.subheader} component="span">
              Limit order
            </Typography>
          </Stack>
          <Typography component="span" className={classes.amount}>
            {truncateNum(amount)} {aSymbol}
          </Typography>
        </Stack>
        <Collapse in={fold}>
          <Stack
            direction="row"
            className={cls(classes.container, classes.container_second)}
          >
            <Stack direction="flow" alignItems="flex-start">
              <Tooltip title="Cancel order">
                <button
                  className={cls(classes.btn, classes.btn_first)}
                  onClick={handleCancel}
                >
                  {/*<IconCross*/}
                  {/*	className={cls(classes.icon_close, classes.icon_white)}*/}
                  {/*/>*/}
                </button>
              </Tooltip>
              <Tooltip title="Update order">
                <button className={classes.btn} onClick={handleUpdate}>
                  {/*<IconEdit*/}
                  {/*	className={cls(classes.icon_copy, classes.icon_white)}*/}
                  {/*/>*/}
                </button>
              </Tooltip>
            </Stack>
            <Stack alignItems="flex-start" className={classes.content}>
              <Typography component="span" className={classes.header}>
                {truncateNum(price)} {bSymbol}
              </Typography>
              <Typography className={classes.subheader} component="span">
                Price
              </Typography>
            </Stack>
            <Typography component="span" className={classes.amount}>
              {truncateNum(amount * price)} {bSymbol}
            </Typography>
          </Stack>
        </Collapse>
      </Box>
    </>
  );
}
