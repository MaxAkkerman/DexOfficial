import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PercentageTextField from "../../components/PercentageTextField/PercentageTextField";
import classNames from "./SlippagePopper.module.scss";
import cls from "classnames";
import "./SlippagePopper.scss";

export default function SlippagePopper({slippageState, popperState}) {
	const {slippage, setSlippage} = slippageState;

	const {id, open, anchorEl} = popperState;

	function handleSetSlippage(e) {
		const newValue = Number(e.target.value.replace("%", ""));
		setSlippage(newValue);
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
							value={slippage}
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
