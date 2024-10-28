import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/connect';
import { getAuthSession } from '../../../../auth';

// FETCH ALL ORDERS
export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });

  if (session) {
    try {
      if (session.user.isAdmin) {
        const orders = await prisma.order.findMany();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email!,
        },
      });
      return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse(JSON.stringify({ message: 'Something went wrong!' }), {
        status: 500,
      });
    }
  } else {
    return new NextResponse(JSON.stringify({ message: 'You are not authenticated' }), {
      status: 401,
    });
  }
};