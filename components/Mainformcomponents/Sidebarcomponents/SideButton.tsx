import React, { useContext } from 'react';
import Image from 'next/image';
import useDragdodoco from '../Formcomponents/useComponents/useDragdodoco';
import { StateContext } from '../Main';
import { Equip } from '../../Statuslist/type';

interface ButtonData {
  text: string;
  img: string;
  type: Equip | 'culc';
}
export interface BoxProps {
  name: string;
}

interface DropResult {
  name: string;
}

export default function SideButton({ text, img, type }: ButtonData) {
  const { types, dispatch } = useContext(StateContext);
  const { isDragging, drag } = useDragdodoco(type, dispatch);
  let c: string;
  let m: string = 'mt-1';
  const onClick = () => {
    if (type === 'char' && types.length === 0) {
      dispatch({ action: 'createNode', id: '0', type: 'char' });
    }
  };
  switch (type) {
    case 'char':
      c = 'border-red-400';
      break;
    case 'art':
      c = 'border-yellow-500';
      break;
    case 'wep':
      c = 'border-blue-300';
      break;
    case 'culc':
      c = 'border-green-400';
      m = 'mt-6';
      break;
  }
  return (
    <div className={`m-1 ${m} border ${c} relative rounded-md shadow hover:opacity-50 transition duration-100`} ref={drag} role={type} onClick={onClick}>
      <div className="flex flex-row-reverse opacity-20">
        <Image src={img} width={100} height={100} alt="Picture of the author" />
      </div>
      <p className="block h-full w-full text-center absolute top-1/3 left-0 self-center text-3xl text-textcolor">{text}</p>
    </div>
  );
}
