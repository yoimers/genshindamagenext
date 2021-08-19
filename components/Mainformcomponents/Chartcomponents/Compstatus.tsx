import React, { Dispatch, ReactElement, SetStateAction, useEffect, useState } from 'react';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { CulcResults, StatButtons } from '../../Statuslist/type';
import { cloneDeep } from 'lodash';
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
  const [results, setResults] = useState(culc.culcresult);
  useEffect(() => {
    setResults(culc.culcresult);
  }, [culc.culcresult]);
  Yaxis(results);

  if (results === false) {
    return;
  } else {
    return (
      <div className="flex flex-col justify-center mt-2 mr-2 border border-gray-800 rounded-lg shadow-sm">
        <div>
          <LineChart
            data={results}
            width={750}
            height={600}
            margin={{
              top: 20,
              right: 0,
              bottom: 0,
              left: 40,
            }}
          >
            <CartesianGrid strokeDasharray="0.2" />
            <XAxis
              axisLine={false}
              dataKey="t"
              type="number"
              domain={[0, 160]}
              tickSize={10}
              height={60}
              label={{
                value: '装備スコア',
                position: 'insideBottom',
                offset: 15,
                stroke: '#c3c3c3',
                size: 18,
              }}
            />
            <YAxis
              axisLine={false}
              type="number"
              label={{
                value: culc.culcname,
                angle: -90,
                position: 'insideLeft',
                offset: -10,
                stroke: '#c3c3c3',
                size: 18,
                dy: 50,
              }}
              domain={[(dataMin) => dataMin * 0.95, (dataMax) => dataMax * 1.05]}
              ticks={Yaxis(results)}
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
              verticalAlign="top"
              formatter={(value, entry) => renderColorfulLegendText(value, entry, statusbuttons)}
              onClick={(e) => onClick(e, setResults, culc.culcresult)}
            />
            {Object.keys(results[0]).map((id) => {
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
          <OptTitle />
        </div>
      </div>
    );
  }
}

function onClick(
  e,
  setResults: Dispatch<SetStateAction<false | CulcResults>>,
  culcresult: CulcResults | false
): void {
  setResults((prevresults) => {
    const results = cloneDeep(prevresults);
    if (results === false) return;
    const dataid: string = e.dataKey;
    results.forEach((result, index) => {
      if (Math.abs(results[index][dataid] - 1) <= 0.001) {
        Object.keys(result).forEach((id) => {
          if (id !== 't') {
            result[id] = culcresult[index][id];
          }
        });
      } else {
        Object.keys(result).forEach((id) => {
          if (id !== 't') {
            result[id] = culcresult[index][id] / culcresult[index][dataid];
            result[id] = Math.round(10000 * result[id]) / 10000;
          }
        });
      }
    });
    return results;
  });
}

const renderColorfulLegendText = (value: string, entry: any, statbuttons: StatButtons) => {
  const { color } = entry;
  return <span style={{ color }}>{statbuttons[value]?.culcname || 'NoName'}</span>;
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
        style={{ background: 'rgba(13, 15, 17, 0.6)' }}
        className=" border rounded-md p-2 text-lg"
      >
        <p className="text-textcolor">{`装備スコア:${label}`}</p>
        {payload.map((pay) => {
          return (
            <p key={pay.name} style={{ color: pay.color }} className="label">
              {`${statusbuttons[pay.name.toString()].culcname || 'NoName'}:  ${pay.value}`}
            </p>
          );
        })}
      </div>
    );
  }

  return null;
};
function OptTitle(): ReactElement {
  const color = {
    a: 'hsla(0, 80%, 80%, 0.6)',
    b: 'hsla(213, 80%, 80%, 0.6)',
    h: 'hsla(43, 80%, 80%, 0.6)',
    c: 'hsla(156, 80%, 80%, 0.6)',
    d: 'hsla(323, 80%, 80%, 0.6)',
    text: 'hsla(0, 0%, 76%, 0.6)',
  };
  return <div className="text-center text-textcolor my-2"></div>;
}

function Yaxis(results: false | CulcResults) {
  if (results === false) return;
  const israte: boolean = Object.values(results[0]).some((damage) => Math.abs(damage - 1) <= 0.001);
  const max = Object.values(results).reduce((ac, cu) => {
    const prevmax = Object.entries(cu).reduce((ac1, cu1) => {
      if (cu1[0] !== 't') {
        return cu1[1] <= ac1 ? ac1 : cu1[1];
      } else {
        return ac1;
      }
    }, 0);
    return prevmax <= ac ? ac : prevmax;
  }, 0);
  const min = Object.values(results).reduce((ac, cu) => {
    const prevmax = Object.entries(cu).reduce((ac1, cu1) => {
      if (cu1[0] !== 't') {
        return cu1[1] >= ac1 ? ac1 : cu1[1];
      } else {
        return ac1;
      }
    }, 1e6);
    return prevmax >= ac ? ac : prevmax;
  }, 1e6);
  const Yaxis = [];

  if (israte) {
    let i = 0;
    for (i = Math.floor(min / 0.05); 0.05 * i < max; i += 1) {
      Yaxis.push(Math.round(5 * i) / 100);
    }
    Yaxis.push(Number((0.05 * i).toFixed(2)));
    return Yaxis;
  } else {
    let i = 0;
    for (i = Math.floor(min / 2000); 2000 * i < max; i += 1) {
      Yaxis.push(2000 * i);
    }
    Yaxis.push(2000 * i);
    return Yaxis;
  }
}
