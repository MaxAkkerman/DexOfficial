import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Input from '@/components-v2/Input';
import rootReducer from '@/store/reducers';

export default {
  component: Input,
  title: 'Components/Input',
};

// eslint-disable-next-line react/prop-types
const Template = (store, args) => (
  <Provider store={store}>
    <Input {...args} />
  </Provider>
);

export const WithoutToken = Template.bind({}, createStore(rootReducer));
WithoutToken.args = {
  label: 'From',
};
export const WithToken = Template.bind(
  {},
  createStore(rootReducer, {
    walletReducer: {
      tokenList: [
        {
          balance: 18.371355611,
          decimals: '9',
          icon: 'https://trade.defispace.com/06f491487328de8e7fd81d835cfda442.svg',
          owner_address:
            '0:5b3b1c2a86941cdb30b925f711034bf3f4430d15d02a696e9242e1a7fcebaba8',
          rootAddress:
            '0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37',
          symbol: 'WTON',
          tokenName: 'Wrapped TON Crystal',
          type: 'PureToken',
          walletAddress:
            '0:53489672a1e951f2c1c3c14676a3d5b80031844daf97df6ea355f2e66ebaf731',
        },
      ],
    },
  }),
);
WithToken.args = {
  label: 'From',
  walletAddress:
    '0:53489672a1e951f2c1c3c14676a3d5b80031844daf97df6ea355f2e66ebaf731',
};
