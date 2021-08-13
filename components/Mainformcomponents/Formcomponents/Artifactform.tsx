import React, { useState } from 'react';
import { Equip } from '../../Statuslist/type';
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
          <Inputname />
          <Delete onDelete={onDelete} />
        </div>
        <div className="m-2 grid grid-cols-6 h-30">
          <Inputform label={['hc']} id={id} />
          <Inputform label={['ac']} id={id} />
          <Inputform label={['a', 'b', 'h', 'em']} id={id} />
          <Inputform label={['e', 'a', 'b', 'h', 'em']} id={id} />
          <Inputform label={['c', 'd', 'a', 'b', 'h', 'em']} id={id} />
          <Inputform label={['n', 'c', 'd', 'a', 'b', 'h', 'e', 'em']} id={id} />
          <Inputform label={['e', 'c', 'd', 'a', 'b', 'h', 'em']} id={id} />
          <Inputform label={['ea', 'c', 'd', 'a', 'b', 'h', 'em']} id={id} />
          <Inputform label={['n', 'c', 'd', 'a', 'b', 'h', 'e', 'em']} id={id} />
          <Inputform label={['n', 'c', 'd', 'a', 'b', 'h', 'e', 'em']} id={id} />
          <Inputform label={['n', 'c', 'd', 'a', 'b', 'h', 'e', 'em']} id={id} />
          <Inputform label={['n', 'c', 'd', 'a', 'b', 'h', 'e', 'em']} id={id} />
        </div>
      </div>
      {children}
    </div>
  );
}
