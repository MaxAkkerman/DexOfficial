import { Box } from '@material-ui/core';
import React, { memo } from 'react';

function Steppers(props) {
  console.log(props.step);
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: `${
          props.step === '1' ? '217px' : props.step === '4' ? '211px' : '140px'
        }`,
      }}
    >
      Step {props.step}/4
    </Box>
  );
}
export default memo(Steppers);
