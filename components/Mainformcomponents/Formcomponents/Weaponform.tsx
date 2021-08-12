import React, { useState } from 'react';
import { Equip } from '../../Statuslist/type';
import Delete from './Delete';
import Inputform from './Inputform';
import Inputname from './Inputname';
import useDropdodoco from './useComponents/useDropdodoco';

const accept: Equip[] = ['char', 'art', 'wep'];
export default function Weaponform({ children, g, onDelete, id }: any) {
  const { canDrop, isOver, drop, bg } = useDropdodoco(g, id, accept);
  return (
    <div className={`ml-${2 * g}`}>
      <div className={`h-25 border border-blue-300 rounded-md ${bg} transition-opacity duration-100`} ref={drop}>
        <div className="flex justify-between">
          <Inputname />
          <Delete onDelete={onDelete} />
        </div>
        <div className="m-2 grid grid-cols-6 h-30">
          <Inputform label={['ab']} id={id} />
          <Inputform label={['c', 'd', 'a', 'b', 'h', 'e', 'em', 'hr']} id={id} />
          <Inputform label={['n', 'c', 'd', 'a', 'b', 'h', 'e', 'em', 'hr']} id={id} />
          <Inputform label={['n', 'c', 'd', 'a', 'b', 'h', 'e', 'em', 'hr']} id={id} />
          <Inputform label={['n', 'c', 'd', 'a', 'b', 'h', 'e', 'em', 'hr']} id={id} />
        </div>
      </div>
      {children}
    </div>
  );
}
