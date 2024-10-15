import { featuredProducts } from '@/data'
import Image from 'next/image'
import React from 'react'

const Featured = () => {
  return (
    <div className='w-screen overflow-x-scroll text-red-500'>
      {/* WRAPPER */}
      <div className='w-max flex'>
          {/* SINGLE ITEM */} 
          {featuredProducts.map(item=>(
          <div key={item.id} className='w-screen h-[60vh] flex gap-4 flex-col items-center justify-around p-4'>
            {/* IMAGE CONTAINER */}
            <div className='relative w-full flex-1 '>
              <Image src={item.img} alt="image" fill className='object-contain'/>
            </div>
            {/* TEXT CONTAINER */}
            <div className='flex-1 flex flex-col gap-4 items-center'>
              <h2 className='text-xl font-bold uppercase'>{item.title}</h2>
              <p>{item.desc}</p>
              <span className='text-xl fony-bold'>{item.price}</span>
              <button className='bg-red-500 text-white p-2 rounded-md'>Add to Cart</button>
            </div>
          </div>
            
            ))}
      </div>
    </div>
  )
}

export default Featured