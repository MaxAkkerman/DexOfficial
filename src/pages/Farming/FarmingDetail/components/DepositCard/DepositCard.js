import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const styles = {
  button: {
    height: '40px',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    padding: '10px 10px',
    borderRadius: '5px',
  },
  input: {
    width: '100%',
    '& .MuiInputBase-root': {
      paddingRight: '0px',
    },
    '& .MuiFormHelperText-root': {
      color: 'inherit',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'var(--input-border-color)',
      },
      '&:hover fieldset': {
        borderColor: 'var(--input-border-color)',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'var(--input-border-color)',
      },
    },
  },
};

export default function DepositCard(props) {
  return (
    <>
      <h4>Deposit</h4>
      <Box sx={{ mt: 2, mb: 3 }}>Deposit your LP tokens to start farming</Box>
      <Stack spacing={2} direction="row">
        <TextField
          sx={styles.input}
          helperText="Your wallet balance: 0 TONSWAP-LP-WTON-USDT"
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: <button style={styles.button}>MAX</button>,
          }}
        />
        <button style={styles.button}>Deposit</button>
      </Stack>
    </>
  );
}
