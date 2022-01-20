import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { styled } from '@mui/system';

import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

const Tab = styled(TabUnstyled)`
  color: inherit;
  cursor: pointer;
  font-size: inherit;
  background-color: transparent;
  padding: 5px 5px;
  margin: 15px 5px;
  display: flex;
  justify-content: center;

  &:hover {
    color: var(--accent-hover);
  }

  &.${tabUnstyledClasses.selected} {
    border-bottom: 2px solid var(--accent);
    color: var(--accent);
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  height: 100%;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const styles = {
  tabHeader: {
    height: '20px',
    textTransform: 'none',
    p: '5px 5px 0px 5px',
  },
  tab: {
    p: 0,
    mt: '8px',
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

  button: {
    height: '40px',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    padding: '10px 10px',
    borderRadius: '5px',
  },
};

export default function WithdrawCard() {
  return (
    <>
      <h4>Withdraw</h4>
      <TabsUnstyled defaultValue={0}>
        <TabsList>
          <Tab>Claim reward</Tab>
          <Tab>Withdraw LP tokens</Tab>
        </TabsList>
        <TabPanel value={0}>
          <Stack spacing={2} direction="row">
            <TextField
              sx={styles.input}
              color="primary"
              helperText=""
              id="outlined-basic"
              label="0 WTON"
              variant="outlined"
              size="small"
            />
            <button style={styles.button}>Claim</button>
          </Stack>
        </TabPanel>
        <TabPanel value={1}>
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
            <button style={styles.button}>Withdraw</button>
          </Stack>
        </TabPanel>
      </TabsUnstyled>
    </>
  );
}
