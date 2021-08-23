import React, { ReactElement, useContext } from 'react';
import { AllFormContext } from '../Main';

type Input = {
  id: string;
  childid: string;
};
export default function Input({ id, childid }: Input): ReactElement {
  const { status, statusdispatch } = useContext(AllFormContext);

  const onChange = (e) => {
    const hankaku = hankaku2Zenkaku(e.target.value);
    let res = hankaku.replace(/[^0-9 \.]/g, '');
    if (res[0] === '0' && res[1] !== '.') {
      res = res.slice(1);
    }
    const r = res.match(/\./g) || [];
    const v = r.length > 1 ? '0' : res;
    let value = v;
    const str = v.split('.');
    if (str.length === 2) {
      value = str[0] + '.' + str[1].slice(0, 1) + (str[1].length !== 1 ? str[1].slice(-1) : '');
    }
    statusdispatch({ action: 'createchangecharartwepaction', id, childid, value });
  };
  const hankaku2Zenkaku = (str: string): string => {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  };
  const value = status
    ? status[id]
      ? status[id][childid]
        ? status[id][childid].value
        : 0
      : 0
    : 0;

  return (
    <input
      type="text"
      className="w-12 h-full rounded bg-transparent border border-gray-100
       text-gray-200 text-center text-xs font-semibold"
      value={value}
      onChange={onChange}
    />
  );
}
