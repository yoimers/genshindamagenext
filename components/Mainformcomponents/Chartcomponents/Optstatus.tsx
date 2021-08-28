import React, { ReactElement } from 'react';
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
import { st, stat } from '../../Statuslist/status';
import { Culc } from '../../Statuslist/type';

export default function Optstatus({ culc }: { culc: Culc }) {
  if (culc.culcresult === false) return;
  return (
    <div className="flex flex-col  justify-center mt-2 mr-2 rounded-lg shadow-sm">
      <div>
        <LineChart
          data={culc.culcresult}
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
            domain={[(dataMin) => -10, (dataMax) => dataMax * 1.05]}
            ticks={Yaxis(culc)}
            allowDataOverflow={true}
            interval={0}
            label={{
              value: 'ステータス',
              angle: -90,
              position: 'insideLeft',
              offset: -10,
              stroke: '#c3c3c3',
              size: 18,
              dy: 50,
            }}
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
          <Legend verticalAlign="top" height={30} formatter={renderColorfulLegendText} />
          <Line
            type="basis"
            dataKey="a"
            stroke="hsla(0, 91%, 71%, 1)"
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
            stroke="hsla(213, 94%, 68%, 1)" //hsl(213,93,67)
            dot={false}
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="basis"
            dataKey="h"
            stroke="hsla(43, 96%, 56%, 1)"
            dot={false}
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="basis"
            dataKey="ec"
            stroke="hsla(283, 80%, 80%, 0.6)"
            dot={false}
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
      <OptTitle culc={culc} />
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
      <div
        style={{ background: 'rgba(13, 15, 17, 0.6)' }}
        className=" border rounded-md p-2 text-lg"
      >
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
        <p
          style={{ color: payload[5].color }}
          className="label"
        >{`${stat['ec']}:  ${payload[5].value}`}</p>
      </div>
    );
  }

  return null;
};

function OptTitle({ culc }: { culc: Culc }): ReactElement {
  const color = {
    a: 'hsla(0, 80%, 80%, 0.6)',
    b: 'hsla(213, 80%, 80%, 0.6)',
    h: 'hsla(43, 80%, 80%, 0.6)',
    c: 'hsla(156, 80%, 80%, 0.6)',
    d: 'hsla(323, 80%, 80%, 0.6)',
    ec: 'hsla(283, 80%, 80%, 0.6)',
    text: 'hsla(0, 0%, 76%, 0.6)',
  };
  return (
    <div className="text-center text-textcolor my-2">
      <p>{culc.culcname}</p>
      <p>初期ステータス</p>
      <p>
        <span style={{ color: color.a }}>基礎攻撃力: {Number(culc.status.ab.toFixed(1))} </span>
        <span style={{ color: color.a }}>固定攻撃力: {Number(culc.status.ac.toFixed(1))} </span>
        <span style={{ color: color.b }}>基礎防御力: {Number(culc.status.bb.toFixed(1))} </span>
        <span style={{ color: color.b }}>固定防御力: {Number(culc.status.bc.toFixed(1))} </span>
        <span style={{ color: color.h }}>基礎HP: {Number(culc.status.hb.toFixed(1))} </span>
        <span style={{ color: color.h }}>固定HP: {Number(culc.status.hc.toFixed(1))} </span>
      </p>
      <p>
        <span style={{ color: color.a }}>攻撃力%: {Number(culc.status.a.toFixed(1))}% </span>
        <span style={{ color: color.c }}>会心率%: {Number(culc.status.c.toFixed(1))}% </span>
        <span style={{ color: color.d }}>会心ダメ%: {Number(culc.status.d.toFixed(1))}% </span>
        <span style={{ color: color.b }}>防御力%: {Number(culc.status.b.toFixed(1))}% </span>
        <span style={{ color: color.h }}>HP%: {Number(culc.status.h.toFixed(1))}% </span>
      </p>
      <p>
        <span style={{ color: color.ec }}>
          元素チャージ%: {Number(culc.status.ec.toFixed(1))}%{' '}
        </span>
        <span style={{ color: color.ec }}>
          元素チャ%→A%: {Number(culc.status.ectoa.toFixed(1))}%{' '}
        </span>
        <span style={{ color: color.ec }}>
          元素チャ%→A%上限: {Number(culc.status.ectoa_upper.toFixed(1))}%{' '}
        </span>
      </p>
      <p>
        <span style={{ color: color.text }}>元素ダメ%: {Number(culc.status.e.toFixed(1))}% </span>
        <span style={{ color: color.text }}>
          元チャ%→E%: {Number(culc.status.ectoe.toFixed(1))}%{' '}
        </span>
        <span style={{ color: color.text }}>
          元チャ%→E%上限: {Number(culc.status.ectoe_upper.toFixed(1))}%{' '}
        </span>
      </p>
      <p>
        <span style={{ color: color.text }}>
          {stat.el}: {Number(culc.status.el.toFixed(3)) * 100 + 100}%{' '}
        </span>
        <span style={{ color: color.text }}>
          {stat.ea}: {Number(culc.status.ea.toFixed(1))}%{' '}
        </span>
        <span style={{ color: color.text }}>
          {stat.ema}: {Number(culc.status.ema.toFixed(3)) * 100}%{' '}
        </span>
        <span style={{ color: color.text }}>
          {stat.select}: {Number(culc.status.select.toFixed(1))}%{' '}
        </span>
      </p>
      <span style={{ color: color.text }}>
        A-B-HP weight {Number(culc.status.ar.toFixed(1))} : {Number(culc.status.br.toFixed(1))} :{' '}
        {Number(culc.status.hr.toFixed(1))}
      </span>
    </div>
  );
}

function Yaxis(culc: Culc) {
  const Yaxis = [];
  if (culc.culcresult === false) return [];
  const maxobj = culc.culcresult.slice(-1)[0];
  // const max = maxobj.d < maxobj.a ? maxobj.a : maxobj.d;
  const max = Object.values(culc.culcresult).reduce((ac, cu) => {
    const prevmax = Object.entries(cu).reduce((ac1, cu1) => {
      if (['a', 'b', 'h', 'c', 'd'].includes(cu1[0])) {
        return cu1[1] <= ac1 ? ac1 : cu1[1];
      } else {
        return ac1;
      }
    }, 0);
    return prevmax <= ac ? ac : prevmax;
  }, 0);
  let i = 0;
  for (i = 0; 20 * i < max; i++) {
    Yaxis.push(20 * i);
  }
  Yaxis.push(20 * i);
  return Yaxis;
}
