import axios from "axios";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const fetchCartDetails = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ODI4MzFlMC02ODUxLTQ1NGQtYTQyNC04ODJiMmJiNGE5MjkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.dug-ofAz7IuYiDLCVZRVaaOl_TuUPoT-fxbUN9uKkvw";
    axios
      .get("/api/user/cart", {
        headers: {
          Authorization: token,
        },
      })
      .then((resp) => setCartItems(resp.data))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  return <div>cart</div>;
}
