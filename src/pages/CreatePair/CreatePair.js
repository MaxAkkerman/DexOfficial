import { FormHelperText } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import BlockItem from '../../components/AmountBlock/AmountBlock';
import InputChange from '../../components/AmountBlock/InputChange';
import MaxBtn from '../../components/AmountBlock/MAXbtn';
import SelectTokenMenu from '../../components/AmountBlock/SelectTokenMenu';
import SetTokenBlock from '../../components/AmountBlock/SetTokenBlock';
import ShowBalance from '../../components/AmountBlock/ShowBalance';
import AssetsModalCreatePair from '../../components/AssetsModalCreatePair/AssetsModalCreatePair';
import CreatePairConfirmPopup from '../../components/CreatePairConfirmPopup/CreatePairConfirmPopup';
import MainBlock from '../../components/MainBlock/MainBlock';
import WaitingPopup from '../../components/WaitingPopup/WaitingPopup';
import {
  getPairAddress,
  getRootTokenAddress,
  getWalletAddress,
} from '../../extensions/sdk_get/get';
import {
  connectToPair,
  connectToPairStep2DeployWallets,
  createNewPair,
  getClientForConnect,
  processLiquidity,
} from '../../extensions/sdk_run/run';
import useKeyPair from '../../hooks/useKeyPair';
import { getFraction, getRootSymbol } from '../../reactUtils/reactUtils';
import { setTips } from '../../store/actions/app';
import { setPoolFromToken, setPoolToToken } from '../../store/actions/pool';

function CreatePair() {
  const history = useHistory();
  const dispatch = useDispatch();

  const walletIsConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );
  const fromToken = useSelector((state) => state.poolReducer.fromToken);
  const toToken = useSelector((state) => state.poolReducer.toToken);
  const tokenList = useSelector((state) => state.walletReducer.tokenList);
  const liquidityList = useSelector(
    (state) => state.walletReducer.liquidityList,
  );
  const tips = useSelector((state) => state.appReducer.tips);
  const clientData = useSelector((state) => state.walletReducer.clientData);

  const [newPairSymbol, setNewPairname] = useState('');

  const [tokenA, setTokenA] = useState({});
  const [tokenASetted, setTokenAsetted] = useState(false);

  const [tokenB, setTokenB] = useState({});
  const [tokenBSetted, setTokenBsetted] = useState(false);

  const [tokenAamount, setAamount] = useState(null);
  const [isInvalidAmountA, setisInvalidAmountA] = useState(false);

  const [tokenBamount, setBamount] = useState(null);
  const [isInvalidAmountB, setisInvalidAmountB] = useState(false);

  const [assetsList, setAssetsList] = useState([]);

  const [showAssetList, setshowAssetList] = useState(false);
  const [type, setType] = useState('');

  const [createPairConfirmPopupIsVisible, setcreatePairConfirmPopupIsVisible] =
    useState(false);

  const [createPairAsyncIsWaiting, setcreatePairAsyncIsWaiting] =
    useState(false);

  const { keyPair } = useKeyPair();

  useEffect(async () => {
    if (!tips || tips.length) return;
    if (tips.name === 'processLiquidityCallback') {
      if (fromToken.symbol || toToken.Symbol) {
        console.log('I am at chakeee');
        const fromTokenCopy = JSON.parse(JSON.stringify(fromToken));
        const toTokenCopy = JSON.parse(JSON.stringify(toToken));
        const newFromTokenData = tokenList.filter(
          (item) => item.symbol === fromTokenCopy.symbol,
        );
        const newToTokenData = tokenList.filter(
          (item) => item.symbol === toTokenCopy.symbol,
        );

        const fromTokenUpdatedBalance = {
          ...fromTokenCopy,
          balance: newFromTokenData[0].balance,
        };

        const toTokenUpdatedBalance = {
          ...toTokenCopy,
          balance: newToTokenData[0].balance,
        };
        dispatch(setPoolToToken(toTokenUpdatedBalance));
        dispatch(setPoolFromToken(fromTokenUpdatedBalance));
      }
    }
  }, [tokenList]);

  useEffect(() => {
    if (tokenBSetted) {
      const newPairSymbol = getRootSymbol(tokenA.symbol, tokenB.symbol);
      setNewPairname(newPairSymbol);
    }
  }, [tokenBSetted]);

  function handleConfirm() {
    if (
      isInvalidAmountA ||
      isInvalidAmountB ||
      tokenAamount === 0 ||
      tokenBamount === 0
    )
      return;
    if (clientData.balance < 25) {
      dispatch(
        setTips({
          message: `Insufficient balance, you need at least 25 Tons to create pair`,
          type: 'error',
        }),
      );
      return;
    }

    setcreatePairConfirmPopupIsVisible(true);
  }

  function handleSetToken(item, type) {
    if (type === 'typeA') {
      setTokenA(item);
      setTokenAsetted(true);
      setAamount(0);
    }
    if (type === 'typeB') {
      setTokenB(item);
      setTokenBsetted(true);
      setBamount(0);
    }
    setshowAssetList(false);
  }

  function setTokenAamount(am) {
    setAamount(am);
  }

  function setTokenBamount(am) {
    setBamount(am);
  }

  useEffect(() => {
    if (tokenBamount > tokenB.balance) {
      setisInvalidAmountB(true);
    } else {
      setisInvalidAmountB(false);
    }
  }, [tokenBamount]);

  useEffect(() => {
    if (tokenAamount > tokenA.balance) {
      setisInvalidAmountA(true);
    } else {
      setisInvalidAmountA(false);
    }
  }, [tokenAamount]);

  function handleSetMax(token, type) {
    type === 'typeA' ? setAamount(token.balance) : setBamount(token.balance);
  }

  useEffect(() => {
    const assetsList = [...tokenList, ...liquidityList];
    setAssetsList(assetsList);
  }, []);

  useEffect(() => {
    const assetsListCopy = JSON.parse(
      JSON.stringify([...tokenList, ...liquidityList]),
    );
    const newArr = assetsListCopy.filter(
      (item) => item.symbol !== tokenA.symbol,
    );
    setAssetsList(newArr);
  }, [tokenA]);

  function handleCloseAssetsListPopup() {
    setshowAssetList(false);
  }

  function handleshowAssetsList(type) {
    setshowAssetList(true);
    setType(type);
  }

  function handleSetCreatePairConfirmPopupIsVisible() {
    setcreatePairConfirmPopupIsVisible(false);
  }

  async function handleCreateNewPair() {
    setcreatePairConfirmPopupIsVisible(false);
    setcreatePairAsyncIsWaiting(true);
    const { rootABaddress, rootABsouint } = await getRootTokenAddress(
      keyPair.public,
      newPairSymbol,
      9,
    );
    const { pairAddress, pairSoArg } = await getPairAddress(
      keyPair.public,
      clientData.address,
      tokenA.rootAddress,
      tokenB.rootAddress,
      rootABaddress,
    );

    const souintConnectorTokenA = await getWalletAddress(
      keyPair.public,
      pairAddress,
      tokenA.rootAddress,
    );
    const souintConnectorTokenB = await getWalletAddress(
      keyPair.public,
      pairAddress,
      tokenB.rootAddress,
    );
    const res = await createNewPair(
      clientData.address,
      keyPair,
      newPairSymbol,
      tokenA.rootAddress,
      tokenB.rootAddress,
      pairSoArg,
      souintConnectorTokenA,
      souintConnectorTokenB,
      rootABsouint,
    );
    setTimeout(async () => {
      let connectRes = await connectToPair(pairAddress, keyPair);
      let getClientForConnectStatus = await getClientForConnect(
        connectRes,
        clientData.address,
      );

      let connectToRootsStatus = await connectToPairStep2DeployWallets(
        getClientForConnectStatus,
        keyPair,
      );

      setTimeout(async () => {
        let poolStatus = await processLiquidity(
          clientData.address,
          pairAddress,
          tokenAamount,
          tokenBamount,
          keyPair,
          tokenA,
          tokenB,
        );
        console.log('poolStatus', poolStatus);
      }, 35000);
    }, 15000);
    setcreatePairAsyncIsWaiting(false);
  }

  function handleClose() {
    setcreatePairConfirmPopupIsVisible(false);
    setcreatePairAsyncIsWaiting(false);
  }

  return (
    <div className="container">
      {!createPairAsyncIsWaiting && !createPairConfirmPopupIsVisible && (
        <MainBlock
          smallTitle={false}
          title={
            <Link to="/pool" className="pool-back">
              <svg
                width="12"
                height="19"
                viewBox="0 0 12 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9142 4.4108C11.6953 3.62975 11.6953 2.36342 10.9142 1.58237C10.1332 0.80132 8.86684 0.80132 8.08579 1.58237L10.9142 4.4108ZM2.5 9.99658L1.08579 8.58237C0.304738 9.36342 0.304738 10.6297 1.08579 11.4108L2.5 9.99658ZM8.08579 18.4108C8.86683 19.1918 10.1332 19.1918 10.9142 18.4108C11.6953 17.6297 11.6953 16.3634 10.9142 15.5824L8.08579 18.4108ZM8.08579 1.58237L1.08579 8.58237L3.91421 11.4108L10.9142 4.4108L8.08579 1.58237ZM1.08579 11.4108L8.08579 18.4108L10.9142 15.5824L3.91421 8.58237L1.08579 11.4108Z"
                  fill="white"
                />
              </svg>
              Create pair
            </Link>
          }
          content={
            <div>
              <BlockItem
                leftTitle={'Amount'}
                amount_left_block={'amount_left_blockFixedWidth'}
                // currentToken={currentToken}
                rightTopBlock={
                  <>
                    {tokenASetted ? (
                      <ShowBalance
                        classWrapper={'send_balance center'}
                        balance={tokenA.balance}
                        label={true}
                        showBal={true}
                      />
                    ) : null}
                  </>
                }
                rightBottomBlock={
                  <>
                    {tokenASetted ? (
                      <>
                        <div className="send_set_token_wrap column">
                          <MaxBtn
                            setMAX={() => handleSetMax(tokenA, 'typeA')}
                          />
                          <SetTokenBlock
                            handleTouchTokenModal={() =>
                              handleshowAssetsList('typeA')
                            }
                            // img={TON}
                            currentToken={tokenA}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="send_select_wrap ">
                        <SelectTokenMenu
                          handleTouchTokenModal2={() =>
                            handleshowAssetsList('typeA')
                          }
                        />
                      </div>
                    )}
                  </>
                }
                // enableMax={<MaxBtn />} />}
                leftBlockBottom={
                  <InputChange
                    amount={tokenAamount}
                    changeAmout={(am) => {
                      setTokenAamount(am);
                    }}
                  />
                }
                className={
                  isInvalidAmountA
                    ? 'amount_wrapper_error'
                    : 'amount_wrapper_success'
                }
              />

              {isInvalidAmountA ? (
                <FormHelperText
                  style={{
                    marginLeft: '27px',
                    marginTop: '4px',
                    height: '20px',
                  }}
                  error
                  id="component-error-text"
                >
                  {'Insufficient balance'}
                </FormHelperText>
              ) : (
                <div style={{ height: '24px' }} />
              )}

              <svg
                className="add-liquidity-plus"
                style={{ marginTop: '26px' }}
                width="45"
                height="46"
                viewBox="0 0 45 46"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.3324 42.0171L19.33 26.1694L3.48234 26.167C3.06611 26.1679 2.6538 26.0866 2.26908 25.9277C1.88435 25.7689 1.5348 25.5356 1.24048 25.2413C0.946162 24.947 0.712873 24.5974 0.554009 24.2127C0.395143 23.828 0.31383 23.4157 0.314741 22.9994C0.313831 22.5832 0.395143 22.1709 0.554008 21.7862C0.712873 21.4014 0.94616 21.0519 1.24048 20.7576C1.5348 20.4632 1.88435 20.23 2.26907 20.0711C2.6538 19.9122 3.06611 19.8309 3.48234 19.8318L19.33 19.8294L19.3324 3.98176C19.3315 3.56553 19.4128 3.15322 19.5717 2.7685C19.7305 2.38378 19.9638 2.03422 20.2581 1.7399C20.5525 1.44558 20.902 1.21229 21.2867 1.05343C21.6715 0.894565 22.0838 0.813252 22.5 0.814161C22.9162 0.813252 23.3285 0.894565 23.7133 1.05343C24.098 1.21229 24.4475 1.44558 24.7419 1.7399C25.0362 2.03422 25.2695 2.38378 25.4283 2.7685C25.5872 3.15322 25.6685 3.56553 25.6676 3.98176L25.67 19.8294L41.5177 19.8318C41.9339 19.8309 42.3462 19.9122 42.7309 20.0711C43.1156 20.23 43.4652 20.4632 43.7595 20.7576C44.0538 21.0519 44.2871 21.4014 44.446 21.7862C44.6049 22.1709 44.6862 22.5832 44.6853 22.9994C44.6862 23.4157 44.6049 23.828 44.446 24.2127C44.2871 24.5974 44.0538 24.947 43.7595 25.2413C43.4652 25.5356 43.1156 25.7689 42.7309 25.9277C42.3462 26.0866 41.9339 26.1679 41.5177 26.167L25.67 26.1694L25.6676 42.0171C25.6685 42.4333 25.5872 42.8456 25.4283 43.2303C25.2695 43.6151 25.0362 43.9646 24.7419 44.2589C24.4475 44.5533 24.098 44.7865 23.7133 44.9454C23.3285 45.1043 22.9162 45.1856 22.5 45.1847C22.0838 45.1856 21.6715 45.1043 21.2867 44.9454C20.902 44.7865 20.5525 44.5533 20.2581 44.2589C19.9638 43.9646 19.7305 43.6151 19.5717 43.2303C19.4128 42.8456 19.3315 42.4333 19.3324 42.0171Z"
                  fill="#41444E"
                />
              </svg>
              <BlockItem
                leftTitle={'Amount'}
                amount_left_block={'amount_left_blockFixedWidth'}
                // currentToken={currentToken}
                rightTopBlock={
                  <>
                    {tokenBSetted ? (
                      <ShowBalance
                        classWrapper={'send_balance center'}
                        balance={tokenB.balance}
                        label={true}
                        showBal={true}
                      />
                    ) : null}
                  </>
                }
                rightBottomBlock={
                  <>
                    {tokenBSetted ? (
                      <>
                        <div className="send_set_token_wrap column">
                          <MaxBtn
                            setMAX={() => handleSetMax(tokenB, 'typeB')}
                          />
                          <SetTokenBlock
                            handleTouchTokenModal={() =>
                              handleshowAssetsList('typeB')
                            }
                            // img={TON}
                            currentToken={tokenB}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="send_select_wrap">
                        <SelectTokenMenu
                          handleTouchTokenModal2={() =>
                            handleshowAssetsList('typeB')
                          }
                        />
                      </div>
                    )}
                  </>
                }
                // enableMax={<MaxBtn />} />}
                leftBlockBottom={
                  <InputChange
                    amount={tokenBamount}
                    changeAmout={(am) => {
                      setTokenBamount(am);
                    }}
                  />
                }
                className={
                  isInvalidAmountB
                    ? 'amount_wrapper_error'
                    : 'amount_wrapper_success'
                }
              />
              {isInvalidAmountB ? (
                <FormHelperText
                  style={{
                    marginLeft: '27px',
                    marginTop: '4px',
                    height: '20px',
                  }}
                  error
                  id="component-error-text"
                >
                  {'Insufficient balance'}
                </FormHelperText>
              ) : (
                <div style={{ height: '24px' }} />
              )}
              {/*        {tokenASetted && tokenBSetted && (*/}
              {/*            <div*/}
              {/*                style={{*/}
              {/*                    display: "flex",*/}
              {/*                    flexDirection: "row",*/}
              {/*                    justifyContent: "space-evenly",*/}
              {/*                }}*/}
              {/*            >*/}
              {/*                <div className="add-liquidity-wrapper">*/}

              {/*                    <div>*/}
              {/*						<span>*/}
              {/*							count rate*/}
              {/*						</span>*/}
              {/*                        {tokenA.symbol} per 1 {tokenB.symbol}*/}
              {/*                    </div>*/}

              {/*                    <div>*/}
              {/*						<span>*/}
              {/*							count rate*/}
              {/*						</span>*/}
              {/*                        {tokenB.symbol} per 1 {tokenA.symbol}*/}
              {/*                    </div>*/}
              {/*                </div>*/}

              {/*                <div className="add-liquidity-wrapper">*/}
              {/*                    <div>*/}
              {/*						<span>*/}
              {/*							count it*/}
              {/*						</span>*/}
              {/*                        You will receive LP tokens*/}
              {/*                    </div>*/}

              {/*                    <div>*/}
              {/*                        <span>100%</span>*/}
              {/*                        Your share of pool*/}
              {/*                    </div>*/}

              {/*                </div>*/}
              {/*            </div>*/}
              {/*        )}*/}
              {walletIsConnected ? (
                <button
                  onClick={() => handleConfirm()}
                  className={
                    tokenASetted &&
                    tokenBSetted &&
                    !isInvalidAmountB &&
                    !isInvalidAmountA
                      ? 'btn mainblock-btn'
                      : 'btn mainblock-btn btn--disabled'
                  }
                >
                  Create pair
                </button>
              ) : (
                <button
                  className="btn mainblock-btn"
                  onClick={() => history.push('/account')}
                >
                  Connect wallet
                </button>
              )}
            </div>
          }
        />
      )}

      {showAssetList ? (
        <AssetsModalCreatePair
          handleSet={(item, type) => handleSetToken(item, type)}
          handleCloseAssetsListPopup={() => handleCloseAssetsListPopup()}
          type={type}
          assetsList={assetsList}
        />
      ) : null}

      {createPairConfirmPopupIsVisible ? (
        <CreatePairConfirmPopup
          handleDeployAsset={() => handleCreateNewPair()}
          amountA={tokenAamount}
          amountB={tokenBamount}
          tokenA={tokenA}
          tokenB={tokenB}
          newPairSymbol={newPairSymbol}
          // currentAsset={curAssetForDeploy}
          hideConfirmPopup={() => handleSetCreatePairConfirmPopupIsVisible()}
        />
      ) : null}

      {createPairAsyncIsWaiting ? (
        <WaitingPopup
          text={`Deploying ${newPairSymbol} pair`}
          handleClose={() => handleClose()}
        />
      ) : null}
    </div>
  );
}

export default CreatePair;
