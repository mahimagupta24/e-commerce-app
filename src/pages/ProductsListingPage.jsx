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
        <div className="product-container">
      <div>
        <Filters />
      </div>
    
      <ul className="product-card">
      
        {filteredPriceProducts.map((product) => {
          const { _id, img, original_price, price, rating, name } = product;
          ;

          const handleAddCartItems = (product) => {
            isLoggedIn ? addCartItems(product) : navigate("/login");
          };

          const handleProductClick = (id) => {
            navigate(`/product/${id}`);
          };
          return (
            <li className="products-list" key={_id}>
              {isWishlistProductPresent(_id) ? (
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

              <img
                className="product-img"
                src={img}
                alt={name}
                onClick={() => handleProductClick(_id)}
              />
              <div className="product-desc">
              <h4>{name}</h4>
              <p>Original Price: ${original_price}</p>
              <p>Price: ${price}</p>
              <p>Rating: {rating}</p>
              </div>

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
            </li>
          );
        })}
      </ul>
    </div>
    </div>
  );
}
