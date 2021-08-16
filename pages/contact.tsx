import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout>
      <div className="mr-2 border border-gray-800 rounded-lg shadow-sm p-1 text-textcolor">
        <p>contact</p>
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
    </Layout>
  );
}
