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
    const res = hankaku.replace(/[^0-9]/g, '');
    statusdispatch({ action: 'createchangecharartwepaction', id, childid, value: Number(res) });
  };
  const hankaku2Zenkaku = (str: string): string => {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
  };
  const value = status ? (status[id] ? (status[id][childid] ? status[id][childid].value : 0) : 0) : 0;

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
