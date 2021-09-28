import { useState } from "react";
import { Box, Divider, Stack, Typography, Collapse, SvgIcon, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import cls from "classnames";

import SvgWTon from "../../images/tokens/tonNew.svg";
import SvgWEth from "../../images/tokens/wETH.svg";
import SvgUsdt from "../../images/tokens/wUSDT.svg";
import SvgWBtc from "../../images/tokens/wBTC.svg";
import SvgCross from "!@svgr/webpack!../../images/icons/crossNew.svg";
import SvgCopy from "!@svgr/webpack!../../images/icons/copyNew.svg";

import classes from "./AssetsListOrderItem.module.scss";

const SYMBOL_ICON_MAP = {
	"WTON": SvgWTon,
	"WETH": SvgWEth,
	"USDT": SvgUsdt,
	"WBTC": SvgWBtc,
};


export default function AssetsListOrderItem({
	orderAsset,
}) {
	const {
		addrPair,
		amount,
		price,
		directionPair,
	} = orderAsset;

	const pairList = useSelector(state => state.walletReducer.pairsList);
	const pair = pairList.find(pairItem => pairItem.pairAddress === addrPair);

	let {
		symbolA,
		symbolB,
	} = pair;

	if (directionPair === "5")
		[symbolA, symbolB] = [symbolB, symbolA];

	const iconA = SYMBOL_ICON_MAP[symbolA];
	const iconB = SYMBOL_ICON_MAP[symbolB];

	const appTheme = useSelector(state => state.appReducer.appTheme);

	const [open, setOpen] = useState(false);

	const CrossIcon = (props) =>
		<SvgIcon component={SvgCross} viewBox="0 0 12 12" {...props} />;

	const CopyIcon = (props) =>
		<SvgIcon component={SvgCopy} viewBox="0 0 14 14" {...props} />;

	return (
		<Box
			className={classes.wrapper}
			onClick={() => setOpen(!open)}
		>
			<Stack
				direction="row"
				className={classes.container}
			>
				<Box>
					<img src={iconA} alt={symbolA} className={cls(classes.icon, classes.icon_first)} />
					<img src={iconB} alt={symbolB} className={classes.icon} />
				</Box>
				<Stack alignItems="flex-start" className={classes.content}>
					<Typography
						className={classes.header}
						component="h2"
					>
						{symbolA} - {symbolB}
					</Typography>
					<Typography className={classes.subheader} component="span">Limit order</Typography>
				</Stack>
				<Typography
					component="span"
					className={classes.amount}
				>
					{amount} {symbolA}
				</Typography>
			</Stack>
			<Collapse in={open}>
				<Stack
					direction="row"
					className={cls(classes.container, classes.container_second)}
				>
					<Stack
						direction="flow"
						alignItems="flex-start"
					>
						<Tooltip title="Delete order">
							<button className={cls(classes.btn, classes.btn_first)}>
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
						<Typography
							component="span"
							className={classes.header}
						>
							{price} {symbolB}
						</Typography>
						<Typography
							className={classes.subheader}
							component="span"
						>Price</Typography>
					</Stack>
					<Typography
						component="span"
						className={classes.amount}
					>
						{amount * price} {symbolB}
					</Typography>
				</Stack>
			</Collapse>
		</Box>
	)
}