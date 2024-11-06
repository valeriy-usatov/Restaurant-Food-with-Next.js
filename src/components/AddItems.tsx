'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';

const AddItems = () => {
  const { data: session, status } = useSession();
  if (status === 'loading') return 'Loading...';

  if (status === 'unauthenticated' || !session?.user.isAdmin) return;

  return (
    <div className="fixed right-20 top-40 z-50">
      <Link href="/add" className="">
        {/* <h3>Add Items</h3> */}
        <Image src="/add-to.svg" alt="" width={40} height={40} />
      </Link>
    </div>
  );
};

export default AddItems;
