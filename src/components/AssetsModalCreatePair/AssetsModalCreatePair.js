import React, { useState } from 'react';

import AssetsList from '../AssetsList/AssetsList';
import CloseBtn from '../CloseBtn/CloseBtn';
import MainBlock from '../MainBlock/MainBlock';
import SearchInput from '../SearchInput/SearchInput';

function AssetsModalCreatePair(props) {
  const [filter, setFilter] = useState('');

  function handleSetToken(item) {
    props.handleSet(item, props.type);
  }

  function handleSearch(text) {
    setFilter(text);
  }
  function handleClose() {
    props.handleCloseAssetsListPopup();
  }

  return (
    <>
      <div className="select-wrapper">
        <MainBlock
          title={'Select asset'}
          class={'fixPositionCreatePairModal'}
          button={<CloseBtn func={() => handleClose()} />}
          content={
            <>
              <SearchInput func={(e) => handleSearch(e)} />

              <AssetsList
                handleClickNFT={null}
                handleClickToken={(item) => handleSetToken(item)}
                TokenAssetsArray={props.assetsList.filter((i) =>
                  i.symbol.includes(filter.toUpperCase()),
                )}
                NFTassetsArray={null}
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

export default AssetsModalCreatePair;
