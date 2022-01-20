import * as React from 'react';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const styles = {
  main: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {},
  address: { display: 'flex', alignItems: 'center' },
};

const adresses = [
  {
    label: 'Farming pool contract address',
    adrress: '0:29d6...fe05',
  },
  {
    label: 'Owner address',
    adrress: '0:674c...6fdb',
  },
  {
    label: 'My farming address',
    adrress: '0:6b5b...f49a',
  },
  {
    label: 'Farming token root',
    adrress: '0:53c8...7434',
  },
  {
    label: 'Reward token root, WTON',
    adrress: '0:0ee3...eb37',
  },
];

export default function AddressesCard(props) {
  return (
    <>
      <h4>Addresses</h4>
      {adresses.map((e, i) => (
        <Box key={i} sx={styles.main}>
          <Box sx={styles.label}>{e.label}</Box>
          <Box sx={styles.address}>
            <b>{e.adrress}</b>
            <IconButton aria-label="copy">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}
    </>
  );
}
