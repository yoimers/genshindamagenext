import React, { useState } from 'react';
import Delete from './Delete';
import Inputform from './Inputform';
import Inputname from './Inputname';

export default function Charform({ children, g, onDelete, id }: any) {
  return (
    <div className={`ml-${2 * g}`}>
      <div className="h-40 border border-red-400 rounded-md">
        <div className="flex justify-between">
          <Inputname />
          <Delete onDelete={onDelete} />
        </div>
        <div className="m-2 grid grid-cols-6 h-30">
          <Inputform label={['ab']} id={id} />
          <Inputform label={['hb']} id={id} />
          <Inputform label={['bb']} id={id} />
          <Inputform label={['c']} id={id} />
          <Inputform label={['d']} id={id} />
          <Inputform label={['e']} id={id} />
          <Inputform label={['n', 'a', 'b', 'h', 'hr', 'ea', 'ac', 'bc', 'hc']} id={id} />
          <Inputform label={['n', 'a', 'b', 'h', 'hr', 'ea', 'ac', 'bc', 'hc', 'r', 'select']} id={id} />
          <Inputform label={['n', 'a', 'b', 'h', 'hr', 'ea', 'ac', 'bc', 'hc', 'r', 'select']} id={id} />
          <Inputform label={['n', 'a', 'b', 'h', 'hr', 'ea', 'ac', 'bc', 'hc', 'r', 'select']} id={id} />
          <Inputform label={['ema']} id={id} />
          <Inputform label={['em']} id={id} />
        </div>
      </div>
      {children}
    </div>
  );
}
