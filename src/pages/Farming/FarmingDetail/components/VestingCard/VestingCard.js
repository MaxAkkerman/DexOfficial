import * as React from 'react';
import { Box } from '@mui/system';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const styles = {
  main: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    //opacity: '0.8',
  },
};

const data = [
  {
    label: 'Vesting ratio',
    value: '100%',
    info: 'Vesting ratio to the percentage',
  },
  {
    label: 'Vesting period',
    value: '120 days',
    info: 'Vesting ratio to the percentage',
  },
  {
    label: 'Vesting end date, UTC',
    value: '-',
    info: 'Vesting ratio to the percentage',
  },
];

export default function VestingCard(props) {
  return (
    <>
      <h4>Vesting</h4>
      {data.map((e, i) => (
        <Box key={i} sx={styles.main}>
          <Box sx={styles.label}>
            {e.label}
            <Tooltip title={e.info} placement="top-start">
              <IconButton aria-label="info">
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box>
            <b>{e.value}</b>
          </Box>
        </Box>
      ))}
    </>
  );
}
