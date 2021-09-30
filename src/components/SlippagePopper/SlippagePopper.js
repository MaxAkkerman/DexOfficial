import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PercentageTextField from "../../components/PercentageTextField/PercentageTextField";
import classNames from "./SlippagePopper.module.scss";

export default function SlippagePopper({slippageState, popperState}) {
	const {slippage, setSlippage} = slippageState;

	const {id, open, anchorEl} = popperState;

	function handleSetSlippage(e) {
		const newValue = Number(e.target.value.replace("%", ""));
		setSlippage(newValue);
	}

	return (
		<Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
			<Paper variant="outlined" classes={{root: classNames.container}}>
				<Stack spacing={2} direction={"row"} sx={{alignItems: "center"}}>
					<Stack spacing={1}>
						<Typography>Slippage tolerance:</Typography>
						<PercentageTextField
							placeholder="0.10%"
							value={slippage}
							onChange={handleSetSlippage}
							sx={{maxWidth: "165px", maxHeight: "45px"}}
						/>
					</Stack>
					<Box sx={{maxWidth: "256px"}}>
						Your transaction will revert if the price changes unfavorably by
						more than this percentage
					</Box>
				</Stack>
			</Paper>
		</Popper>
	);
}
