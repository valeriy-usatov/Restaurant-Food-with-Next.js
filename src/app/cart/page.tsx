import Image from 'next/image';


const CartPage = () => {
  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col lg:flex-row text-red-500">
      {/* PRUDUCTS CONTAINER */}
      <div className="h-1/2 lg:h-full lg:w-2/3 2xl:w-1/2 p-4 flex flex-col overflow-scroll lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6">
        {/* SINGLE ITEM */}
        <div className="flex justify-between items-center mb-4">
          <Image src="/temporary/p1.png" alt="" width={100} height={100} />
          <div>
            <h2 className="uppercase text-xl font-bold">siscilian</h2>
            <span>Large</span>
          </div>
          <h3 className="font-bold">$80</h3>
          <button className="cursor-pointer">X</button>
        </div>
        {/* SINGLE ITEM */}
        <div className="flex justify-between items-center mb-4">
          <Image src="/temporary/p1.png" alt="" width={100} height={100} />
          <div>
            <h2 className="uppercase text-xl font-bold">siscilian</h2>
            <span>Large</span>
          </div>
          <h3 className="font-bold">$80</h3>
          <button className="cursor-pointer">X</button>
        </div>
        
         
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 lg:h-full lg:w-1/3 2xl:w-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:px-20 xl:px-40">
        <div className="flex justify-between items-center">
          <span>Sybtotal (3 items)</span>
          <span>$81.7</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Service Cost</span>
          <span>$0</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Delivery Cost</span>
          <span className='text-green-500'>FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between items-center">
          <span>TOTAL(INCL.VAT)</span>
          <span className='font-bold'>$81.7</span>
        </div>
        <button className="bg-red-500 p-3 text-white rounded-md w-1/2 ml-auto">CHECKOUT</button>
      </div>
    </div>
  );
};

export default CartPage;
