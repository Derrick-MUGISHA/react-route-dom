import { createContext, useContext } from 'react';

export const ShopContext = createContext(null);

// A custom hook shares behavior; the provider shares the actual state.
export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used inside ShopProvider');
  return context;
}
