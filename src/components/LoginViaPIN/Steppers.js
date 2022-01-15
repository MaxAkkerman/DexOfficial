import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export default function Steppers({ lastStep, step }) {
  return (
    <Box
      sx={{
        color: `var(--mainblock-title-color)`,
        display: 'flex',
        justifyContent: 'center',
        marginTop: `${
          step === '1' ? '12vh' : step === lastStep ? '14.85vh' : '14vh'
        }`,
      }}
    >
      {step ? `Step ${step}/${lastStep}` : ''}
    </Box>
  );
}

Steppers.propTypes = {
  lastStep: PropTypes.string,
  step: PropTypes.string.isRequired,
};

Steppers.defaultProps = {
  lastStep: '3',
};
