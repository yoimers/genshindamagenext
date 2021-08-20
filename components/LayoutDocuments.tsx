import Link from 'next/link';
import React from 'react';
import Layout from './Layout';
import { getSortedPostsData } from '../lib/posts';

export default function LayoutDocuments({ children, allPostsData }) {
  return (
    <Layout>
      <div className="flex flex-nowrap bg-transparent min-h-full">
        <main className="flex flex-col flex-grow  mr-2 border border-gray-800 rounded-lg shadow-sm p-2 w-mainwidth text-textcolor">
          {children}
        </main>
        <aside className="w-52 h-sidebarhight rounded-lg shadow-sm sticky top-2 p-2 text-textcolor">
          <ul>
            {allPostsData.map(({ id, date, title }) => (
              <li key={id}>
                <Link href={`/documents/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Layout>
  );
}
