import {useState} from "react";
import {
	Box,
	Stack,
	Typography,
	Collapse,
	SvgIcon,
	Tooltip,
} from "@mui/material";
import cls from "classnames";

import SvgWTon from "../../images/tokens/TON.svg";
import SvgWEth from "../../images/tokens/wETH.svg";
import SvgUsdt from "../../images/tokens/wUSDT.svg";
import SvgWBtc from "../../images/tokens/wBTC.svg";
import SvgCross from "!@svgr/webpack!../../images/icons/crossNew.svg";
import SvgCopy from "!@svgr/webpack!../../images/icons/copyNew.svg";

import classes from "./AssetsListOrderItem.module.scss";
import {B_A_DIRECTION} from "../../constants/runtimeVariables";
import cancelLimitOrder from "../../utils/cancelLimitOrder";
import useKeyPair from "../../hooks/useKeyPair";
import {useSelector} from "react-redux";
import {useSnackbar} from "notistack";

const SYMBOL_ICON_MAP = {
	WTON: SvgWTon,
	WETH: SvgWEth,
	USDT: SvgUsdt,
	WBTC: SvgWBtc,
};

export default function AssetsListOrderItem({order, pair}) {
	const {amount, price, directionPair, id} = order;
	let {symbolA, symbolB} = pair;

	if (directionPair === B_A_DIRECTION) [symbolA, symbolB] = [symbolB, symbolA];

	const iconA = SYMBOL_ICON_MAP[symbolA];
	const iconB = SYMBOL_ICON_MAP[symbolB];

	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(false);

	const CrossIcon = (props) => (
		<SvgIcon component={SvgCross} viewBox="0 0 12 12" {...props} />
	);

	const CopyIcon = (props) => (
		<SvgIcon component={SvgCopy} viewBox="0 0 14 14" {...props} />
	);

	const {keyPair} = useKeyPair();
	const clientData = useSelector((state) => state.walletReducer.clientData);
	const {enqueueSnackbar} = useSnackbar();

	async function handleOrderCancel(e) {
		e.stopPropagation();

		setDisabled(true);

		const {cancelOrderStatus} = await cancelLimitOrder(id, {
			clientAddress: clientData.address,
			clientKeyPair: keyPair,
		});

		if (cancelOrderStatus) {
			enqueueSnackbar({
				type: "info",
				message: `Canceling limit order with ${amount} ${symbolA} for ${
					amount * price
				} ${symbolB} ⏳`,
			});
		} else {
			enqueueSnackbar({
				type: "error",
				message: `Failed to cancel limit order with ${amount} ${symbolA} for ${
					amount * price
				} ${symbolB}`,
			});

			setDisabled(false);
		}
	}

	return (
		<Box
			className={cls(classes.wrapper, disabled && classes.disabled)}
			onClick={() => setOpen(!open)}
		>
			<Stack direction="row" className={classes.container}>
				<Box>
					<img
						src={iconA}
						alt={symbolA}
						className={cls(classes.icon, classes.icon_first)}
					/>
					<img src={iconB} alt={symbolB} className={classes.icon} />
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
			<Collapse in={open}>
				<Stack
					direction="row"
					className={cls(classes.container, classes.container_second)}
				>
					<Stack direction="flow" alignItems="flex-start">
						<Tooltip title="Cancel order">
							<button
								className={cls(classes.btn, classes.btn_first)}
								onClick={handleOrderCancel}
							>
								<CrossIcon
									className={cls(classes.icon_close, classes.icon_white)}
								/>
							</button>
						</Tooltip>
						<Tooltip title="Update order">
							<button className={classes.btn} color="primary">
								<CopyIcon
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
	);
}
