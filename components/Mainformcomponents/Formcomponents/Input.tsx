import React, { ReactElement, useContext, useEffect } from 'react';
import { AllFormContext } from '../Main';

type Input = {
  id: string;
  childid: string;
};
export default function Input({ id, childid }: Input): ReactElement {
  const { status, statusdispatch } = useContext(AllFormContext);
  const onChange = (e) => {
    const res = e.target.value.replace(/[^0-9]/g, '');
    statusdispatch({ action: 'createchangecharartwepaction', id, childid, value: res });
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
