import { createProduct, getProducts } from '@/lib/helpers'
import { NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const products = await getProducts(request);
  return Response.json(products);
}

export async function POST(request: NextRequest) {
  const newProduct = await createProduct(request);
  return Response.json(newProduct);
}
