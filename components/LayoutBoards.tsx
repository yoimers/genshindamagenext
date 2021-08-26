import { Board } from '@prisma/client';
import Link from 'next/link';
import React, { createContext, ReactElement, useState } from 'react';
import BoardSidebar from './Board/BoardSidebar';
import Layout from './Layout';

type Input = {
  children: ReactElement;
};

export default function LayoutBoards({ children }: Input) {
  return (
    <Layout>
      <div className="flex flex-nowrap bg-transparent min-h-full">
        <main className="flex flex-col flex-grow  mr-2 border border-gray-800 rounded-lg shadow-sm p-4 w-mainwidth text-textcolor document">
          {children}
        </main>
        <BoardSidebar />
      </div>
    </Layout>
  );
}
