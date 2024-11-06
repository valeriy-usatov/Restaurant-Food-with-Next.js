'use client';
import { useCartStore } from '@/utils/store';
import { ProductTypes } from '@/types/types';
import { toast } from 'react-toastify';

const AddToCartButton = ({ item }: { item: ProductTypes }) => {
  const { addToCart } = useCartStore();

  const handleCart = () => {
    addToCart({
      id: item.id,
      title: item.title,
      img: item.img,
      price: +item.price,
      quantity:1
    });
    toast.success('The product added to the cart!');
  };

  return (
    <button className="bg-red-500 text-white p-2 rounded-md" onClick={handleCart}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
