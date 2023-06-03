import { useContext, useState } from "react";
import "./Address.css";
import { useNavigate } from "react-router-dom";
import { AddressContext } from "../context/AddressContext";

export default function Address() {
  const {dispatch}=useContext(AddressContext)
  const navigate = useNavigate();
  const address = {
    id:1,
    name: "Adarsh Balika",
    phoneNo: 91023456,
    pincode: 890172,
    home_address: "1241 gole market,Jammu",
    state: "Jammu&Kashmir",
    country: "India",
  };

  const clickHandler = () => {
    navigate("/userAddress");
  };

  const removeAddressHandler = (id)=>{
 dispatch({type:"REMOVE_ADDRESS",action:id})
  }

  const { id,name, phoneNo, pincode, home_address, state, country } = address;
  return (
    <div>
      <h1 className="heading">Account</h1>
      <div className="address-container">
        <div className="address-main">
          <div className="address-details">
            <p>
              <b>{name}</b>
            </p>
            <p>
              <b> Phone no :</b> {phoneNo}
            </p>
            <p>
              <b>Pincode : </b>
              {pincode}
            </p>
            <p>{home_address}</p>
            <p>{state}</p>
            <p>{country}</p>
            <button className="place-order-btn">Place order</button>
            <button>Edit</button>
            <button onClick={clickHandler}>Add addresss</button>
            <button onClick={()=>removeAddressHandler(id)}>Remove address</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
