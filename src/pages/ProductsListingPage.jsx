import { useContext, useEffect, useState } from "react";
import Filters from "../components/Filters";
import Header from "../components/Header";
import "./ProductsListingpage.css";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link, useNavigate } from "react-router-dom";
import RequiresAuth from "../components/RequiresAuth";
import { AuthContext } from "../context/AuthContext";

//  import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const { addCartItems, cartProducts, isCartProductPresent } =
    useContext(CartContext);
  console.log("cart", cartProducts);
  const { handleAddWishlistItems, isWishlistProductPresent } =
    useContext(WishlistContext);
  const { filteredPriceProducts } = useContext(ProductContext);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <Header />
      {/* {filteredProducts&&<div><h2>Products:</h2> */}
      {filteredPriceProducts.map((product) => {
        const { _id, img, original_price, price, rating, name } = product;
        // const isCartProductPresent = cartProducts.some(
        //   (cartProduct) => cartProduct?._id === product?._id
        // );

        const handleAddCartItems = (product) => {
          isLoggedIn ? addCartItems(product) : navigate("/login");
        };

        return (
          <div key={_id}>
            <Link to={`/product/${_id}`}>
              <div className="product-card" key={_id}></div>
            </Link>
            <img className="product-img" src={img} alt={name} />
            <h4>{name}</h4>
            <p>Original Price: ${original_price}</p>
            <p>Price: ${price}</p>
            <p>Rating: {rating}</p>

            {isCartProductPresent(_id) ? (
              <Link to="/cart">
                <button className="cart-btn">Go to cart</button>
              </Link>
            ) : (
              <button
                className="cart-btn"
                onClick={() => handleAddCartItems(product)}
              >
                Add to cart
              </button>
            )}
            {isWishlistProductPresent(_id) ? (
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

      <Filters />
    </div>
  );
}
