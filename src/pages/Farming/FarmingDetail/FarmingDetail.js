import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import AlertNoLP from './components/AlertNoLP/AlertNoLP';
import DepositCard from './components/DepositCard/DepositCard';
import WithdrawCard from './components/WithdrawCard/WithdrawCard';
import FarmingPanel from './components/FarmingPanel/FarmingPanel';
import FarmingPanelCompact from './components/FarmingPanelCompact/FarmingPanelCompact';
import Charts from './components/Charts/Charts';
import FarmingSpeedTable from './components/FarmingSpeedTable/FarmingSpeedTable';
import VestingCard from './components/VestingCard/VestingCard';
import AddressesCard from './components/AddressesCard/AddressesCard';
import { iconGenerator } from '@/iconGenerator';

import data from '../data/data';

const styles = {
  main: {
    fontSize: '1rem',
    '& h2': {
      m: 1,
    },
  },
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: 'var(--mainblock-bg-color)',
    border: '1px solid var(--mainblock-border-color)',
    boxShadow: 1,
    borderRadius: 2,
    p: 2,
    mb: 2,
    textAlign: 'left',
    '& h4': {
      m: 0,
    },
    '& .MuiIconButton-root': {
      color: 'inherit',
    },
  },
};

export default function FarmingDetail(props) {
  //const [info, setInfo] = React.useState(data[props.match.params.id]);
  const info = data[props.match.params.id];

  return (
    <React.Fragment>
      <Container sx={styles.main} maxWidth="lg">
        <Grid pt={0} pb={0}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar
              alt={info.tokens[0].name}
              src={iconGenerator(info.tokens[0].name)}
              sx={{
                width: 40,
                height: 40,
                marginLeft: 0,
                marginRight: 0,
                zIndex: 1,
              }}
            />
            <Avatar
              alt={info.tokens[1].name}
              src={iconGenerator(info.tokens[1].name)}
              sx={{
                width: 40,
                height: 40,
                marginLeft: -2,
                marginRight: 2,
              }}
            />
            <Box>
              <Box fontSize={'2rem'}>
                <b>{`${info.tokens[0].name}/${info.tokens[1].name} farming pool`}</b>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ ml: 1 }}>69.33%</Box>
                <Box sx={{ ml: 1 }}>(Dec 31, 2021, 03:00)</Box>
                <Chip
                  sx={{ ml: 1 }}
                  label="active"
                  size="small"
                  color="success"
                />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid pt={2}>{/* <AlertNoLP /> */}</Grid>
        <Grid pt={2}>
          <h2 sx={styles.h2}>Farming balance</h2>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Box sx={styles.card}>
              <DepositCard />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box sx={styles.card}>
              <WithdrawCard />
            </Box>
          </Grid>
        </Grid>
        <Grid pt={2}>
          <h2 sx={styles.h2}>Farming pool statistics</h2>
        </Grid>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            order={{ xs: 2, sm: 2, md: 1, lg: 1 }}
          >
            <Grid>
              <Box sx={styles.card}>
                <FarmingPanel
                  token0={info.tokens[0].name}
                  token1={info.tokens[1].name}
                />
              </Box>
            </Grid>
            <Grid>
              <Box sx={styles.card}>
                <FarmingPanelCompact label={'APR'} value={'118.51%'} />
              </Box>
            </Grid>
            <Grid>
              <Box sx={styles.card}>
                <FarmingPanelCompact
                  label={'Remaining reward balance'}
                  value={'4 222 183.171935002 WTON'}
                  token={info.tokens[0].name}
                />
              </Box>
            </Grid>
            <Grid>
              <Box sx={styles.card}>
                <FarmingPanelCompact
                  label={'Farming speed, sec'}
                  value={'0.85 WTON'}
                  token={info.tokens[0].name}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            order={{ xs: 1, sm: 1, md: 2, lg: 2 }}
          >
            <Grid>
              <Box sx={styles.card}>
                <Charts />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid pt={2}>
          <h2 sx={styles.h2}>Farming speed changes</h2>
        </Grid>
        <Grid>
          <Box sx={styles.card}>
            <FarmingSpeedTable token={info.tokens[0].name} />
          </Box>
        </Grid>
        <Grid pt={2}>
          <h2>Details</h2>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Box sx={styles.card}>
              <VestingCard />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box sx={styles.card}>
              <AddressesCard />
            </Box>
          </Grid>
        </Grid>
        <Grid height={50}></Grid>
      </Container>
    </React.Fragment>
  );
}
