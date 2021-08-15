import React from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { stat } from '../../Statuslist/status';

export default function Optstatus({ culc }) {
  return (
    <div className="flex justify-center mt-2 mr-2 border border-gray-800 rounded-lg shadow-sm pt-2 pr-10">
      <LineChart width={700} height={600} data={culc.culcresult}>
        <CartesianGrid strokeDasharray="0.2" />
        <XAxis
          axisLine={false}
          dataKey="t"
          type="number"
          domain={[0, 160]}
          tickSize={10}
          height={80}
          label={{
            value: '装備スコア',
            position: 'Bottom',
            offset: 0,
            stroke: '#c3c3c3',
            size: 18,
          }}
        />
        <YAxis
          axisLine={false}
          type="number"
          domain={[0, 260]}
          ticks={[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260]}
          allowDataOverflow={true}
          interval={0}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#2b2d2f',
            border: '1px solid #d5d5d5',
            borderRadius: 6,
            opacity: 0.95,
          }}
          content={<CustomTooltip active payload label />}
        />
        <Legend
          width={120}
          wrapperStyle={{
            top: 5,
            left: 65,
            backgroundColor: '#2b2d2f',
            border: '1px solid #d5d5d5',
            borderRadius: 6,
            lineHeight: '30px',
          }}
          formatter={renderColorfulLegendText}
        />
        <Line
          type="basis"
          dataKey="a"
          stroke="rgba(248, 113, 113,1)"
          dot={false}
          strokeWidth={3}
          activeDot={{ r: 8 }}
          id="a"
        />
        <Line
          type="basis"
          dataKey="c"
          stroke="rgba(52, 211, 153, 1)"
          dot={false}
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
        <Line
          type="basis"
          dataKey="d"
          stroke="rgba(244, 114, 182, 1)"
          dot={false}
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
        <Line
          type="basis"
          dataKey="b"
          stroke="rgba(96, 165, 250,1)" //hsl(213,93,67)
          dot={false}
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
        <Line
          type="basis"
          dataKey="h"
          stroke="rgba(251, 191, 36,1)"
          dot={false}
          strokeWidth={3}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
}

const renderColorfulLegendText = (value: string, entry: any) => {
  const { color } = entry;
  return (
    <span style={{ color }} className="">
      {stat[value]}
    </span>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: any;
  label: number | boolean;
}) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'rgba(33, 35, 37, 0)' }} className=" border rounded-md p-2 text-lg">
        <p className="text-textcolor">{`装備スコア:${label}`}</p>
        <p
          style={{ color: payload[0].color }}
          className="label"
        >{`${stat['a']}:  ${payload[0].value}`}</p>
        <p
          style={{ color: payload[1].color }}
          className="label"
        >{`${stat['c']}:  ${payload[1].value}`}</p>
        <p
          style={{ color: payload[2].color }}
          className="label"
        >{`${stat['d']}:  ${payload[2].value}`}</p>
        <p
          style={{ color: payload[3].color }}
          className="label"
        >{`${stat['b']}:  ${payload[3].value}`}</p>
        <p
          style={{ color: payload[4].color }}
          className="label"
        >{`${stat['h']}:  ${payload[4].value}`}</p>
      </div>
    );
  }

  return null;
};
