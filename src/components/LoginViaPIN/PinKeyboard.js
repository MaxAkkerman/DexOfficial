import './PinPopup.scss';

import BackspaceIcon from '@mui/icons-material/Backspace';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import React from 'react';

import { numPadArr } from '@/constants/defaultData';

function PinKeyboard(props) {
  return (
    <Grid className="gridContainer" sx={{ justifyContent: 'center' }}>
      {numPadArr.map((item, i) => {
        return item.value === 12 ? (
          <div key={item.value} style={{ margin: 'auto', marginTop: '20px' }}>
            <IconButton
              sx={{
                height: 66,
                width: 66,
              }}
            >
              <BackspaceIcon onClick={(e) => props.onClickNumKeyboard(e, i)} />
            </IconButton>
          </div>
        ) : (
          <div key={item.value} style={{ margin: 'auto', marginTop: '20px' }}>
            <Button
              className="gridItem"
              variant="outlined"
              style={{ display: item.disabled ? 'none' : null }}
              disabled={item.disabled ? item.disabled : null}
              value={item.value}
              onClick={(e) => props.onClickNumKeyboard(e, i)}
            >
              {item.value}
            </Button>
          </div>
        );
      })}
    </Grid>
  );
}

PinKeyboard.propTypes = {
  onClickNumKeyboard: PropTypes.func,
};

PinKeyboard.defaultProps = {
  onClickNumKeyboard: () => {},
};

export default React.memo(PinKeyboard);
