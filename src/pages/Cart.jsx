import axios from "axios";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cartProducts ,setCartProducts} = useContext(CartContext);
  console.log('cartProducts', cartProducts)
  const fetchCartDetails = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ODI4MzFlMC02ODUxLTQ1NGQtYTQyNC04ODJiMmJiNGE5MjkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.dug-ofAz7IuYiDLCVZRVaaOl_TuUPoT-fxbUN9uKkvw";
    axios
      .get("/api/user/cart", {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((resp) => setCartProducts(resp.data.cart))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
     fetchCartDetails();
  }, []);

  return (
    <div>
      {cartProducts.map((cart) => (
        <div>
          <img src ={cart.img} width="100"height="200"alt="clothes"/>
          <p>Price:{cart.price}</p>
        </div>
      ))}
    </div>
  );
}
