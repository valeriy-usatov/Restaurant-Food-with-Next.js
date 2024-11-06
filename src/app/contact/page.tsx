import React from 'react';
import Image from 'next/image';
const page = () => {
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:px-20 xl:px-40  flex flex-col items-center justify-center">
      <h3 className='text-3xl mb-5'>Our contacts</h3>
      <div className="flex items-center gap-2 p-3 cursor-pointer bg-orange-300 rounded-md">
        <Image src="/phone.png" alt="phone" width={20} height={20} />
        <span className='text-2xl'>555444</span>
      </div>
    </div>
  );
};

export default page;
