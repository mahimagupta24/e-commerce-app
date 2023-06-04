import { useContext, useState } from "react";
import { AddressContext } from "../context/AddressContext";
import "./AddressForm.css";

export default function UserAddress({ onSave, editingAddressId }) {
  const { dispatch, state } = useContext(AddressContext);
  const getAddress = state.addresses.find(({ id }) => id === editingAddressId);

  
  const [address, setAddress] = useState(
    editingAddressId !== null
      ? getAddress
      : {
          id: state.addresses.length + 1,
          fullName: "",
          phoneNo: "",
          pincode: "",
          home_address: "",
          state: "",
          country: "",
          mobileNo: "",
        }
  );

  const handleSaveAddress = (address) => {
    dispatch({ type: "ADD_ADDRESS", payload: address });
    onSave();
  };

  const submitHandler = (e) => e.preventDefault();
  return (
    <div className="input-container">
      {editingAddressId === null ? <h4>Add address</h4> : <h4>Edit address</h4>}
      <form onSubmit={submitHandler} className="details">
        <input className="input-field"
          type="text"
          placeholder="Enter Name"
          value={getAddress?.fullName}
          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
        />
        <input  className="input-field"
          placeholder="Enter House No,road,colony"
          value={getAddress?.home_address}
          onChange={(e) =>
            setAddress({ ...address, home_address: e.target.value })
          }
        />
        <input  className="input-field"
          type="text"
          value={getAddress?.state}
          placeholder="Enter State"
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
        />
        <input className="input-field"
          type="text"
          value={getAddress?.country}
          placeholder="Enter Country"
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
        />
        <input className="input-field"
          type="number"
          placeholder="Enter Postal Code"
          value={getAddress?.pincode}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
        />
        <input className="input-field"
          type="number"
          placeholder="Enter Mobile no."
          value={getAddress?.phoneNo}
          onChange={(e) => setAddress({ ...address, phoneNo: e.target.value })}
        />
        <button onClick={() => handleSaveAddress(address)} type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
