import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

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

  const handleCouponButton = ()=>{
    toast.success("Coupon applied successfully!")
    setDiscount(55);
    
  }
  return (
    <div className="price-card">
      <div className="coupon">
        <p className="coupon-heading">Have a coupon?
        <button className="coupon-btn" onClick={handleCouponButton}>
          Apply coupon
        </button>
        </p>
        </div>

      <div className="price-breakup">Total items {qty}</div>
      <div className="price-breakup">Total MRP ₹{totalPrice}</div>
       
        <div className="price-breakup">Discount -₹{discount}</div>
      <div className="price-breakup">Delivery charges ₹FREE</div>

        <div className="price-breakup">Total Price ₹{grandTotal}</div>
      <div>
        <button className="checkout-btn" onClick={checkoutHandler}>
          Checkout
        </button>
      </div>
    </div>
  );
}
