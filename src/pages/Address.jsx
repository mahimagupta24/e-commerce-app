import { useContext, useState } from "react";
import "./Address.css";
import { useNavigate } from "react-router-dom";
import { AddressContext } from "../context/AddressContext";
import UserAddress from "./AddressForm";

export default function Address() {
  const { state, dispatch } = useContext(AddressContext);
  const navigate = useNavigate();
  const [showAddress, setShowAddress] = useState(false);
  const[editingAddressId,setEditingAddressId] = useState()

  const clickEditHandler = (addressId) => {
    setEditingAddressId(addressId)
    setShowAddress(true)
    console.log(addressId)
  };
  const clickAddHandler = () => {
    setEditingAddressId(null)
    console.log(editingAddressId)
    setShowAddress(true);
  };
  const removeAddressHandler = (id) => {
    dispatch({ type: "REMOVE_ADDRESS", payload: id });
  };

  
  return (
    <div>
      
      <h1 className="heading">Account</h1>
      {state.addresses.map((address) => (
        <div className="address-container"key={address.id}>
          <div className="address-main">
            <div className="address-details">
              <p>
                <b>{address.fullName}</b>
              </p>
              <p>
                <b> Phone no :</b> {address.phoneNo}
              </p>
              <p>
                <b>Pincode : </b>
                {address.pincode}
              </p>
              <p>{address.home_address}</p>
              <p>{address.state}</p>
              <p>{address.country}</p>
            
              <button className="place-order-btn">Place order</button>
              <div className="buttons">
              <button className="edit-btn" onClick={()=>clickEditHandler(address.id)}>Edit</button>
              <button className="add-btn" required={true}onClick={clickAddHandler}>Add addresss</button>
              <button className="remove-btn"onClick={() => removeAddressHandler(address.id)}>
                Remove address
              </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {showAddress && <UserAddress onSave={()=>setShowAddress(false)} editingAddressId={editingAddressId} />}
    </div>
  );
}
