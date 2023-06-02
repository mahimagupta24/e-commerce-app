import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Wishlist.css";

export default function Wishlist() {
  const { state, dispatch } = useContext(WishlistContext);
  const { isCartProductPresent, addCartItems } = useContext(CartContext);
  // console.log(state.wishListProducts);
  const removeWishlistHandler = async (productId) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ODI4MzFlMC02ODUxLTQ1NGQtYTQyNC04ODJiMmJiNGE5MjkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.dug-ofAz7IuYiDLCVZRVaaOl_TuUPoT-fxbUN9uKkvw";
    try {
      const resp = await axios.delete(`/api/user/wishlist/${productId}`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      dispatch({ type: "LOAD_WISHLIST", payload: resp.data.wishlist });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="container" >
      <h1>My Wishlist</h1>
    <ul className="wishlist-card">
      {state.wishListProducts.length>0&&state.wishListProducts.map((product) => {
        return (
          <li className="product-list" key={product._id}>
            <span
              className="wishlist"
              onClick={() => removeWishlistHandler(product._id)}
            >
              <i className="fa fa-heart"></i>
            </span>
            <img className="card-image" src={product.img}  alt="clothes" width="100"height="200"/>
            <div className="product-desc">
            <p>{product.name}</p>
            <p className="price">
                    <span > ₹{product.price}</span>
                    <span className="original-price">₹{product.original_price}</span>
                  </p>
           
            </div>
            {isCartProductPresent(product._id) ? (
              <Link to="/cart">
                <button className="cart-btn">Go to cart</button>
              </Link>
            ) : (
              <button
              className="cart-btn"
                onClick={() => addCartItems(product)}
              >
                Move to cart
              </button>
            )}
          </li>
        );
      })}
       </ul>
      {state.wishListProducts.length===0&& <h1>Your wishlist is empty😑</h1>}
      
   
    </div>
  );
  
}
