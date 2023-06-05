import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Filters from "./components/Filters";

import Header from "./components/Header";
import Home from "./pages/HomePage";
// import Mockman from "mockman-js";
import Products from "./pages/ProductsListingPage";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import RequiresAuth from "./components/RequiresAuth";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Address from "./pages/Address";
import SignUp from "./pages/SignUp";

function App() {
  const { checkUserStatus } = useContext(AuthContext);

  useEffect(() => {
    checkUserStatus();
  }, []);
  return (
    <div className="App">
      {/* <Mockman /> */}
     <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={
            <RequiresAuth>
              <Cart />
            </RequiresAuth>
          }
        />
        <Route path="/address" element={<Address />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/wishlist"
          element={
            <RequiresAuth>
              <Wishlist />
            </RequiresAuth>
          }
        />
      </Routes>

     
    </div>
  );
}

export default App;
