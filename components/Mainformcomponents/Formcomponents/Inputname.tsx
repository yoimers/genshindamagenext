import React, { ReactElement, useContext, useEffect } from 'react';
import { AllFormContext } from '../Main';

type Input = {
  id: string;
  childid: string;
};

export default function Inputname({ id, childid }: Input): ReactElement {
  const { status, statusdispatch } = useContext(AllFormContext);

  const onChange = (e) => {
    statusdispatch({ action: 'createchangecharartwepaction', id, childid, name: 'name', value: e.target.value });
  };
  useEffect(() => {
    statusdispatch({ action: 'initchangecharartwepaction', id, childid, name: 'name', value: '' });
  }, []);

  const value = status ? (status[id] ? (status[id][childid] ? status[id][childid].value : '') : '') : '';

  return (
    <div className="m-2 mb-0">
      <label className="inline-block w-20 h-7 text-gray-200 text-center">Name</label>
      <input
        className="w-16 h-7 rounded bg-transparent border border-gray-100
       text-gray-200 text-center text-xs font-semibold"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
