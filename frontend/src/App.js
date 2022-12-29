import "./App.css";
import Navbar from "./component/layout/Navbar/Navbar.js";
import Home from "./component/Home/Home.js";
import Footer from "./component/layout/Footer/Footer.js";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { useEffect, useState } from "react";
import { LoadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import axios from "axios";
import UserProfile from "./component/User/UserProfile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UserList from "./component/Admin/UserList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/Not Found/NotFound";
import NewProduct from "./component/Admin/NewProduct";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
function App() {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { paymentVar } = useSelector((state) => state.cart);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(LoadUser());
    getStripeApiKey();
  }, []);

  // To prevent access to right click menu
  // window.addEventListener("contextmenu",(e)=>e.preventDefault());

  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route path="/Login" element={<LoginSignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected Routes */}

          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route exact path="/account" element={<UserProfile />} />
            <Route exact path="/me/update" element={<UpdateProfile />} />
            <Route exact path="/password/update" element={<UpdatePassword />} />
            <Route exact path="/success" element={<OrderSuccess />} />
            <Route exact path="/orders" element={<MyOrders />} />
            <Route
              exact
              path="/order/confirm"
              element={
                paymentVar === true ? (
                  <ConfirmOrder />
                ) : (
                  <Navigate replace to={"/cart"} />
                )
              }
            />

            <Route
              exact
              path="/shipping"
              element={
                cartItems.length === 0 ? (
               
                  <Navigate replace to={"/cart"} />
                ) : (
                  <Shipping />
                  
                )
              }
            />

            <Route exact path="/order/:id" element={<OrderDetails />} />

            {stripeApiKey && (
              <Route
                exact
                path="/process/payment"
                element={
                  paymentVar === true ? (
                    <Elements stripe={loadStripe(stripeApiKey)}>
                      <Payment />
                    </Elements>
                  ) : (
                    <Navigate replace to={"/"} />
                  )
                }
              />
            )}
          </Route>

          <Route
            path="/admin/dashboard"
            isAuthenticated={isAuthenticated}
            element={
              loading === false && user?.role === "admin" ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/admin/products"
            isAuthenticated={isAuthenticated}
            element={
              loading === false && user?.role === "admin" ? (
                <ProductList />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/admin/product"
            isAuthenticated={isAuthenticated}
            element={
              loading === false && user?.role === "admin" ? (
                <NewProduct />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/admin/product/:id"
            isAuthenticated={isAuthenticated}
            element={
              loading === false && user?.role === "admin" ? (
                <UpdateProduct />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/admin/orders"
            isAuthenticated={isAuthenticated}
            element={
              loading === false && user?.role === "admin" ? (
                <OrderList />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/order/:id"
            isAuthenticated={isAuthenticated}
            element={
              loading === false && user?.role === "admin" ? (
                <ProcessOrder />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/users"
            isAuthenticated={isAuthenticated}
            element={
              loading === false && user?.role === "admin" ? (
                <UserList />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/user/:id"
            isAuthenticated={isAuthenticated}
            element={
              loading === false && user?.role === "admin" ? (
                <UpdateUser />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/admin/reviews"
            isAuthenticated={isAuthenticated}
            element={
              loading === false && user?.role === "admin" ? (
                <ProductReviews />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
