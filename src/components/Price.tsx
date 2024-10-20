'use client';

import { useState, useEffect } from 'react';

type Props = {
  price: number;
  id: number;
  options?: { title: string; additionalPrice: number }[];
};

const Price = ({ price, options }: Props) => {
  const [total, setTotal] = useState(price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

 
  
  useEffect(() => {
    setTotal(
      quantity * (options ? price + options[selected].additionalPrice : price)
    );
  }, [quantity, selected, options, price]);


  return (
    <div className="flex flex-col justify-center gap-4">
      <h2 className="text-2xl font-bold">${total.toFixed(2)}</h2>
      {/* OPTION CONTAINER */}
      <div className="flex gap-4">
        {options?.map((option, index) => (
          <button
            key={option.title}
            onClick={() => setSelected(index)}
            className={`min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md ${selected===index ? ('bg-red-500 text-white'): ""}`}
          >
            {option.title}
          </button>
        ))}
      </div>
      {/* QUANTITY AND BUTTON CONTAINER */}
      <div className="flex justify-between items-center">
        {/* QUANTITY  */}
        <div className="flex justify-between flex-1 ring-1 ring-gray-300 p-2">
          <span className="">quantity</span>
          <div className="flex gap-4">
            <button onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}>
              {'<'}
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) =>  prev >= 9 ? 9 : prev + 1)}>{'>'}</button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button className="bg-red-500 text-white p-2 ring-1 ring-red-500 uppercase">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Price;
