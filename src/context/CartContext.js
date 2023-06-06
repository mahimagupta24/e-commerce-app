import { createContext, useState } from "react";
import {toast} from "react-toastify"
import axios from "axios";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  

  // const {token,loginHandler} = useContext(AuthContext)

  const addCartItems = async (product) => {
    // loginHandler()
    const token = localStorage.getItem("token")
    try {
      const response = await fetch("/api/user/cart", {
        method: "POST",
        headers: {
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ product }),
      });
      if (response.status === 201) {
        const data = await response.json();

        setCartProducts(data.cart);
        toast.success(`${product.name} added to cart!`);

      }
    } catch (e) {
      console.error(e);
    }

  };

  const removeCartHandler = (productId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`/api/user/cart/${productId}`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((resp) => {
        setCartProducts(resp.data.cart);
        toast.success("item removed from cart");
      })
      .catch((e) => console.error(e));
  };
  const isCartProductPresent = (id)=>{
    return cartProducts.some((cartProduct) => cartProduct?._id === id)
  }

  
  
  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addCartItems,isCartProductPresent ,removeCartHandler}}
    >
      {children}
    </CartContext.Provider>
  );
}
