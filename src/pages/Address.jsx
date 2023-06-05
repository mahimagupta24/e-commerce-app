import { useContext, useState } from "react";
import "./Address.css";
import { useNavigate } from "react-router-dom";
import { AddressContext } from "../context/AddressContext";
import UserAddress from "./AddressForm";

export default function Address() {
  const { state, dispatch } = useContext(AddressContext);
  const navigate = useNavigate();
  const [showAddress, setShowAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState();

  const clickEditHandler = (addressId) => {
    setEditingAddressId(addressId);
    setShowAddress(true);
    console.log(addressId);
  };
  const clickAddHandler = () => {
    setEditingAddressId(null);
    console.log(editingAddressId);
    setShowAddress(true);
  };
  const removeAddressHandler = (id) => {
    dispatch({ type: "REMOVE_ADDRESS", payload: id });
  };

  return (
    <div className="address-main">
      <h1>Checkout</h1>
      <div >
        <input type="radio" name="address" />
        {state.addresses.map((address) => (
          <div className="address-card" key={address.id}>
            <h2> {address.fullName}</h2>

            <p>
              {address.home_address},{address.state},{address.country},
              {address.pincode}
            </p>

            <div className="address-card-btn-container">
              <button
                className="edit-btn"
                onClick={() => clickEditHandler(address.id)}
              >
                Edit
              </button>
              <button
                className="remove-btn"
                onClick={() => removeAddressHandler(address.id)}
              >
                Remove address
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <button className="add-btn" required={true} onClick={clickAddHandler}>
          <i className="fa fa-plus"></i> Add New addresss
        </button>
      <button className="place-order-btn">Place order</button>
      </div>
      {showAddress && (
        <UserAddress
          onSave={() => setShowAddress(false)}
          editingAddressId={editingAddressId}
        />
      )}
    </div>
  );
}
