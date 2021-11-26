import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import PercentageTextField from "../../components/PercentageTextField/PercentageTextField";
import classNames from "./SlippagePopper.module.scss";
import cls from "classnames";
import "./SlippagePopper.scss";
import {setSlippageValue} from "../../store/actions/swap";
import {useDispatch, useSelector} from "react-redux";

export default function SlippagePopper({slippageState, popperState}) {
	const dispatch = useDispatch();

	const {slippage, setSlippage} = slippageState;
	const slippageValue = useSelector((state) => state.swapReducer.slippageValue);

	const {id, open, anchorEl} = popperState;

	function handleSetSlippage(e) {
		const newValue = Number(e.target.value.replace("%", ""));
		setSlippage(newValue);
		dispatch(setSlippageValue(newValue));
	}

	return (
		<Popper
			id={id}
			open={open}
			anchorEl={anchorEl}
			placement="bottom-start"
			style={{zIndex: 1}}
		>
			<Paper variant="outlined" classes={{root: classNames.container}}>
				<div className={"SlippagePopper_container"}>
					<div className={"SlippagePopper_slippage_container"}>
						<div
							className={cls("SlippagePopper_slippage_text", classNames.title)}
						>
							Slippage tolerance:
						</div>
						<PercentageTextField
							placeholder="2%"
							value={slippageValue}
							onChange={handleSetSlippage}
							sx={{maxWidth: "165px", maxHeight: "45px"}}
						/>
					</div>
					<Box sx={{maxWidth: "236px"}} className={classNames.paragraph}>
						Your transaction will revert if the price changes unfavorably by
						more than this percentage
					</Box>
				</div>
			</Paper>
		</Popper>
	);
}
