import { Box, Grid } from '@material-ui/core';
import React from 'react';

export function NextBtn(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '40px',
      }}
    >
      <Grid container className={'enterSPRegBox'} spacing={2}>
        <button
          style={{
            height: '57px',
            fontSize: '20px',
            padding: '16px 20px',
            borderRadius: '18px',
            width: '100%',
          }}
          onClick={() => props.handleClickNext()}
          className="btn wallet-btn"
        >
          {props.btnText}
        </button>
      </Grid>
    </Box>
  );
}
