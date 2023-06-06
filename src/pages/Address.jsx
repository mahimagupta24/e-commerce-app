import { useContext, useState } from "react";
import "./Address.css";
import { useNavigate } from "react-router-dom";
import { AddressContext } from "../context/AddressContext";
import UserAddress from "./AddressForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Price from "./Price";
import { CartContext } from "../context/CartContext";

export default function Address() {
  const navigate = useNavigate()
  const { state, dispatch ,selectedAddress,setSelectedAddress} = useContext(AddressContext);
  const{qty,discount,totalPrice,grandTotal}=useContext(CartContext)
  const [showAddress, setShowAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState();

  const clickEditHandler = (addressId) => {
    setEditingAddressId(addressId);
    setShowAddress(true);
    console.log(addressId);
  };

  const clickAddHandler = () => {
    setEditingAddressId(null);
    setShowAddress(true);
  };
  const removeAddressHandler = (id) => {
    dispatch({ type: "REMOVE_ADDRESS", payload: id });
  };
  

  return (
      <div className="address-main">
        <h1>Checkout</h1>
       <div className="address-details">
        <div>
          {state.addresses.map((add) => (
            <div className="address-card" key={add.id}>
              <div className="radio-btn">
                <input
                  type="radio"
                  checked={selectedAddress.id === add.id}
                  onChange={() => {
                    setSelectedAddress(
                      state.addresses.find(({ id }) => id === add.id)
                    );
                  
                  }}
                />
                <h2> {add.fullName}</h2>
              </div>
             
              <p>
                {add.home_address},{add.state},{add.country},
                {add.pincode}
              </p>

              <div className="address-card-btn-container">
                <button
                  className="edit-btn"
                  onClick={() => clickEditHandler(add.id)}
                >
                  Edit
                </button>
                <button
                  className="remove-btn"
                  onClick={() => removeAddressHandler(add.id)}
                >
                  Remove address
                </button>
              </div>
            </div>
          ))}
          
          <button className="add-btn" required={true} onClick={clickAddHandler}>
            <i className="fa fa-plus"></i> Add New addresss
          </button>
        </div>

        <div className="address-container">
          <h1 className="price-breakup">Address summary</h1>
        <div className="price-breakup">Total items {qty}</div>
      <div className="price-breakup">Total MRP ₹{totalPrice}</div>
       
        <div className="price-breakup">Discount -₹{discount}</div>
      <div className="price-breakup">Delivery charges ₹FREE</div>

        <div className="price-breakup">Total Price ₹{grandTotal}</div>
         <br></br>
         <hr></hr>
         <h2 className="price-breakup">Deliver to</h2>
        <div className="price-breakup">{selectedAddress.fullName}</div>
        <div className="price-breakup">{selectedAddress.home_address}</div>
        
        <button className="checkout-btn" onClick={()=>navigate("/order")}>
          Place order
        </button>
        </div>
        {showAddress && (
          <UserAddress
            onSave={() => setShowAddress(false)}
            editingAddressId={editingAddressId}
          />
        )}
         </div>
         
        
      </div>
     

    
  );
}
