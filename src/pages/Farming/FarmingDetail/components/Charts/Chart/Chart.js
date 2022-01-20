import React, { useMemo, useCallback } from 'react';
import { AreaClosed, Line, Bar } from '@visx/shape';
import appleStock from '../../../../data/data-chart';
import { curveMonotoneX } from '@visx/curve';
import { scaleTime, scaleLinear } from '@visx/scale';
import { withTooltip } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { LinearGradient } from '@visx/gradient';
import { max, extent, bisector } from 'd3-array';
import { timeFormat } from 'd3-time-format';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

//let data = appleStock.slice(0, 110);
//let stock = data.slice(1);

//console.log(stock[stock.length - 1].close);

//export const accentColor = "#fb077c";
export const accentColorDark = '#f0f';
const tooltipMain = {
  width: '100%',
  position: 'absolute',
  top: '0',
  left: '0',
  display: 'flex',
  justifyContent: 'space-between',
};

// util
const formatDate = timeFormat('%d %b %y');

// accessors
const getDate = (d) => new Date(d.date);
const getStockValue = (d) => d.close;
const bisectDate = bisector((d) => new Date(d.date)).left;

export default withTooltip(
  ({
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    accentColor,
  }) => {
    if (width < 10) return null;

    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const [stock, setStock] = React.useState(appleStock.slice(0, 80));

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: extent(stock, getDate),
        }),
      [innerWidth, margin.left, stock],
    );
    const stockValueScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, (max(stock, getStockValue) || 0) + innerHeight / 6],
          nice: false,
        }),
      [margin.top, innerHeight, stock],
    );

    // tooltip handler
    const handleTooltip = useCallback(
      (event) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = dateScale.invert(x);
        const index = bisectDate(stock, x0, 1);
        const d0 = stock[index - 1];
        const d1 = stock[index];
        let d = d0;
        if (d1 && getDate(d1)) {
          d =
            x0.valueOf() - getDate(d0).valueOf() >
            getDate(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: stockValueScale(getStockValue(d)),
        });
      },
      [showTooltip, stockValueScale, dateScale, stock],
    );

    return (
      <>
        <svg width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width - 2}
            height={height}
            fill="transparent"
            rx={14}
          />
          <LinearGradient
            id="area-gradient"
            from={accentColor}
            to={accentColor}
            toOpacity={0}
          />

          <AreaClosed
            data={stock}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => stockValueScale(getStockValue(d)) ?? 0}
            yScale={stockValueScale}
            strokeWidth={2}
            stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
            curve={curveMonotoneX}
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={accentColor}
                opacity={0.4}
                strokeWidth={1}
                pointerEvents="none"
                strokeDasharray="5,5"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={accentColorDark}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        <Box style={tooltipMain}>
          <Box>
            <Box style={{ margin: '5px', fontSize: '2rem' }}>
              {tooltipData
                ? getStockValue(tooltipData)
                : stock[stock.length - 1].close}
            </Box>
            <Box
              sx={{ marginLeft: '10px', fontSize: '1rem', color: accentColor }}
            >
              {tooltipData
                ? formatDate(getDate(tooltipData))
                : formatDate(new Date(stock[stock.length - 1].date))}
            </Box>
          </Box>
        </Box>
        {tooltipData && <div></div>}
        <Paper />
      </>
    );
  },
);
