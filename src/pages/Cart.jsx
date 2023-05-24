import axios from "axios";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import {Link} from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
export default function Cart() {
  const { cartProducts, setCartProducts} = useContext(CartContext);
  const {state,handleAddWishlistItems} = useContext(WishlistContext)
  const {token} = useContext(AuthContext)

  const fetchCartDetails = () => {
    // const token =   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ODI4MzFlMC02ODUxLTQ1NGQtYTQyNC04ODJiMmJiNGE5MjkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.dug-ofAz7IuYiDLCVZRVaaOl_TuUPoT-fxbUN9uKkvw";
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

  const totalPrice = cartProducts.reduce((acc, curr) => acc + curr.price, 0);
  console.log(totalPrice);

  return (
    <div>
      {cartProducts.map((cart) => {
         const isWishlistProductPresent = state.wishListProducts.some(
          (wishListProduct) => wishListProduct._id === cart._id
        );
        return (
          <div key={cart._id}>
            <img src={cart.img} width="100" height="200" alt="clothes" />
            <p>Name:{cart.name}</p>
            <p>Price:{cart.price}</p>
            <button onClick={() => removeCartHandler(cart._id)}>
              Remove from cart
            </button>
            <button
              onClick={() => changeQuantityHandler(cart._id, "decrement")}
            >
              -
            </button>
            {cart.qty}
            <button
              onClick={() => changeQuantityHandler(cart._id, "increment")}
            >
              +
            </button>
            {isWishlistProductPresent ? (
              <Link to="/wishlist">
                <button className="wishlist-btn">Go to wishlist</button>
              </Link>
            ) : (
              <button className="wishlist-btn"onClick={() => handleAddWishlistItems(cart)}>
                Add to wishlist
              </button>
            )}
            
          </div>
        );
      })}
    </div>
  );
}
