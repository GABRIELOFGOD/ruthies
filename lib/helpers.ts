import { connectDB } from "@/lib/database";
import Product from "@/models/product";
import Category from "@/models/category";
// import { cacheLife } from 'next/cache';
import { NextRequest } from "next/server";
import cloudinary from "./cloudinary";
import { UploadApiResponse } from "cloudinary";

export const uploadFiles = async (
  files: Array<Buffer | string | ArrayBuffer | Blob>,
): Promise<string[]> => {
  const toBuffer = async (
    file: Buffer | string | ArrayBuffer | Blob,
  ): Promise<Buffer> => {
    // Node Buffer already
    if (Buffer.isBuffer(file)) return file as Buffer;

    // String URL -> fetch and get ArrayBuffer
    if (typeof file === "string") {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Failed to fetch file URL: ${file}`);
      const ab = await res.arrayBuffer();
      return Buffer.from(ab);
    }

    // ArrayBuffer
    if (file instanceof ArrayBuffer) return Buffer.from(file);

    // TypedArray / DataView
    if (ArrayBuffer.isView(file)) {
      const view = file as ArrayBufferView;
      return Buffer.from(view.buffer, view.byteOffset, view.byteLength);
    }

    // Blob / File (browser)
    if (typeof Blob !== "undefined" && file instanceof Blob) {
      const ab = await file.arrayBuffer();
      return Buffer.from(ab);
    }

    throw new Error("Unsupported file type");
  };

  const uploadSingle = async (
    file: Buffer | string | ArrayBuffer | Blob,
  ): Promise<string> => {
    const buffer = await toBuffer(file);

    const uploaded = await new Promise<UploadApiResponse>((resolve, reject) => {
      // Use resource_type: "auto" so any file type is accepted
      cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, (error, result) => {
          if (error || !result)
            reject(error ?? new Error("No result from upload"));
          else resolve(result);
        })
        .end(buffer);
    });

    return (uploaded.secure_url ?? uploaded.url) as string;
  };

  const urls = await Promise.all(files.map(uploadSingle));
  return urls;
};

export async function getProducts(request: NextRequest) {
  // 'use cache'
  // cacheLife('hours')

  await connectDB();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const category = searchParams.get("category");
  const published = searchParams.get("published");
  const q = searchParams.get("q");

  const filter: Record<string, unknown> = { isDeleted: { $ne: true } };

  if (id) {
    const product = await Product.findOne({
      _id: id,
      isDeleted: { $ne: true },
    }).lean();
    return product;
  }

  if (published !== null) {
    filter.publisheshed = published === "true";
  }

  if (category) {
    // category can be id or name
    if (/^[0-9a-fA-F]{24}$/.test(category)) {
      filter.category = category;
    } else {
      const cat = await Category.findOne({
        name: category,
        isDeleted: { $ne: true },
      });
      if (cat) filter.category = cat._id;
      else {
        // no matching category -> return empty
        return [];
      }
    }
  }

  if (q) {
    filter.$text = { $search: q };
  }

  const products = await Product.find(filter)
    .populate("category", "name")
    .lean();
  return products;
}

export async function createProduct(request: NextRequest) {
  await connectDB();
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const images = formData.getAll("images") as File[];
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;
  const brand = formData.get("brand") as string;
  const published = formData.get("published") === "true";
  const sizes = formData.getAll("sizes") as string[];
  const colors = formData.getAll("colors") as string[];
  const amountStr = formData.get("stock") as string;
  const gender = formData.get("gender") as string;
  const stock = amountStr ? parseInt(amountStr, 10) : null;

  if (published) {
    if (
      !name ||
      !description ||
      !images.length ||
      !price ||
      !category ||
      !brand ||
      !gender
    ) {
      throw new Error(
        "name, description, images, price, category, brand, and gender are required when publishing",
      );
    }
  }

  let filesUrl: string[] = [];
  if (images && images.length > 0) {
    filesUrl = await uploadFiles(images);
  }

  // resolve category to ObjectId if necessary
  let categoryId: string | typeof Category.prototype._id = category;
  if (!/^[0-9a-fA-F]{24}$/.test(String(category))) {
    const cat = await Category.findOne({
      name: category,
      isDeleted: { $ne: true },
    });
    if (cat) categoryId = cat._id;
    else {
      // create category implicitly
      const created = await Category.create({
        name: category,
        description: "",
        isDeleted: false,
        deletedAt: null,
      });
      categoryId = created._id;
    }
  }

  const newProduct = new Product({
    name,
    description,
    images: filesUrl,
    price,
    category: categoryId,
    brand,
    publisheshed: published,
    sizes,
    colors,
    stock,
    gender,
    isDeleted: false,
    deletedAt: null,
  });
  await newProduct.save();
  return newProduct;
}
