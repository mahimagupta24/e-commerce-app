import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./ProductDetailsPage.css";
import { ProductContext } from "../context/ProductContext";

export default function ProductDetailsPage() {
  const { handleAddWishlistItems, isWishlistProductPresent } =
    useContext(WishlistContext);
  const { handleAddCartItems, isCartProductPresent } =
    useContext(CartContext);
  const { productId } = useParams();
  const {product, setProduct} = useContext(ProductContext);
  const getProductDetails = async () => {
    try {
      const resp = await fetch(`/api/products/${productId}`);
      if (resp.status === 200) {
        const data = await resp.json();
        console.log(data);
        setProduct(data.product);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);

  
  return (
    <div>
      <Header />
      <div className="main-card">
        <h1>Product Details</h1>
        <div className="product-card">
          <img src={product?.img} alt="clothes" />
          <div className="desc">
          <p><b>{product?.name}</b></p>
          <p>{product?.desc}</p>
          <p className="curr-price"><span>₹{product?.price}</span><span className="original-price">₹{product?.original_price}</span></p>
         
          <p>{product?.rating} <i className="fa fa-star"></i></p>
          {isCartProductPresent(product?._id) ? (
            <Link to="/cart">
              <button>Go to cart</button>
            </Link>
          ) : (
            <button onClick={() => handleAddCartItems(product)}>
              Add to cart
            </button>
            
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
