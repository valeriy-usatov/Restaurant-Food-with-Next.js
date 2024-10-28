import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/utils/connect";

// FETCH ALL PRODUCTS

export const GET = async (req:NextRequest) => {
    const {searchParams} = new URL(req.url);
    const cat = searchParams.get("cat")

    // localhost3000/api/products?cat="pizzaz"
try {
    const products = await prisma.product.findMany({
    where: {
    ...(cat ? {catSlug:cat} : {isFeatured:true}),
    }
    })
    return new NextResponse
    (JSON.stringify(products), {status:200});

} catch (error) {
    console.log(error)
    return new NextResponse(JSON.stringify({message:"Something went wrong!"}), {status:500});
    
}

};