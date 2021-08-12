import React from 'react';
import { Equip } from '../../Statuslist/type';
import SideButton from './SideButton';

interface ButtonData {
  text: string;
  img: string;
  type: Equip | 'culc';
}

const Buttondata: ButtonData[] = [
  {
    text: 'キャラ追加',
    img: '/images/klee1.png',
    type: 'char',
  },
  {
    text: '聖遺物追加',
    img: '/images/klee2.png',
    type: 'art',
  },
  {
    text: '武器追加',
    img: '/images/klee3.png',
    type: 'wep',
  },
  {
    text: '計算',
    img: '/images/klee4.png',
    type: 'culc',
  },
];
export default function Sidebar() {
  return (
    <aside className="w-52 h-side border border-gray-800 rounded-lg shadow-sm sticky top-8">
      {Buttondata.map((data) => {
        return <SideButton key={data.text} text={data.text} img={data.img} type={data.type} />;
      })}
    </aside>
  );
}
