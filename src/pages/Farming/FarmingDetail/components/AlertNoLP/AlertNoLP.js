import * as React from 'react';
import { Box } from '@mui/system';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function AlertNoLP(props) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert
        onClose={() => {}}
        icon={false}
        severity="info"
        sx={{
          '& .MuiAlert-root': {
            width: '100%',
            justifyContent: 'space-between',
          },
          '& .MuiAlert-action': {
            textAlign: 'end',
            m: 0,
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <b>
              You dont have the required LP tokens. Get them now to start
              farming at 114.24% APR
            </b>
            <p>This pool accepts TONSWAP-LP-WTON-USDC tokens.</p>
            <span>
              Deposit your WTON and USDC to the liquidity pool and get LP tokens
              to start farming.
            </span>
          </Box>
          <Box
            sx={{
              justifyContent: 'flex-end',
            }}
          >
            <Button variant="outlined">See Guide</Button>
            <Button variant="contained">Get LP Tokens</Button>
          </Box>
        </Box>
      </Alert>
    </Stack>
  );
}
