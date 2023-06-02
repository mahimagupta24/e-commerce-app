import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

import { ProductContext } from "../context/ProductContext";

export default function Price() {
  const navigate = useNavigate();
  const { cartProducts } = useContext(CartContext);

  const [discount, setDiscount] = useState(0);

  const totalPrice = cartProducts.reduce(
    (acc, curr) => acc + curr.price * curr.qty,
    0
  );
  console.log(totalPrice);

  const qty = cartProducts.reduce((acc, curr) => acc + curr.qty, 0);
  const grandTotal = totalPrice - discount;
  console.log(grandTotal);

  const checkoutHandler = () => {
    navigate("/address");
  };

  return (
    <div className="price-card">
      <div className="coupon">
        <p className="coupon-heading">Have a coupon?
        <button className="coupon-btn" onClick={() => setDiscount(55)}>
          Apply coupon
        </button>
        </p>
        </div>

      <div className="price-description">
        <p>Total items:{qty}</p>
        <p>discount:₹{discount}</p>
        <p>Total Price:₹{grandTotal}</p>
      </div>
      <div>
        <button className="checkout-btn" onClick={checkoutHandler}>
          Checkout
        </button>
      </div>
    </div>
  );
}
