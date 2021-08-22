import Link from 'next/link';
import { ReactElement } from 'react';
import Navitem from './Navitem';

interface NavItem {
  href: string;
  text: string;
}
const navitems: NavItem[] = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/documents',
    text: 'Documents',
  },
  {
    href: '/boards',
    text: 'Boards',
  },
];
export default function Navigation(): ReactElement {
  const NavItems = navitems.map(({ href, text }) => {
    return <Navitem href={href} text={text} key={href} />;
  });
  return (
    <nav>
      <ul className="flex justify-center">{NavItems}</ul>
    </nav>
  );
}
