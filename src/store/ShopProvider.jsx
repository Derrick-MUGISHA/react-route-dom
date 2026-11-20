import { useEffect, useReducer, useState } from 'react';
import { ShopContext } from './ShopContext';
import { cartDetails, initialState, shopReducer } from './shop';

const storageKey = 'mystore-demo-v1';

function readState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (!saved || !Array.isArray(saved.cart) || !Array.isArray(saved.orders)) {
      return initialState;
    }

    // Discard invalid saved entries before restoring the cart.
    const validCart = saved.cart.filter((item) => {
      return item && Number.isInteger(item.quantity) && item.quantity > 0;
    });
    const cart = cartDetails(validCart).map((item) => {
      return { id: item.id, quantity: item.quantity };
    });
    const orders = saved.orders.filter((order) => {
      return order && typeof order.email === 'string' && Array.isArray(order.items);
    });
    const user = typeof saved.user?.email === 'string' ? saved.user : null;

    return { cart, orders, user };
  } catch {
    // A missing, invalid, or unreadable saved value starts an empty store.
    return initialState;
  }
}

export default function ShopProvider({ children }) {
  // The third argument initializes state from storage when this provider mounts.
  const [state, dispatch] = useReducer(shopReducer, undefined, readState);
  const [storageError, setStorageError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // This state update reports a failure from an external system (storage).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStorageError('Browser storage is unavailable. Changes will be lost after a refresh.');
    }
  }, [state]);

  // Calculate these values from state instead of keeping extra copies in state.
  const items = cartDetails(state.cart);
  let cartCount = 0;
  for (const item of items) cartCount += item.quantity;

  const value = { ...state, dispatch, items, storageError, cartCount };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
}
