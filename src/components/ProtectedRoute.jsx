import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useShop } from '../store/ShopContext';

export default function ProtectedRoute() {
  const { user } = useShop();
  const location = useLocation();

  // Signed-in visitors can render the matched child route.
  if (user) return <Outlet />;

  // Save the requested page so sign-in can send the visitor back.
  return (
    <Navigate
      to="/login"
      replace
      state={{ from: location.pathname + location.search }}
    />
  );
}
