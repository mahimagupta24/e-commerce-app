import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import {Link} from  "react-router-dom"

export default function Wishlist() {
  const { state,dispatch } = useContext(WishlistContext);
  const {isCartProductPresent, handleAddCartItems } = useContext(CartContext);
  // console.log(state.wishListProducts);
  const removeWishlistHandler = async(productId) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ODI4MzFlMC02ODUxLTQ1NGQtYTQyNC04ODJiMmJiNGE5MjkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.dug-ofAz7IuYiDLCVZRVaaOl_TuUPoT-fxbUN9uKkvw";
    try {
     const resp= await axios.delete(`/api/user/wishlist/${productId}`, {
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
    <div>
      {state.wishListProducts.map((product) => {

        // const isCartProductPresent = cartProducts.some(
        //   (cartProduct) => cartProduct._id === product._id
        // )
       return <div key={product._id}>
          <img src={product.img} height="200" width="100" />
          <p>{product.name}</p>
          <p>Price:{product.price}</p>
        
          <button onClick={()=>removeWishlistHandler(product._id)}>remove from wishlist</button>
          {isCartProductPresent(product._id)? (
              <Link to="/cart">
                <button className="cart-btn">Go to cart</button>
              </Link>
            ) : (
              <button className="cart-btn"onClick={() => handleAddCartItems(product)}>
                Move to cart
              </button>
            )}
        </div>
})}
    </div>
  );
}
