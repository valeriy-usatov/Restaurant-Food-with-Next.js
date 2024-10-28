'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const UserLinks = () => {
  const { data, status } = useSession();
  console.log(status);
  console.log(data);

  return (
    <div>
      {data ? (
        <div className="flex gap-3">
          <Link href="/orders">Orders</Link>
          <button className='cursor-pointer uppercase' onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default UserLinks;
