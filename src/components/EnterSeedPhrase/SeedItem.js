import './EnterSeedPhrase.scss';

import styled from '@emotion/styled';
import { Autocomplete, Grid, TextField } from '@material-ui/core';
import React, { useMemo, useState } from 'react';

import { getMnemonics } from '../../reactUtils/reactUtils';

const mnemonicWordsA = () => getMnemonics();

function SeedItem(props) {
  console.log('SeedItem rerendered blyat');
  const mnemonicWords = useMemo(() => mnemonicWordsA(), []);

  const CssTextField = React.memo(
    styled(TextField)({
      '& .MuiOutlinedInput-input': {
        color: 'var(--primary-color)',
      },
    }),
  );
  // const [open,setOpen] = useState(false)
  return (
    <>
      {props.seedPhrase.map((item) => (
        <Grid item>
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
              <CssTextField
                {...params}
                error={item.onSeedError}
                label={item.label}
              />
            )}
          />
        </Grid>
      ))}
    </>
  );
}

export default React.memo(SeedItem);
