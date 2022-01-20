import * as React from 'react';
import { SizeMe } from 'react-sizeme';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';

import appleStock from '../../../data/data-chart';
import Chart from './Chart/Chart';

const Tab = styled(TabUnstyled)`
  color: inherit;
  cursor: pointer;
  font-size: inherit;
  background-color: transparent;
  padding: 5px 5px;
  margin: 5px 5px;
  display: flex;
  justify-content: center;

  &:hover {
    color: var(--accent-hover);
  }

  &.${tabUnstyledClasses.selected} {
    border-bottom: 2px solid var(--accent);
    color: var(--accent);
  }
`;

const TabsHeader = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ChartStyle = styled(Box)`
  width: 100%;
  height: 100%
  display: flex;
  align-items: center;
  justify-content: center;
  aling-content: center;
  margin: auto;
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  height: 100%;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

export default function Tabs() {
  const [stock, setStock] = React.useState(appleStock.slice(0, 30));
  const [alignment, setAlignment] = React.useState('D');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    switch (newAlignment) {
      case 'M':
        setStock(appleStock.slice(0, 80));

        //const stock = data.slice(1);
        break;
      case 'Y':
        setStock(appleStock.slice(0, 110));
        break;
      default:
        setStock(appleStock.slice(0, 30));
        break;
    }
  };

  return (
    <TabsUnstyled defaultValue={0}>
      <TabsHeader>
        <Box>
          <TabsList>
            <Tab>TVL</Tab>
            <Tab>APR</Tab>
          </TabsList>
        </Box>
        <Box>
          <ToggleButtonGroup
            sx={{ fontWeight: 'bold' }}
            size="small"
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="D">1D</ToggleButton>
            <ToggleButton value="M">1M</ToggleButton>
            <ToggleButton value="Y">1Y</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </TabsHeader>
      <TabPanel value={0}>
        <Box>
          <SizeMe>
            {({ size }) => (
              <Chart
                width={Math.floor(size.width)}
                height={Math.floor(440)}
                accentColor={'#fb077c'}
              />
            )}
          </SizeMe>
        </Box>
      </TabPanel>
      <TabPanel value={1}>
        <SizeMe>
          {({ size }) => (
            <Chart
              width={Math.floor(size.width)}
              height={Math.floor(440)}
              accentColor={'#32cd32'}
            />
          )}
        </SizeMe>
      </TabPanel>
    </TabsUnstyled>
  );
}
