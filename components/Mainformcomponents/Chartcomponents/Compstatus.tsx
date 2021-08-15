import React, { ReactElement } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { stat } from '../../Statuslist/status';
import { CulcResults, StatButtons } from '../../Statuslist/type';

type Culc = {
  culcname: string;
  culctype: 'opt' | 'compare';
  culcresult: false | CulcResults; //false
};
type Input = {
  culc: Culc;
  statusbuttons: StatButtons;
};
export default function Compstatus({ culc, statusbuttons }: Input): ReactElement {
  console.log(statusbuttons);

  if (culc.culcresult === false) {
    return;
  } else {
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
            domain={[0, 'max_data']}
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
            content={<CustomTooltip active payload label statusbuttons={statusbuttons} />}
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
            formatter={(value, entry) => renderColorfulLegendText(value, entry, statusbuttons)}
          />
          {Object.keys(culc.culcresult[0]).map((id) => {
            if (id === 't') {
              return;
            } else {
              return (
                <Line
                  key={id}
                  type="basis"
                  dataKey={id.toString()}
                  stroke={`hsla(${Math.fround(
                    (Number(id) * 360) / (Object.keys(culc.culcresult[0]).length - 1)
                  )},90%,65%,1)`}
                  dot={false}
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
              );
            }
          })}
        </LineChart>
      </div>
    );
  }
}

const renderColorfulLegendText = (value: string, entry: any, statbuttons: StatButtons) => {
  const { color } = entry;
  return (
    <span style={{ color }} className="">
      {statbuttons[value].culcname}
    </span>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
  statusbuttons,
}: {
  active: boolean;
  payload: any;
  label: number | boolean;
  statusbuttons: StatButtons;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{ background: 'rgba(43, 45, 47, 0.4)' }}
        className=" border rounded-md p-2 text-lg"
      >
        <p className="text-textcolor">{`装備スコア:${label}`}</p>
        {payload.map((pay) => {
          return (
            <p key={pay.name} style={{ color: pay.color }} className="label">
              {`${statusbuttons[pay.name.toString()].culcname}:  ${pay.value}`}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};
