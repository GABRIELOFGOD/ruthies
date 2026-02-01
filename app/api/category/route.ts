import { NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Category from "@/models/category";

// GET /api/category - list categories
export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

// POST /api/category - create category
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, imageBase64 } = body as {
      name?: string;
      description?: string;
      imageBase64?: string | null;
    };

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    await connectDB();
    const category = await Category.create({
      name,
      description: description || undefined,
      image: imageBase64 || null,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 },
    );
  }
}

// PUT /api/category - update category (expects { id, ...fields } in JSON)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, imageBase64 } = body as {
      id?: string;
      name?: string;
      description?: string;
      imageBase64?: string | null;
    };

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await connectDB();
    const category = await Category.findById(id);
    if (!category)
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );

    if (name !== undefined) category.name = name;
    if (description !== undefined) category.description = description;
    if (imageBase64 !== undefined) category.image = imageBase64;

    await category.save();
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 },
    );
  }
}

// DELETE /api/category - delete category (expects { id } in JSON)
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body as { id?: string };
    if (!id)
      return NextResponse.json({ error: "id is required" }, { status: 400 });

    await connectDB();
    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 },
    );
  }
}
