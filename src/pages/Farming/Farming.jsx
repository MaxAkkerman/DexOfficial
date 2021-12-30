import { ArrowDropDown } from '@material-ui/icons';
import { ArrowDropUp } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import cls from 'classnames';
import React from 'react';

import Button from '@/components-v2/Button';
import SearchInput from '@/components-v2/SearchInput';
import { Card } from '@/pages/Farming/Card/Card';

import styles from './Farming.module.scss';

export function Farming() {
  const [searchWord, setSearchWord] = React.useState(``);

  const data = [
    {
      apr: 240,
      apr_increase: 4,

      tokens: [
        {
          name: 'WEVER',
        },
        { name: 'USDT' },
      ],
      tvl: 27194719,
      tvl_increase: 4,
      earned: false,
    },
    {
      apr: 115,
      apr_increase: -10,

      tokens: [
        {
          name: 'WEVER',
        },
        { name: 'USDC' },
      ],
      tvl: 12909898,
      tvl_increase: 7,
      earned: false,
    },
    {
      apr: 97,
      apr_increase: 2,

      tokens: [
        {
          name: 'WEVER',
        },
        { name: 'WBTC' },
      ],
      tvl: 1598718,
      tvl_increase: 8,
      earned: 45,
    },
    {
      apr: 120,
      apr_increase: 1,

      tokens: [
        {
          name: 'WEVER',
        },
        { name: 'WETH' },
      ],
      tvl: 109909,
      tvl_increase: 1,
      earned: 900,
    },
  ];

  const [liquiditySort, setLiquiditySort] = React.useState(false);
  const [aprSort, setAprSort] = React.useState(false);
  function tvlSortFunc(a, b) {
    if (a.tvl > b.tvl) return liquiditySort ? 1 : -1;
    if (a.tvl < b.tvl) return liquiditySort ? -1 : 1;
  }

  function aprSortFunc(a, b) {
    if (a.apr > b.apr) return aprSort ? 1 : -1;
    if (a.apr < b.apr) return aprSort ? -1 : 1;
  }

  return (
    <div className="container">
      <div className={styles.Farming}>
        <div className={styles.Farming__pools}>
          <h2 className={styles.Farming__pools_text}>Farming pools</h2>
          <Button
            className={cls('liquidity-btn', styles.Farming__pools_btn)}
            disabled={true}
          >
            Create farm pool
          </Button>
        </div>
        <div className={styles.Farming__search_bar}>
          <input
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder={'Search'}
          />
        </div>
        <div className={styles.Farming__table_header}>
          <div className={styles.Farming__table_header_tvl}>
            Liquidity (TVL)
            {/*{liquiditySort === true && (*/}
            {/*  <ArrowDropUp*/}
            {/*    color={'primary'}*/}
            {/*    onClick={() => setLiquiditySort(!liquiditySort)}*/}
            {/*  />*/}
            {/*)}*/}
            {/*{liquiditySort === false && (*/}
            {/*  <ArrowDropDown*/}
            {/*    color={'primary'}*/}
            {/*    onClick={() => setLiquiditySort(!liquiditySort)}*/}
            {/*  />*/}
            {/*)}*/}
          </div>
          <div className={styles.Farming__table_header_apr}>
            APR
            {aprSort === true && (
              <ArrowDropUp
                color={'primary'}
                onClick={() => setAprSort(!aprSort)}
              />
            )}
            {aprSort === false && (
              <ArrowDropDown
                color={'primary'}
                onClick={() => setAprSort(!aprSort)}
              />
            )}
          </div>
          <div className={styles.Farming__table_header_earned}>Earned</div>
        </div>
        <div className={styles.Farming__table}>
          {data
            .filter((el) => {
              let firstToken = el.tokens[0].name.toString();
              let secondToken = el.tokens[1].name.toString();
              return (
                firstToken
                  .toLowerCase()
                  .includes(searchWord.toString().toLowerCase()) ||
                secondToken
                  .toLowerCase()
                  .includes(searchWord.toString().toLowerCase())
              );
            })
            .sort(aprSortFunc)
            .map((e, i) => {
              return <Card key={i} pool={e} />;
            })}
        </div>
      </div>
    </div>
  );
}
