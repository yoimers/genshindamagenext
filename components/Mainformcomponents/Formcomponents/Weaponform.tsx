import React, { useReducer, useState } from 'react';
import { CharArtWepAction, CharArtWepFormState, Equip } from '../../Statuslist/type';
import Delete from './Delete';
import Inputform from './Inputform';
import Inputname from './Inputname';
import useDropdodoco from './useComponents/useDropdodoco';

const accept: Equip[] = ['char', 'art', 'wep'];

export default function Weaponform({ children, g, onDelete, id }: any) {
  const { canDrop, isOver, drop, bg } = useDropdodoco(g, id, 'wep', accept);
  return (
    <div className={`ml-${2 * g}`}>
      <div className={`h-25 border border-blue-300 rounded-md ${bg} transition-opacity duration-100`} ref={drop}>
        <div className="flex justify-between">
          <Inputname id={id} childid={'0'} />
          <Delete onDelete={onDelete} />
        </div>
        <div className="m-2 grid grid-cols-6 h-30">
          <Inputform label={{ ab: 674 }} id={id} childid={'1'} />
          <Inputform label={{ c: 22.1, d: 66.2, a: 49.6, b: 58.3, h: 46.6, e: 20, em: 165, hr: 1.2 }} id={id} childid={'2'} />
          <Inputform label={{ n: 0, c: 22.1, d: 66.2, a: 49.6, b: 58.3, h: 46.6, e: 20, em: 165, hr: 1.2 }} id={id} childid={'3'} />
          <Inputform label={{ n: 0, c: 22.1, d: 66.2, a: 49.6, b: 58.3, h: 46.6, e: 20, em: 165, hr: 1.2 }} id={id} childid={'4'} />
          <Inputform label={{ n: 0, c: 22.1, d: 66.2, a: 49.6, b: 58.3, h: 46.6, e: 20, em: 165, hr: 1.2 }} id={id} childid={'5'} />
        </div>
      </div>
      {children}
    </div>
  );
}
