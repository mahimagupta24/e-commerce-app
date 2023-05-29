import { createContext, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { ProductContext } from "./ProductContext";

export const CartContext = createContext()

export default function CartProvider({children}){
    const [cartProducts,setCartProducts]=useState([]);
    const{product} = useContext(ProductContext)
    
    // const {token,loginHandler} = useContext(AuthContext)
   
    const handleAddCartItems = async(product) => {
      // loginHandler()
         const token =
           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ODI4MzFlMC02ODUxLTQ1NGQtYTQyNC04ODJiMmJiNGE5MjkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.dug-ofAz7IuYiDLCVZRVaaOl_TuUPoT-fxbUN9uKkvw";
       try{
        const response = await fetch('/api/user/cart',{
          method:'POST',
          headers:{
            authorization:`bearer ${token}`
          },body:JSON.stringify({product})
        })
        if(response.status===201){
          const data= await response.json()
          setCartProducts(data.cart)
        }
        }catch(e){
          console.error(e)
        }
       
           // axios
        //   .post(
        //     "/api/user/cart",
        //     { product },
        //     {
        //       headers: {
        //         authorization: `bearer ${token}`,
        //       },
        //     }
        //   )
        //   .then((resp) => {
        //     setCartProducts(resp.data.cart);
        //   })
        //   .catch((e) => console.error(e));
      };
      const isCartProductPresent = cartProducts.some(
        (cartProduct) => cartProduct?._id === product?._id
      );

return <CartContext.Provider value={{isCartProductPresent, cartProducts,setCartProducts,handleAddCartItems}}>{children}</CartContext.Provider>
}