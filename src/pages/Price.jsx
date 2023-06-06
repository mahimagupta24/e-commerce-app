import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function Price() {
  const navigate = useNavigate();
  const { setDiscount,qty,totalPrice,discount,grandTotal } = useContext(CartContext);

  
  


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
          Place order
        </button>
      </div>
    </div>
  );
}
