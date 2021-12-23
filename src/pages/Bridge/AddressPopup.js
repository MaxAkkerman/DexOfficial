import React from 'react';

import { handleCutAddress } from '../../reactUtils/reactUtils';

function AddressPopup(props) {
  return (
    <div className="bridge_address_wrapper">
      <div className="bridge_address_img">
        <img className="send_token_img" src={props.netIcon} alt={'arrow'} />
        &nbsp;
      </div>
      {handleCutAddress(props.address)}
    </div>
  );
}

export default AddressPopup;
