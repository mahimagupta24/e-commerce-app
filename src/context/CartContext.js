import { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext()

export default function CartProvider({children}){
    const [cartProducts,setCartProducts]=useState([]);
   
    const handleAddCartItems = (product) => {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ODI4MzFlMC02ODUxLTQ1NGQtYTQyNC04ODJiMmJiNGE5MjkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.dug-ofAz7IuYiDLCVZRVaaOl_TuUPoT-fxbUN9uKkvw";
        axios
          .post(
            "/api/user/cart",
            { product },
            {
              headers: {
                authorization: `bearer ${token}`,
              },
            }
          )
          .then((resp) => {
            setCartProducts(resp.data.cart);
          })
          .catch((e) => console.error(e));
      };
    

return <CartContext.Provider value={{cartProducts,setCartProducts,handleAddCartItems}}>{children}</CartContext.Provider>
}