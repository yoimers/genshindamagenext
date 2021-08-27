import React from 'react';
import Image from 'next/image';

export default function ErrorComp() {
  return (
    <div className="fixed bottom-2 right-2 rounded-md bg-gray-900 shadow-2xl">
      <div className="relative w-72">
        <div className="flex flex-row opacity-20">
          <Image src={'/images/klee6.png'} width={180} height={180} alt="Picture of the author" />
        </div>
        <p className="block h-full w-full text-center absolute top-1/4 left-0 self-center text-3xl text-textcolor font-black text-shadow">
          接続多いよ！
        </p>
      </div>
    </div>
  );
}
