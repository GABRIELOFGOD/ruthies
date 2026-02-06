import { createProduct, getProducts } from "@/lib/helpers";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Product from "@/models/product";

export async function GET(request: NextRequest) {
  const products = await getProducts(request);
  return Response.json(products);
}

export async function POST(request: NextRequest) {
  const newProduct = await createProduct(request);
  return Response.json(newProduct);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, price, stock, category, publisheshed } =
      body;

    if (!id) {
      return NextResponse.json(
        { error: "Product id is required" },
        { status: 400 },
      );
    }

    await connectDB();
    const product = await Product.findById(id);
    if (!product || product.isDeleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (category !== undefined) product.category = category;
    if (publisheshed !== undefined) product.publisheshed = publisheshed;

    await product.save();
    return NextResponse.json(product);
  } catch (error) {
    console.log("Error Updating", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Product id is required" },
        { status: 400 },
      );
    }

    await connectDB();
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Soft delete
    product.isDeleted = true;
    product.deletedAt = new Date();
    await product.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error Deleting", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
