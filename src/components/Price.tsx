'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/utils/store';
import { ProductTypes } from '@/types/types';
import { toast } from 'react-toastify';

const Price = ({ product }: { product: ProductTypes }) => {
  const { addToCart } = useCartStore();

  const [total, setTotal] = useState(product.price);
  const [quantity, setQuantity] = useState(1);
  const [selected, setSelected] = useState(0);

  console.log('price', product.price);

  //Про код ниже, По умолчанию, zustand с persist автоматически восстанавливает состояние из localStorage при создании хранилища. Однако, если по какой-то причине автоматическая загрузка состояния не происходит (например, при серверном рендеринге или определенных условиях обновления), rehydrate() гарантирует, что сохраненное состояние будет восстановлено при монтировании компонента.

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (product.options && product.options.length > 0) {
      setTotal(quantity * product.price + +product.options[selected].additionalPrice);
    } else {
      setTotal(quantity * product.price);
    }
  }, [quantity, selected, product]);

  const handleCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: total,
      ...(product.options?.length && {
        optionTitle: product.options[selected].title,
      }),
      quantity: quantity,
    });
    toast.success('The product added to the cart!');
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <h2 className="text-2xl font-bold">${total}</h2>
      {/* OPTION CONTAINER */}
      <div className="flex gap-4">
        {product.options && product.options.length > 0 &&
          product.options?.map((option, index) => (
            <button
              key={option.title}
              onClick={() => setSelected(index)}
              className={`min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md ${
                selected === index ? 'bg-red-500 text-white' : ''
              }`}
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
            <button onClick={() => setQuantity((prev) => (prev >= 9 ? 9 : prev + 1))}>{'>'}</button>
          </div>
        </div>
        {/* CART BUTTON */}
        <button
          className="bg-red-500 text-white p-2 ring-1 ring-red-500 uppercase"
          onClick={handleCart}
        >
          Add to Cart!
        </button>
      </div>
    </div>
  );
};

export default Price;
