import Image from 'next/image'
import React from 'react'
import Link from 'next/link'


const LoginPage = () => {
  return (
    <div className='p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center'>
      {/* BOX */}
      <div className='h-full md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2 shadow-2xl rounded-md flex flex-col md:flex-row justify-center'>
        {/* IMAGE */}
        <div className='relative h-1/3  md:w-1/2 md:h-full'>
        <Image src="/loginBg.png" alt="login" fill className='object-cover'/>
        </div>
        {/* FORM CONTAINER  */}
        <div className='h-2/3 md:h-full md:w-1/2 p-10 flex flex-col gap-8 '>
          <h2 className='font-bold text-xl xl:text-3xl'>Welcome</h2>
          <p>Log into your account or create a new one using social buttons</p>
          <button className='flex items-center gap-4 p-4 ring-1 ring-orange-100 rounded-md'>
            <Image src="/google.png" alt="google" width={20} height={20}/>
            <span>Sign in with Google</span>
          </button>
          <button className='flex items-center gap-4 p-4 ring-1 ring-blue-100 rounded-md'>
            <Image src="/facebook.png" alt="google" width={20} height={20}/>
            <span>Sign in with Facebook</span>
          </button>
          <p className="text-sm">
            Have a problem?<Link className="underline" href="/"> Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage