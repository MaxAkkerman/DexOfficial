import React from 'react';
import {useDispatch} from 'react-redux';
import {setSwapAsyncIsWaiting} from '../../store/actions/swap';
import {setPoolAsyncIsWaiting} from '../../store/actions/pool';
import Loader from '../Loader/Loader';
import MainBlock from '../MainBlock/MainBlock';
import './WaitingPopup.scss';
import {setShowStakingWaitingPopup} from "../../store/actions/staking";
import {setManageAsyncIsWaiting} from "../../store/actions/manage";
import {setShowWaitingSendAssetsPopup} from "../../store/actions/walletSeed";

function WaitingPopup(props) {
    const dispatch = useDispatch();
    return (
        <MainBlock
            content={
                <div className="popup-content">
                    <Loader/>
                    <p className="popup-loading-text">Sending message to blockchain</p>
                    {props.text && <p className="popup-loading-text popup-loading-descr">{props.text}</p>}
                    <button className="btn popup-btn" onClick={() => {
                        dispatch(setSwapAsyncIsWaiting(false))
                        dispatch(setPoolAsyncIsWaiting(false))
                        dispatch(setShowStakingWaitingPopup(false))
                        dispatch(setManageAsyncIsWaiting(false));
                        dispatch(setShowWaitingSendAssetsPopup(false))

                    }}>Hide
                    </button>
                </div>
            }
        />
    )
}

export default WaitingPopup;
