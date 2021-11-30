import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

import CloseBtn from '@/components-v2/CloseBtn';
import Loader from '@/components-v2/Loader';
import MainBlock from '@/components-v2/MainBlock';
import SearchInput from '@/components-v2/SearchInput';
import SelectItem from '@/components-v2/SelectItem';
import includesTextInToken from '@/utils/includesTextInToken';

import classes from './index.module.scss';

export default function SelectPopup({
  loading,
  onClose,
  onSelect,
  open,
  tokens,
}) {
  const [searchWord, setSearchWord] = useState('');
  const filteredTokens = useMemo(
    () =>
      tokens
        .sort((a, b) => b.balance - a.balance)
        .filter((t) => includesTextInToken(t, searchWord)),
    [tokens, searchWord],
  );

  function handleTokenSelect(e, t) {
    onSelect(e, t);
    onClose(e);
  }

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className={classes['select-wrapper']}>
      <MainBlock
        title="Select a token"
        button={<CloseBtn onClick={onClose} />}
        content={
          loading ? (
            <Loader className={classes.loader} />
          ) : (
            <>
              <SearchInput onChange={(e) => setSearchWord(e.target.value)} />
              <div className={classes['select-list']}>
                {!filteredTokens.length && (
                  <p style={{ textAlign: 'center' }}>No tokens found</p>
                )}
                {filteredTokens.map((t) => (
                  <SelectItem
                    token={t}
                    key={t.rootAddress}
                    onClick={(e) => handleTokenSelect(e, t)}
                  />
                ))}
              </div>
            </>
          )
        }
      />
    </div>,
    document.querySelector('body'),
  );
}

SelectPopup.propTypes = {
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  open: PropTypes.bool,
  tokens: PropTypes.array,
};

SelectPopup.defaultProps = {
  loading: false,
  onClose: () => {},
  onSelect: () => {},
  open: false,
  tokens: [],
};
