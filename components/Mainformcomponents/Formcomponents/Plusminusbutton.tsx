import React, { useContext } from 'react';
import { Button } from '../../Statuslist/type';
import { AllFormContext } from '../Main';

export default function plusminusbutton({ type, id, childid, add }: Button) {
  const { status, statusdispatch } = useContext(AllFormContext);

  let c: string;
  if (type === 'plus') {
    c = 'border-red-600 text-red-700 hover:bg-red-700 focus:ring-red-600';
  } else {
    c = 'border-blue-600 text-blue-700 hover:bg-blue-700 focus:ring-blue-600';
  }

  return (
    <button
      className={`border ${c} h-full w-6 rounded text-center font-black text-lg relative focus:outline-none focus:ring-2 focus:border-transparent hover:text-gray-300 `}
      onClick={() => statusdispatch({ action: 'createchangecharartwepaction', id, childid, add })}
    >
      <p className="block h-full w-full absolute -top-1 left-0">{type === 'plus' ? '+' : '-'}</p>
    </button>
  );
}
