import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./ProductDetailsPage.css"

export default function ProductDetailsPage() {
  const { handleAddWishlistItems,isWishlistProductPresent } = useContext(WishlistContext);
  const { cartProducts,handleAddCartItems,isCartProductPresent } = useContext(CartContext);
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
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

  // const isCartProductPresent = cartProducts.some(
  //   (cartProduct) => cartProduct?._id === product?._id
  // );
  return (
    <div>
      <Header/>

      <h1>Product Details</h1>
      <div className="product-list">
      <img src={product?.img}alt="clothes" width="100" height="200"/>
      
      <p>{product?.desc}</p>
      <p>{product?.original_price}</p>
      <p>{product?.price}</p>
      {isCartProductPresent ? (
              <Link to="/cart">
                <button className="cart-btn">Go to cart</button>
              </Link>
            ) : (
              <button onClick={() => handleAddCartItems(product)}>
                Add to cart
              </button>
            )}
            
    </div>
    </div>
  );
}
