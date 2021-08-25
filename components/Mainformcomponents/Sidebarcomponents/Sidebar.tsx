import React, { useEffect, useState } from 'react';
import { Equip } from '../../Statuslist/type';
import SideButton from './SideButton';
import Image from 'next/image';

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
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 1000);
    }
  }, [alert]);
  return (
    <>
      <aside className="w-52 h-sidebarhight rounded-lg shadow-sm sticky top-2 p-1">
        {Buttondata.map((data) => {
          return (
            <SideButton
              key={data.text}
              text={data.text}
              img={data.img}
              type={data.type}
              setAlert={setAlert}
            />
          );
        })}
      </aside>
      {
        <div
          className={`fixed bottom-2 right-2 rounded-md bg-gray-900 shadow-2xl ${
            alert ? 'visible' : 'invisible'
          }`}
        >
          <div className="relative w-72">
            <div className="flex flex-row opacity-20">
              <Image
                src={'/images/klee6.png'}
                width={180}
                height={180}
                alt="Picture of the author"
              />
            </div>
            <p
              className={`block h-full w-full text-center absolute top-1/4 left-0 self-center text-3xl text-textcolor font-black text-shadow`}
            >
              ドラッグ&ドロップだよ！
            </p>
          </div>
        </div>
      }
    </>
  );
}
