import './NativeLogin.scss';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { connectWallet } from '../../store/actions/app';

function NativeLogin() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = async () => {
    dispatch(connectWallet());

    history.push('/account');
  };

  return (
    <div className="container">
      <div className="mainblock">
        <div className="mainblock-title">Login</div>
        {/*{(!walletIsConnected && wallet) ?*/}
        <button className="btn wallet-btn" onClick={handleClick}>
          Login using Seed phrase
        </button>
        <button className="btn wallet-btn" onClick={handleClick}>
          Create a new Seed Phrase and Wallet
        </button>
      </div>
    </div>
  );
}

export default NativeLogin;
