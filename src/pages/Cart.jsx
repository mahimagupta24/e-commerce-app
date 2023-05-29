import axios from "axios";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Price from "./Price";
export default function Cart() {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { state, handleAddWishlistItems } = useContext(WishlistContext);
  // const { loginHandler } = useContext(AuthContext);

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

  const removeCartHandler = (productId) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ODI4MzFlMC02ODUxLTQ1NGQtYTQyNC04ODJiMmJiNGE5MjkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.dug-ofAz7IuYiDLCVZRVaaOl_TuUPoT-fxbUN9uKkvw";
    axios
      .delete(`/api/user/cart/${productId}`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((resp) => {
        setCartProducts(resp.data.cart);
      })
      .catch((e) => console.error(e));
  };

  const changeQuantityHandler = (productId, actionType) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ODI4MzFlMC02ODUxLTQ1NGQtYTQyNC04ODJiMmJiNGE5MjkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.dug-ofAz7IuYiDLCVZRVaaOl_TuUPoT-fxbUN9uKkvw";
    axios
      .post(
        `/api/user/cart/${productId}`,
        {
          action: {
            type: actionType,
          },
        },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data.cart);
        setCartProducts(resp.data.cart);
      })
      .catch((e) => console.error(e));
  };

  
  return (
    <div>

      {cartProducts.map((product) => {

        const isWishlistProductPresent = state.wishListProducts.some(
          (wishListProduct) => wishListProduct._id === product._id
        );
        
        return (
          <div key={product._id}>
            <img src={product.img} width="100" height="200" alt="clothes" />
            <p>Name:{product.name}</p>
            <p>Price:{product.price}</p>
            <button onClick={() => removeCartHandler(product._id)}>
              Remove from cart
            </button>
            <button
              onClick={() => changeQuantityHandler(product._id, "decrement")}
            >
              -
            </button>
            {product.qty}
            <button
              onClick={() => changeQuantityHandler(product._id, "increment")}
            >
              +
            </button>
            {isWishlistProductPresent ? (
              <Link to="/wishlist">
                <button className="wishlist-btn">Go to wishlist</button>
              </Link>
            ) : (
              <button
                className="wishlist-btn"
                onClick={() => handleAddWishlistItems(product)}
              >
                Add to wishlist
              </button>
            )}
          </div>
        );
      })}
       <Price/>
    </div>
   
  );
}
