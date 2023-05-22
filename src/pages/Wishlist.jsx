import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";

export default function Wishlist() {
  const { state } = useContext(WishlistContext);
  console.log(state.wishListProducts);
  return (
    <div>
      {state.wishListProducts.map((product) => (
        <div>
          <img src={product.img} height="200" width="100" />
          <p>{product.name}</p>
          <p>Price:{product.price}</p>
        </div>
      ))}
    </div>
  );
}
