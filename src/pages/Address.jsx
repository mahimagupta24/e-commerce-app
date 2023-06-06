import { useContext, useState } from "react";
import "./Address.css";
import { useNavigate } from "react-router-dom";
import { AddressContext } from "../context/AddressContext";
import UserAddress from "./AddressForm";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Address() {
  const { state, dispatch } = useContext(AddressContext);
  const [showAddress, setShowAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState();
  const [selectedAddress, setSelectedAddress] = useState(state.addresses[0]);
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
    <div>
      <Header />
      <h1 style={{ textAlign: "center" }}>Checkout</h1>
      <div className="address-main">
        <div>
          {state.addresses.map((address) => (
            <div className="address-card" key={address.id}>
              <div className="radio-btn">
                <input
                  type="radio"
                  checked={selectedAddress.id === address.id}
                  onChange={() => {
                    setSelectedAddress(
                      state.addresses.find(({ id }) => id === address.id)
                    );
                    console.log(selectedAddress);
                  }}
                />
                <h2> {address.fullName}</h2>
              </div>
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
      <Footer />
    </div>
  );
}
