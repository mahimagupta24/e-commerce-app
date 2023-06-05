import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import ProductProvider from "./context/ProductContext";
import { BrowserRouter as Router } from "react-router-dom";
import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";
import AuthProvider from "./context/AuthContext";
 import AddressProvider from "./context/AddressContext";

// Call make Server
makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            
              <AddressProvider>
              <AuthProvider>
              <App />
              </AuthProvider>
              </AddressProvider>
            
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </Router>
  </React.StrictMode>,
);
