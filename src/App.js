import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/Signup';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
 import CartPage from './pages/CarPage';

import ProductDetailsPage from './pages/ProductDetailsPage';
import Checkout from "./pages/Checkout";
import Protected from './features/auth/components/Protected';
import { fetchItemsByUserIdAsync } from './features/cart/CartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPassWordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailsPage from './pages/AdminProductDetailsPage';
import ProductForm from './features/admin/components/ProductForm';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
       <Protected>
          <Home></Home>
       </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
       <ProtectedAdmin>
          <AdminHome></AdminHome>
       </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: (
      <LoginPage></LoginPage>
    ),
  },
  {
    path: "/signup",
    element: (
      <SignupPage></SignupPage>
    ),
  },
  {
    path: "/cart",
    element: (
      <Protected>
         <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
         <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
      <ProductDetailsPage></ProductDetailsPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
      <AdminProductDetailsPage></AdminProductDetailsPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
      <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
      <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "order-success/:id",
    element: (
        <OrderSuccessPage></OrderSuccessPage>
    ),
  },
  {
    path: "/orders",
    element: (
        <UserOrdersPage></UserOrdersPage>
    ),
  },
  {
    path: "/profile",
    element: (
        <UserProfilePage></UserProfilePage>
    ),
  },
  {
    path: "/logout",
    element: (
        <Logout></Logout>
    ),
  },
  {
    path: "/forgot-password",
    element: (
        <ForgotPassWordPage></ForgotPassWordPage>
    ),
  },
  {
    path: "*",
    element: (
        <PageNotFound></PageNotFound>
    ),
  },
]);

function App() {
   const dispatch = useDispatch();
   const user = useSelector(selectLoggedInUser);

   useEffect(() => {
    if(user){
      console.log(user);
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
   },[dispatch, user])

  return (
    <div className="App">
    <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router} />
      </Provider>
      {/* Link must be inside provider */}
    </div>
  );
}

export default App;
