'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import CartIcon from './CartIcon';

const links = [
  { id: 1, title: 'Homepage', url: '/' },
  { id: 2, title: 'Menu', url: '/menu' },
  { id: 3, title: 'Working Hours', url: '/' },
  { id: 4, title: 'Contact', url: '/' },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = false;
  return (
    <div className="">
      {!isOpen ? (
        <Image src="/open.png" alt="open" width={20} height={20} onClick={() => setIsOpen((prev) => !prev)}/>
      ) : (
        <Image src="/close.png" alt="open" width={20} height={20} onClick={() => setIsOpen((prev) => !prev)}/>
      )}
      {isOpen && (
        <div className="bg-red-500 h-[calc(100vh-6rem)] text-3xl w-full text-white absolute  left-0 top-24 flex flex-col gap-8 items-center justify-center z-10">
          {links.map(({ id, url, title }) => (
            <Link href={url} key={id} onClick={()=>setIsOpen(false)}>
              {title}
            </Link>
          ))}
          {!user ? (
          <Link href="/login" onClick={()=>setIsOpen(false)}>Login</Link>
          ): (
            <Link href="/orders" onClick={()=>setIsOpen(false)}>Orders</Link>
          )}
          <Link href="/cart" onClick={()=>setIsOpen(false)}>
            <CartIcon/>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;
