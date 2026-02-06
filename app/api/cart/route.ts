import { cookies } from "next/headers";

interface CartItem {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
}

interface Cart {
  items: CartItem[];
  total: number;
  updatedAt: string;
}

// In-memory storage for demo (replace with database in production)
const carts = new Map<string, Cart>();

function getOrCreateCart(cartId: string): Cart {
  if (!carts.has(cartId)) {
    carts.set(cartId, {
      items: [],
      total: 0,
      updatedAt: new Date().toISOString(),
    });
  }
  return carts.get(cartId)!;
}

function calculateTotal(cart: Cart): number {
  return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    let cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      cartId = `cart-${Date.now()}-${Math.random()}`;
    }

    const cart = getOrCreateCart(cartId);

    return Response.json({
      cartId,
      cart: {
        ...cart,
        total: calculateTotal(cart),
      },
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return Response.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, quantity = 1, size, color, price } = body;

    if (!productId || !price) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    let cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      cartId = `cart-${Date.now()}-${Math.random()}`;
    }

    const cart = getOrCreateCart(cartId);

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        size,
        color,
        price,
      });
    }

    cart.total = calculateTotal(cart);
    cart.updatedAt = new Date().toISOString();

    return Response.json(
      {
        message: "Item added to cart",
        cartId,
        cart,
      },
      {
        headers: {
          "Set-Cookie": `cartId=${cartId}; Path=/; HttpOnly; SameSite=Lax`,
        },
      }
    );
  } catch (error) {
    console.error("Error adding to cart:", error);
    return Response.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { productId, quantity, size, color } = body;

    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      return Response.json({ error: "Cart not found" }, { status: 404 });
    }

    const cart = getOrCreateCart(cartId);
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
    );

    if (itemIndex === -1) {
      return Response.json({ error: "Item not found in cart" }, { status: 404 });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    cart.total = calculateTotal(cart);
    cart.updatedAt = new Date().toISOString();

    return Response.json({
      message: "Cart updated",
      cart,
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    return Response.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const size = searchParams.get("size");
    const color = searchParams.get("color");

    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      return Response.json({ error: "Cart not found" }, { status: 404 });
    }

    const cart = getOrCreateCart(cartId);
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
    );

    if (itemIndex === -1) {
      return Response.json({ error: "Item not found in cart" }, { status: 404 });
    }

    cart.items.splice(itemIndex, 1);
    cart.total = calculateTotal(cart);
    cart.updatedAt = new Date().toISOString();

    return Response.json({
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return Response.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
