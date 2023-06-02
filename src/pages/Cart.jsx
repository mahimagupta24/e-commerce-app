import axios from "axios";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import Price from "./Price";
import "./Cart.css";

export default function Cart() {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { isWishlistProductPresent, handleAddWishlistItems } =
    useContext(WishlistContext);
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
    <div className="container">
      <ul className="cart-card">
        {cartProducts.map((product) => {
          return (
            <li className="cart-list" key={product._id}>
              {isWishlistProductPresent(product._id) ? (
                <Link to="/wishlist">
                  <span className="wishlist">
                    <i className="fa fa-heart"></i>
                  </span>
                </Link>
              ) : (
                <span
                  className="wishlist-icon"
                  onClick={() => handleAddWishlistItems(product)}
                >
                  <i className="fa fa-heart"></i>
                </span>
              )}
              <div>
              <img src={product.img} alt="clothes" width="100"height="200" />
              </div>
              <div className="product-desc">
                <p>Name:{product.name}</p>
                <p>Price:{product.price}</p>
              </div>
              <button
                className="cart-btn"
                onClick={() => removeCartHandler(product._id)}
              >
                Remove from cart
              </button>
              <div className="qty-btn">
                <button
                  onClick={() =>
                    changeQuantityHandler(product._id, "decrement")
                  }
                >
                  <i className="fa fa-minus"></i>
                </button>
                <span className="qty"> {product.qty}</span>
                <button
                  onClick={() =>
                    changeQuantityHandler(product._id, "increment")
                  }
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <Price />
    </div>
  );
}
