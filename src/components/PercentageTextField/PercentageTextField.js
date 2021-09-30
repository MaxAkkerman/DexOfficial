import NumberFormat from "react-number-format";
import {TextField} from "@material-ui/core";

export default function PercentageTextField(props) {
	return (
		<NumberFormat
			customInput={TextField}
			suffix="%"
			decimalScale={2}
			decimalSeparator="."
			fixedDecimalScale
			allowNegative={false}
			allowLeadingZeros={false}
			isAllowed={({floatValue}) => floatValue <= 100}
			{...props}
		/>
	);
}
