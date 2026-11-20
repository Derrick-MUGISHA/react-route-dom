import { products } from '../data/products.js';

// This is the starting value for the shared store.
export const initialState = { cart: [], user: null, orders: [] };

export function money(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function findById(id) {
  // URL parameters are strings, but our catalog IDs are numbers.
  return products.find((product) => String(product.id) === String(id));
}

export function findBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function cartDetails(cart) {
  const items = [];

  for (const entry of cart) {
    const product = findById(entry.id);
    if (!product) continue;

    // Keep saved quantities between one and the available stock.
    const requestedQuantity = Math.floor(Number(entry.quantity)) || 1;
    const quantity = Math.min(product.stock, Math.max(1, requestedQuantity));
    items.push({ ...product, quantity });
  }

  return items;
}

export function totals(items) {
  let subtotal = 0;

  for (const item of items) {
    subtotal += item.price * item.quantity;
  }

  let shipping = 10;
  if (subtotal === 0 || subtotal >= 200) shipping = 0;

  return { subtotal, shipping, total: subtotal + shipping };
}

// A reducer receives the current state and an action describing what happened.
// It returns new state. It does not change the original state or write storage.
export function shopReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const product = findById(action.id);
      if (!product) return state;

      const existing = state.cart.find((item) => item.id === product.id);
      let nextCart;

      if (existing) {
        nextCart = state.cart.map((item) => {
          if (item.id !== product.id) return item;
          const quantity = Math.min(item.quantity + 1, product.stock);
          return { ...item, quantity };
        });
      } else {
        nextCart = [...state.cart, { id: product.id, quantity: 1 }];
      }

      return { ...state, cart: nextCart };
    }

    case 'quantity': {
      const product = findById(action.id);
      if (!product) return state;

      const quantity = Math.min(
        product.stock,
        Math.floor(Number(action.quantity)),
      );

      // Zero, negative, or invalid quantities remove the selected item.
      if (!(quantity > 0)) {
        const nextCart = state.cart.filter((item) => item.id !== action.id);
        return { ...state, cart: nextCart };
      }

      const nextCart = state.cart.map((item) => {
        if (item.id !== action.id) return item;
        return { ...item, quantity };
      });
      return { ...state, cart: nextCart };
    }

    case 'login':
      return { ...state, user: action.user };

    case 'logout':
      return { ...state, user: null };

    case 'order': {
      const items = cartDetails(state.cart);
      if (!state.user || items.length === 0) return state;

      const order = {
        id: action.id,
        createdAt: action.createdAt,
        email: state.user.email,
        items,
        ...totals(items),
        delivery: action.delivery,
      };

      // Save the order and empty the bag together in one update.
      return { ...state, cart: [], orders: [order, ...state.orders] };
    }

    default:
      return state;
  }
}
