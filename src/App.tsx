import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router";
import "./App.css";
import Header from "./shared/components/header/Header";
import Footer from "./shared/components/footer/Footer";
import Home from "./pages/home/Home";
import Menu from "./pages/menu/Menu";
import AuthProvider from "./context/AuthProvider";
import SignIn from "./pages/signIn/SignIn";
import Register from "./pages/register/Register";
import { CartProvider } from "./context/CartProvider";
import Cart from "./pages/cart/Cart";
import { LocationProvider } from "./i18n/LocationProvider";
import Profile from "./pages/profile/Profile";
import PaymentConfirm from "./pages/paymentConfirm/PaymentConfirm";

const Layout = () => {
  return (
    <LocationProvider>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Outlet />
          <Footer />
        </CartProvider>
      </AuthProvider>
    </LocationProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      { index: true, element: <Navigate to="home" replace /> },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      { path: "signIn", element: <SignIn /> },
      { path: "register", element: <Register /> },
      { path: "cart", element: <Cart /> },
      { path: "profile", element: <Profile /> },
      { path: "payment_confirm", element: <PaymentConfirm /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
