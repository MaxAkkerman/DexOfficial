import {Box, Collapse, Stack, Tooltip, Typography} from "@mui/material";
import cls from "classnames";
import {useState} from "react";
import {useDispatch} from "react-redux";

import {B_A_DIRECTION} from "../../constants/runtimeVariables";
import {iconGenerator} from "../../iconGenerator";
import {
	openOrderCancelPopup,
	openOrderUpdatePopup,
} from "../../store/actions/limitOrders";
import IconCross from "../IconCross/IconCross";
import IconEdit from "../IconEdit/IconEdit";
import classes from "./AssetsListOrderItem.module.scss";

function AssetsListOrderItem({order, pair}) {
	const {amount, price, directionPair, id} = order;

	let {symbolA, symbolB} = pair;

	if (directionPair === B_A_DIRECTION) [symbolA, symbolB] = [symbolB, symbolA];

	const dispatch = useDispatch();

	const [fold, setFold] = useState(false);

	async function handleCancel(e) {
		e.stopPropagation();

		dispatch(
			openOrderCancelPopup({
				order: {
					fromSymbol: symbolA,
					toSymbol: symbolB,
					fromValue: amount,
					toValue: amount * price,
					price,
					id,
				},
			}),
		);
	}

	async function handleUpdate(e) {
		e.stopPropagation();

		dispatch(
			openOrderUpdatePopup({
				order: {
					fromSymbol: symbolA,
					toSymbol: symbolB,
					fromValue: amount,
					toValue: amount * price,
					price,
					id,
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
							src={iconGenerator(symbolA)}
							alt={symbolA}
							className={cls(classes.icon, classes.icon_first)}
						/>
						<img
							src={iconGenerator(symbolB)}
							alt={symbolB}
							className={classes.icon}
						/>
					</Box>
					<Stack alignItems="flex-start" className={classes.content}>
						<Typography className={classes.header} component="h2">
							{symbolA} - {symbolB}
						</Typography>
						<Typography className={classes.subheader} component="span">
							Limit order
						</Typography>
					</Stack>
					<Typography component="span" className={classes.amount}>
						{amount} {symbolA}
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
									<IconCross
										className={cls(classes.icon_close, classes.icon_white)}
									/>
								</button>
							</Tooltip>
							<Tooltip title="Update order">
								<button className={classes.btn} onClick={handleUpdate}>
									<IconEdit
										className={cls(classes.icon_copy, classes.icon_white)}
									/>
								</button>
							</Tooltip>
						</Stack>
						<Stack alignItems="flex-start" className={classes.content}>
							<Typography component="span" className={classes.header}>
								{price} {symbolB}
							</Typography>
							<Typography className={classes.subheader} component="span">
								Price
							</Typography>
						</Stack>
						<Typography component="span" className={classes.amount}>
							{amount * price} {symbolB}
						</Typography>
					</Stack>
				</Collapse>
			</Box>
		</>
	);
}

export default AssetsListOrderItem;
