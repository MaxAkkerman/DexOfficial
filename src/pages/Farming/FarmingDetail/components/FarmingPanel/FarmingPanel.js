import * as React from 'react';
import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import { iconGenerator } from '@/iconGenerator';

const styles = {
  label: {
    //fonSize: '1rem',
    //opacity: '0.8',
    mb: 0.5,
  },
  value: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 1,
  },
  tokens: {
    width: 24,
    height: 24,
    marginRight: 1,
  },
};

export default function FarmingPanel(props) {
  return (
    <>
      <Box sx={styles.label}>TVL:</Box>
      <Box sx={styles.value}>
        <b></b>
        <b>$8 225 260.0649</b>
      </Box>
      <Box sx={styles.label}>LP token(LP-WTON/USDT):</Box>
      <Box sx={styles.value}>
        <b></b>
        <b>9 281 761.77600921</b>
      </Box>
      <Box sx={styles.label}>LP breakdown, tokens:</Box>
      <Box sx={styles.value}>
        <Avatar
          alt={props.token0}
          src={iconGenerator(props.token0)}
          sx={styles.tokens}
        />
        <b>11 309 858.187251908976 WTON</b>
      </Box>
      <Box sx={styles.value}>
        <Avatar
          alt={props.token1}
          src={iconGenerator(props.token1)}
          sx={styles.tokens}
        />
        <b>4 112 630.0324225 USDT</b>
      </Box>
    </>
  );
}
