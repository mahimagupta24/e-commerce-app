import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { ProductContext } from "../context/ProductContext";

export default function ProductDetailsPage() {
  const { handleAddWishlistItems } = useContext(WishlistContext);
  
  const {isCartProductPresent, handleAddCartItems } = useContext(CartContext);
  const {product,setProduct}=useContext(ProductContext)
  const { productId } = useParams();

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
      <h1>Product Details</h1>
      <img src={product?.img} />
      <p>{product?.desc}</p>
      <p>{product?.original_price}</p>
      <p>{product?.price}</p>
      {isCartProductPresent ? (
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
      <button onClick={() => handleAddWishlistItems(product)}>
        Add to wishlist
      </button>
    </div>
  );
}
