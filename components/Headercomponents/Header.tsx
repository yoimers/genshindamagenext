import React from "react";
import Link from "next/link";
import Navigation from "./Navigation";
export default function Header() {
  return (
    <header className="h-32 mb-2 border border-gray-800 rounded-lg shadow-sm">
      <h1 className="flex text-3xl h-3/5 items-center justify-center text-titlecolor">
        <Link href="/">
          <a>DoDoCo</a>
        </Link>
      </h1>
      <Navigation />
    </header>
  );
}
