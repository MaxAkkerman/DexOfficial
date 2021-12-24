import React, { useState } from 'react';

import AssetsList from '../../components/AssetsList/AssetsList';
import CloseBtn from '../../components/CloseBtn/CloseBtn';
import MainBlock from '../../components/MainBlock/MainBlock';
import SearchInput from '../../components/SearchInput/SearchInput';

function AssetsListBridge(props) {
  const [filter, setFilter] = useState('');
  function handleSearch(searchText) {
    setFilter(searchText);
  }

  return (
    <div className="select-wrapper" onClick={(e) => props.handleClose(e)}>
      <MainBlock
        title={'Select a token'}
        button={<CloseBtn func={(e) => props.handleClose(e)} />}
        content={
          <>
            <SearchInput func={(e) => handleSearch(e)} />

            <AssetsList
              handleClickNFT={null}
              handleClickToken={(item) => props.handleSetToken(item)}
              TokenAssetsArray={props.assets.filter((item) =>
                item.name.toLowerCase().includes(filter.toLowerCase()),
              )}
              NFTassetsArray={null}
              orderAssetsArray={null}
              showItBeShown={false}
              filter={null}
            />
          </>
        }
      />
    </div>
  );
}

export default AssetsListBridge;
