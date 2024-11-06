'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OrderType } from '@/types/types';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import { toast } from "react-toastify";


const Orders = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () => fetch('http://localhost:3000/api/orders').then((res) => res.json()),
  });
  console.log(data);

  if (status === 'unauthenticated') {
    router.push('/');
  }


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => {
      return fetch(`http://localhost:3000/api/orders/${id}`, {
        method:"PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(status),
      });
    },
    onSuccess() {  /* функция, которая вызывается после успешного выполнения mutationFn. */
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
 
  // queryClient.invalidateQueries({ queryKey: ["orders"] }): используется для сброса кэша запроса с ключом ["orders"], что приводит к повторному запросу данных (обновляет список заказов с сервера с учетом новых данных).

  function handleUpdate(e:React.FormEvent<HTMLFormElement>, id:string) {
    e.preventDefault();

    try {
      const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement
    const status = input.value;
    mutation.mutate({ id, status });
    console.log(e.target);
    toast.success("The order status has been changed!")
    
  } catch (error) {
      console.error("Failed to execute querySelector:", error);
  }
    
  }
  

  if (isLoading || status === 'loading') return <p>Loading...</p>;

  if(status==="unauthenticated" || !session?.user.isAdmin) {
    return
}

  return (
    <div className="p-4 lg:px20 xl:px-40">
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order Id</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="">
          {data.map((item: OrderType) => (
            <tr className={`text-sm md:text-base ${item.status!=="delevered" && "bg-red-50"} `} key={item.id}>
              <td className="hidden md:block py-6 px-1">{item.id}</td>
              <td className="py-6 px-1">{item.createdAt.toString().slice(0, 10)}</td>
              <td className="py-6 px-1">{item.price}</td>
              <td className="hidden md:block py-6 px-1">{item.products[0].title}</td>
              {session?.user.isAdmin ? (
              <td>
                <form className='flex items-center justify-center gap-4' onSubmit={(e)=>handleUpdate(e, item.id)}>
                <input placeholder={item.status} className='p-2 ring-1 ring-red-100 rounded-md'/>
                <button className='p-2 bg-red-400 rounded-full'>
                  <Image src="/edit.png" alt="" width={20} height={20}/>
                </button>
                </form>
                
              </td>
              ) : (
                <td className="py-6 px-1"> {item.status} </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
