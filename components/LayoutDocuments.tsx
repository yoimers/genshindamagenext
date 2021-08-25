import Link from 'next/link';
import React from 'react';
import Layout from './Layout';
import { getSortedPostsData } from '../lib/posts';

export default function LayoutDocuments({ children, allPostsData }) {
  return (
    <Layout>
      <div className="flex flex-nowrap bg-transparent min-h-full">
        <main className="flex flex-col flex-grow  mr-2 border border-gray-800 rounded-lg shadow-sm p-4 w-mainwidth text-textcolor document">
          {children}
        </main>
        <aside className="w-52 h-sidebarhight rounded-lg shadow-sm sticky top-2 p-2 text-textcolor">
          <ul className="">
            {allPostsData.map(({ id, date, title }) => (
              <li
                key={id}
                className="pl-2 block h-10 leading-10 underline text-lg text-textcolor hover:opacity-40"
              >
                <Link href={`/documents/${id === 'introduction' ? '' : id}`}>
                  <a className="block h-full w-full">{title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
