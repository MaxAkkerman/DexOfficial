import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SetTokenBlock from '../AmountBlock/SetTokenBlock';
import SelectTokenMenu from '../AmountBlock/SelectTokenMenu';
import { setTokenForReceiveSetted } from '../../store/actions/walletSeed';
import TON from '../../images/tokens/TONold.svg';
import { useHistory } from 'react-router-dom';

function TokenChanger(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const tokenForReceiveSetted = useSelector(
    (state) => state.walletSeedReducer.tokenForReceiveSetted,
  );
  const currentTokenForReceive = useSelector(
    (state) => state.walletSeedReducer.currentTokenForReceive,
  );

  function handleTouchTokenModal() {
    history.push('/wallet/receive/receive-modal');
  }

  function handleTouchTokenModal2() {
    dispatch(setTokenForReceiveSetted(true));
    history.push('/wallet/receive/receive-modal');
  }

  return (
    <>
      {tokenForReceiveSetted ? (
        <>
          <div className="send_set_token_wrap">
            {props.enableMax}
            <SetTokenBlock
              handleTouchTokenModal={() => handleTouchTokenModal()}
              img={TON}
              currentToken={currentTokenForReceive}
            />
          </div>
        </>
      ) : (
        <div className="send_select_wrap">
          <SelectTokenMenu
            handleTouchTokenModal2={() => handleTouchTokenModal2()}
          />
        </div>
      )}
    </>
  );
}

export default TokenChanger;
