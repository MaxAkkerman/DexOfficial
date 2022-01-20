import * as React from 'react';
import { Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import { iconGenerator } from '@/iconGenerator';

const styles = {
  label: {
    //opacity: '0.8',
    mb: 1,
  },
  value: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  token: {
    width: 24,
    height: 24,
    marginRight: 1,
  },
};

export default function FarmingPanelCompact(props) {
  return (
    <>
      <Box sx={styles.label}>{props.label}</Box>
      <Box sx={styles.value}>
        {props.token ? (
          <Avatar
            alt={props.token}
            src={iconGenerator(props.token)}
            sx={styles.token}
          />
        ) : (
          <b></b>
        )}
        <b>{props.value}</b>
      </Box>
    </>
  );
}
