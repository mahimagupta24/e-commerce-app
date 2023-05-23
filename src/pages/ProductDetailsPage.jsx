import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductDetailsPage() {
  const { handleAddWishlistItems } = useContext(WishlistContext);
  const { handleAddCartItems } = useContext(CartContext);
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
  return (
    <div>
      <h1>Product Details</h1>
      <img src={product?.img} />
      <p>{product?.desc}</p>
      <p>{product?.original_price}</p>
      <p>{product?.price}</p>
      <Link to ="/cart"><button onClick={() => handleAddCartItems(product._id)}>
        Add to cart
      </button></Link>
      <Link to="/wishlist"><button onClick={()=>handleAddWishlistItems(product._id)}>Add to wishlist</button></Link>
    </div>
  );
}
