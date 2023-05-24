import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function ProductDetailsPage() {
  const { handleAddWishlistItems } = useContext(WishlistContext);
  const { cartProducts,handleAddCartItems } = useContext(CartContext);
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

  const isCartProductPresent = cartProducts.some(
    (cartProduct) => cartProduct?._id === product?._id
  );
  return (
    <div>
      <Header/>
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
              <button className="cart-btn"onClick={() => handleAddCartItems(product)}>
                Add to cart
              </button>
            )}
      <button onClick={()=>handleAddWishlistItems(product)}>Add to wishlist</button>
    </div>
  );
}
