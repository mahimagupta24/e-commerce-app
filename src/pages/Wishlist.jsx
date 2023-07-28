import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./Wishlist.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Wishlist() {
  const { state, removeWishlistHandler } = useContext(WishlistContext);
  const { isCartProductPresent, addCartItems, removeCartHandler } =
    useContext(CartContext);

  return (
    <div>
      <Header />
      <div className="wishlist-container">
        <h1>My Wishlist</h1>
        <ul className="wishlist-card">
          {state.wishListProducts.length > 0 &&
            state.wishListProducts.map((product) => {
              return (
                <li className="product-list" key={product._id}>
                  <span
                    className="wishlist"
                    onClick={() => {
                      removeWishlistHandler(product._id);
                      removeCartHandler(product._id);
                    }}
                  >
                    <i className="fa fa-heart"></i>
                  </span>
                  <img
                    className="wishlist-image"
                    src={product.img}
                    alt="clothes"
                  />
                  <div className="product-desc">
                    <p>{product.name}</p>
                    <p className="price">
                      <span> ₹{product.price}</span>
                      <span className="original-price">
                        ₹{product.original_price}
                      </span>
                    </p>
                  </div>
                  {isCartProductPresent(product._id) ? (
                    <Link to="/cart">
                      <button className="wishlist-cart-btn">Go to cart</button>
                    </Link>
                  ) : (
                    <button
                      className="wishlist-cart-btn"
                      onClick={() => {
                        addCartItems(product);
                        removeWishlistHandler(product._id)
                      }}
                    >
                      Move to cart
                    </button>
                  )}
                </li>
              );
            })}
        </ul>
        {state.wishListProducts.length === 0 && (
          <h1>Your wishlist is empty😑</h1>
        )}
      </div>
     
    </div>
  );
}
