import DeleteButton from '@/components/DeleteButton';
import Price from '@/components/Price';
import { ProductTypes } from '@/types/types';
import Image from 'next/image';
// import { getAuthSession } from '../../../../auth';

const getData = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed!');
  }

  return res.json();
};

type Props = {
  params: { id: string };
};

const SingleProduct = async ({ params }: Props) => {
  const singleProduct: ProductTypes = await getData(params.id);
  
  return (
    <div className="p-4 lg:px-20 xl:px-40 h-screen flex flex-col justify-around text-red-500 md:flex-row md:gap-8 md:items-center relative">
      {/* IMAGE CONTAINER */}
      {singleProduct.img && (
        <div className="relative w-full md:w-1/2 h-1/2 md:h-[70%]">
          <Image src={singleProduct.img} alt="" fill className="object-contain" />
        </div>
      )}
      {/* TEXT CONTAINER */}
      <div className="flex flex-col gap-4 h-1/2 md:h-[70%] md:w-1/2 md:justify-center md:gap-6 xl:gap-8">
        <h2 className="text-3xl xl:text-4xl font-bold uppercase">{singleProduct.title}</h2>
        <p>{singleProduct.desc}</p>
        <Price product={singleProduct} />
      </div>
      <DeleteButton id={singleProduct.id} />
    </div>
  );
};

export default SingleProduct;
