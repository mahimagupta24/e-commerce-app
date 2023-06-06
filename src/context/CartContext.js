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

  const [discount, setDiscount] = useState(0);

  const totalPrice = cartProducts.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0
  );
  console.log(totalPrice);

  
  const qty = cartProducts.reduce((acc, curr) => acc + curr.qty, 0);
  const grandTotal = totalPrice - discount;
  console.log(grandTotal);
  
  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addCartItems,isCartProductPresent ,removeCartHandler,discount,setDiscount,qty,grandTotal,totalPrice}}
    >
      {children}
    </CartContext.Provider>
  );
}
