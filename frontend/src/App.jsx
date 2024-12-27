import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./home/Home";
import Products from "./products/Products";
import CreateProducts from "./products/CreateProducts";
import ProductDetails from "./products/ProductDetails";
import UpdateProduct from "./products/UpdateProduct";
import FlippyStoreAllProducts from "./products/FlippyStoreAllProducts";
import SignUp from "./auth/SignUp";
import Login from "./auth/Login";
import Profile from "./auth/Profile";
import Dashboard from "./admin/Dashboard";
import Cart from "./customer/Cart";

const appRouters = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/createProducts",
    element: <CreateProducts />,
  },
  {
    path: "/products/viewProductDetails/:id",
    element: <ProductDetails />,
  },
  {
    path: "/products/updateProduct/:id",
    element: <UpdateProduct />,
  },
  {
    path: "/flippyStoreAllProducts",
    element: <FlippyStoreAllProducts />,
  },

  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/login',
    element: <Login />,
  },

  // profile route
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },


  // admin route
  {
    path : "/admin/Dashboard",
    element : <Dashboard />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouters} />
    </>
  );
}
export default App;
