import React, { useEffect, useReducer, useState } from 'react';
import { CharArtWepAction, CharArtWepFormState, Equip } from '../../Statuslist/type';
import createchangecharartwepaction from '../Statuscontrols/createchangecharartwepaction';
import Delete from './Delete';
import Inputform from './Inputform';
import Inputname from './Inputname';
import useDropdodoco from './useComponents/useDropdodoco';

const accept: Equip[] = ['char', 'art', 'wep'];
export default function Artifactform({ children, g, onDelete, id }: any) {
  const { canDrop, isOver, drop, bg } = useDropdodoco(g, id, 'art', accept);

  return (
    <div className={`ml-${2 * g}`}>
      <div className={`h-40 border border-yellow-500 rounded-md ${bg} transition-opacity duration-100`} ref={drop}>
        <div className="flex justify-between">
          <Inputname id={id} childid={'0'} />
          <Delete onDelete={onDelete} />
        </div>
        <div className="m-2 grid grid-cols-6 h-30">
          <Inputform label={{ hc: 4780 }} id={id} childid={'1'} />
          <Inputform label={{ ac: 311 }} id={id} childid={'2'} />
          <Inputform label={{ a: 46.6, b: 58.3, h: 46.6, em: 187 }} id={id} childid={'3'} />
          <Inputform label={{ e: 46.6, a: 46.6, b: 58.3, h: 46.6, em: 187 }} id={id} childid={'4'} />
          <Inputform label={{ c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, em: 187 }} id={id} childid={'5'} />
          <Inputform label={{ n: 0, c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, e: 46.6, em: 187 }} id={id} childid={'6'} />
          <Inputform label={{ e: 46.6, c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, em: 187 }} id={id} childid={'7'} />
          <Inputform label={{ ema: 0, c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, e: 46.6, em: 187 }} id={id} childid={'8'} />
          <Inputform label={{ n: 0, c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, e: 46.6, em: 187 }} id={id} childid={'9'} />
          <Inputform label={{ n: 0, c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, e: 46.6, em: 187 }} id={id} childid={'10'} />
          <Inputform label={{ n: 0, c: 31.1, d: 62.2, a: 46.6, b: 58.3, h: 46.6, e: 46.6, em: 187 }} id={id} childid={'11'} />
        </div>
      </div>
      {children}
    </div>
  );
}
