import { useContext, useEffect, useState } from "react";
import Filters from "../components/Filters";
import Header from "../components/Header";
import "./ProductsListingpage.css";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export default function Products() {
  const navigate = useNavigate();
  const { handleAddCartItems, cartProducts, isCartProductPresent } =
    useContext(CartContext);
  console.log("cart", cartProducts);
  const {  isWishlistProductPresent,handleAddWishlistItems } =
    useContext(WishlistContext);
  const { filteredPriceProducts } = useContext(ProductContext);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };
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
                  <p className="price">
                    <span> ₹{price}</span>
                    <span className="original-price">₹{original_price}</span>
                  </p>

                  <p>
                    Rating: {rating}
                    <span className="star">
                      <i className="fa fa-star"></i>
                    </span>
                  </p>
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
