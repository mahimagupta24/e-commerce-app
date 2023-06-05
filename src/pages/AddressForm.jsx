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
    editingAddressId
      ? dispatch({ type: "EDIT_ADDRESS", payload:address })
      : dispatch({ type: "ADD_ADDRESS", payload: address });
     onSave();
  };

  const cancelHandler = ()=>{
    onSave()
  }
  const submitHandler = (e) => e.preventDefault();

  return (
    <div className="address-form-container">
       <form onSubmit={submitHandler} className="address-form">
      {editingAddressId === null ? <h4>Add address</h4> : <h4>Edit address</h4>}
     <div>
        <input
          className="text-input address-form-input"
          type="text"
          placeholder="Enter Name"
          value={address.fullName}
          onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
        />
        <input 
          className="text-input address-form-input"
          placeholder="Enter House No,road,colony"
          value={address.home_address}
          onChange={(e) =>
            setAddress({ ...address, home_address: e.target.value })
          }
        />
        <input
         className="text-input address-form-input"
          type="text"
          value={address.state}
          placeholder="Enter State"
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
        />
        <input
         className="text-input address-form-input"
         type="text"
          value={address.country}
          placeholder="Enter Country"
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
        />
        <input
         className="text-input address-form-input"
          type="number"
          placeholder="Enter Postal Code"
          value={address.pincode}
          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
        />
        <input
         className="text-input address-form-input"
          type="number"
          placeholder="Enter Mobile no."
          value={address.phoneNo}
          onChange={(e) => setAddress({ ...address, phoneNo: e.target.value })}
        />
        </div>
        <button onClick={() => handleSaveAddress(address)} type="submit">
          Save
        </button>
        <button onClick={()=>cancelHandler()}>Cancel</button>
      </form>
    </div>
  );
}
