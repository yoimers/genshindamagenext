import React, { ReactElement } from "react";
import Link from "next/link";

interface NavItem {
  href: string;
  text: string;
}

export default function Navitem({ href, text }: NavItem): ReactElement {
  return (
    <li key={href} className="block p-0 mx-1 w-32 h-9">
      <Link href={href}>
        <a className="flex justify-center items-center w-full h-full m-auto text-center text-base text-textcolor border-2 rounded-lg border-opacity-0 hover:border-opacity-100 hover:text-titlecolor transition duration-200">
          {text}
        </a>
      </Link>
    </li>
  );
}
