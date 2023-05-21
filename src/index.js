import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import ProductProvider from "./context/ProductContext";
import { BrowserRouter as Router } from "react-router-dom";
import CartProvider from "./context/CartContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <ProductProvider>
      <CartProvider>
    <App />
    </CartProvider>
    </ProductProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
