import './Pool.scss';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import LiquidityItem from '../../components/LiquidityItem/LiquidityItem';
import MainBlock from '../../components/MainBlock/MainBlock';

function Pool() {
  const history = useHistory();

  const walletIsConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );
  const liquidityList = useSelector(
    (state) => state.walletReducer.liquidityList,
  );

  return (
    <div className="container">
      <MainBlock
        class={'pool'}
        title={'Your liquidity'}
        button={
          <Link
            to="/create-pair"
            className="btn liquidity-btn"
            style={{ fontSize: '20px', borderRadius: '12px' }}
          >
            Create Pair
          </Link>
        }
        content={
          !walletIsConnected ? (
            <button
              className="btn mainblock-btn"
              onClick={() => history.push('/account')}
            >
              Connect wallet
            </button>
          ) : (
            <div className="pool-wrapper">
              {!liquidityList.length
                ? 'You don’t have liquidity pairs yet'
                : liquidityList.map((i) => (
                    <LiquidityItem
                      symbol={i.symbol}
                      balance={i.balance}
                      key={i.walletAddress}
                    />
                  ))}
            </div>
          )
        }
      />
    </div>
  );
}

export default Pool;
