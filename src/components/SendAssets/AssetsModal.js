import './SendAssets.scss';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useAssetList from '../../hooks/useAssetList';
import {
  setAmountForSend,
  setCurrentTokenForSend,
  setInputNFTDisabled,
  setTokenSetted,
} from '../../store/actions/walletSeed';
import AssetsList from '../AssetsList/AssetsList';
import CloseBtn from '../CloseBtn/CloseBtn';
import MainBlock from '../MainBlock/MainBlock';
import SearchInput from '../SearchInput/SearchInput';

function AssetsModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const NFTassets = useSelector((state) => state.walletSeedReducer.NFTassets);

  const liquidityList = useSelector(
    (state) => state.walletReducer.liquidityList,
  );

  const { assetList } = useAssetList();

  function handleSetNFT(item) {
    dispatch(setAmountForSend(''));
    dispatch(setInputNFTDisabled('disabled'));
    dispatch(setAmountForSend(item.stakeTotal));
    dispatch(setCurrentTokenForSend(item));

    dispatch(setTokenSetted(true));
    history.push('/wallet/send');
  }

  function handleSetToken(item) {
    // dispatch(setAmountForSend(""));
    dispatch(setInputNFTDisabled(null));
    dispatch(setCurrentTokenForSend(item));
    dispatch(setTokenSetted(true));

    history.push('/wallet/send');
  }

  const [filter, setFilter] = useState('');
  function handleSearch(text) {
    setFilter(text);
  }
  function handleClose(e) {
    e.stopPropagation();
    if (
      e.target.id === 'swapPopup' ||
      e.target.id === 'searchBtn' ||
      e.target.id === 'searchBtnInp' ||
      e.target.id === 'mainBlock' ||
      e.target.id === 'mainBlockTitle'
    )
      return;

    dispatch(setInputNFTDisabled(null));
    history.push('/wallet/send');
  }

  return (
    <>
      <div className="select-wrapper" onClick={(e) => handleClose(e)}>
        <MainBlock
          title={'Select a token'}
          button={<CloseBtn func={(e) => handleClose(e)} />}
          content={
            <>
              <SearchInput func={(e) => handleSearch(e)} />

              <AssetsList
                handleClickNFT={(item) => handleSetNFT(item)}
                handleClickToken={(item) => handleSetToken(item)}
                TokenAssetsArray={[...assetList, ...liquidityList].filter(
                  (item) =>
                    item.symbol.toLowerCase().includes(filter.toLowerCase()),
                )}
                NFTassetsArray={NFTassets}
                orderAssetsArray={null}
                showItBeShown={false}
                filter={filter}
              />
            </>
          }
        />
      </div>
    </>
  );
}

export default AssetsModal;
