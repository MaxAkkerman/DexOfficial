import React from 'react';

import PoolExplorer from './PoolExplorer';

export default {
  component: PoolExplorer,
  title: 'Components/PoolExplorer',
};

const Template = (args) => <PoolExplorer {...args} />;

export const Default = Template.bind({});
