import { pizzas } from '@/data';
import Link from 'next/link';
import Image from 'next/image';

const Category = () => {
  return (
    <div className="flex flex-wrap text-red-500">
      {pizzas.map((item) => (
        <Link
          className={`w-full sm:w-1/2 lg:w-1/3 h-[60vh] border-r-2 border-b-2 border-red-500 p-4 flex flex-col justify-between even:bg-fuchsia-50`}
          href={`/product/${item.id}`}
          key={item.id}
        >
          {/* IMAGE CONTAINER */}
          {item.img && (
            <div className="relative h-[80%]">
              <Image src={item.img} alt="" fill className="object-contain" />
            </div>
          )}
          {/* TEXT CONTAINER */}
          <div className="flex justify-between items-center font-bold">
            <div className="text-2xl p-2 uppercase">{item.title}</div>
            <div className="group">
              <div className="text-xl p-2 group-hover:hidden">${item.price}</div>
              <button className="hidden group-hover:block bg-red-500 text-white p-2 rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Category;
