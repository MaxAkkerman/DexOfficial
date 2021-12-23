import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';

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
      isAllowed={({ floatValue }) => floatValue <= 100}
      {...props}
    />
  );
}
