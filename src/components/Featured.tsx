import { featuredProducts } from '@/data'
import Image from 'next/image'


const Featured = () => {
  return (
    <div className='w-screen overflow-x-scroll text-red-500'>
      {/* WRAPPER */}
      <div className='w-max flex'>
          {/* SINGLE ITEM */} 
          {featuredProducts.map(item=>(
          <div key={item.id} className='w-screen h-[60vh] xl:h-[90vh] md:w-[50vw] xl:w-[33vw] flex gap-4 flex-col items-center justify-around p-4 hover:bg-fuchsia-50 transition-all duration-300'>
            {/* IMAGE CONTAINER */}
            {item.img && (
              <div className='relative w-full flex-1 hover:rotate-90 transition-all ease-in-out duration-500'>
              <Image src={item.img} alt="image" fill className='object-contain'/>
            </div>
              )}
            {/* TEXT CONTAINER */}
            <div className='flex-1 flex flex-col gap-4 items-center justify-center text-center'>
              <h2 className='text-xl xl:text-2xl 2xl:text-3xl font-bold uppercase'>{item.title}</h2>
              <p className='p-4 2xl:p-8'>{item.desc}</p>
              <span className='text-xl font-bold'>${item.price}</span>
              <button className='bg-red-500 text-white p-2 rounded-md'>Add to Cart</button>
            </div>
          </div>
            
            ))}
      </div>
    </div>
  )
}

export default Featured