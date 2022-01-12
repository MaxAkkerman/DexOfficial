import './EnterSeedPhrase.scss';

import { Autocomplete, Grid, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getMnemonics } from '../../reactUtils/reactUtils';

const mnemonicWordsA = () => getMnemonics();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({});

function SeedItem(props) {
  const globalTheme = useSelector((state) => state.appReducer.appTheme);
  const mnemonicWords = useMemo(() => mnemonicWordsA(), []);

  return (
    <>
      {props.seedPhrase.map((item, n) => (
        <Grid item key={n}>
          <ThemeProvider
            theme={globalTheme === 'dark' ? darkTheme : lightTheme}
          >
            <Autocomplete
              id={item.id}
              key={item.id}
              // onOpen={()=>setOpen(true)}
              // onClose={()=>setOpen(false)}
              // open={open}
              label={item.label}
              options={mnemonicWords}
              value={item.seed}
              onChange={(event, newValue) =>
                props.handleChangeSeed(event, newValue)
              }
              sx={{ width: 160 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={item.onSeedError}
                  label={item.label}
                />
              )}
            />
          </ThemeProvider>
        </Grid>
      ))}
    </>
  );
}

export default React.memo(SeedItem);
