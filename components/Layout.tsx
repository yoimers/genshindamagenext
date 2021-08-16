import Image from 'next/image';
import Link from 'next/link';
import Header from './Headercomponents/Header';
import Head from 'next/head';
import Sidebar from './Mainformcomponents/Sidebarcomponents/Sidebar';
import Main from './Mainformcomponents/Main';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>GENSHIN</title>
        <link rel="icon" href="/myfavicon.ico" />
      </Head>
      <div className="m-auto min-h-screen font-display select-none pb-10">
        <div className="mx-auto w-245 pt-4">
          <Header />
          {children}
          {/* <footer className="mt-2 bg-transparent h-32 border border-gray-800 rounded-lg shadow-sm"></footer> */}
        </div>
      </div>
    </>
  );
}
