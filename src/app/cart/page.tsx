'use client';
import { useEffect } from 'react';
import { useCartStore } from '@/utils/store';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const {data:session} =  useSession();
const router = useRouter()

  const { products, totalItems, totalPrice, removeFromCart } = useCartStore();
  console.log("products", products);
  
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/login");
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            price: totalPrice,
            products,
            status: "Not Paid!",
            userEmail: session.user.email,
          }),
        });
        const data =await res.json()
        router.push(`/pay/${data.id}`)
      } catch (err) {
        console.log(err);
      }
    }
  };


  return (
    <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col lg:flex-row text-red-500">
      {/* PRUDUCTS CONTAINER */}
      <div className="h-1/2 lg:h-full lg:w-2/3 2xl:w-1/2 p-4 flex flex-col justify-center overflow-scroll lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6 ">
        {/* SINGLE ITEM */}
        {products.map((item) => (
          <div key={item.title + item.id} className="flex justify-between items-center mb-4 gap-16">
            {item.img && <Image src={item.img} alt="" width={100} height={100} />}
            <div className="flex-1">
              <h2 className="uppercase text-xl font-bold">{item.title} {item.quantity>=2 ? `(${item.quantity})` : "" }</h2>
              <span>{item.optionTitle}</span>
            </div>
            <h3 className="font-bold">{item.price}</h3>
            <button className="cursor-pointer" onClick={() => removeFromCart(item)}>
              X
            </button>
          </div>
        ))}
      </div>
      {/* PAYMENT CONTAINER */}
      <div className="h-1/2 lg:h-full lg:w-1/3 2xl:w-1/2 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:px-20 xl:px-40">
        <div className="flex justify-between items-center">
          <span>Sybtotal ({totalItems} items)</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Service Cost</span>
          <span>$0</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Delivery Cost</span>
          <span className="text-green-500">FREE!</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between items-center">
          <span>TOTAL(INCL.VAT)</span>
          <span className="font-bold">{totalPrice}</span>
        </div>
        <button className="bg-red-500 p-3 text-white rounded-md w-1/2 ml-auto" onClick={handleCheckout}>CHECKOUT</button>
      </div>
    </div>
  );
};

export default CartPage;
