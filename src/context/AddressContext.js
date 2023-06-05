import { createContext, useReducer } from "react";

export const AddressContext = createContext();

const addressReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ADDRESS":
      return { ...state, addresses: [...state.addresses, action.payload] };

    case "EDIT_ADDRESS":
      const updatedAddress = action.payload;
      const newAddresses = state.addresses.map((address) =>
        address.id === updatedAddress.id ? updatedAddress : address
      );

      return { ...state, addresses: newAddresses };

    case "REMOVE_ADDRESS":
      console.log("Case matched", action.payload);
      return {
        ...state,
        addresses: state.addresses.filter(
          (address) => address.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default function AddressProvider({ children }) {
  const [state, dispatch] = useReducer(addressReducer, {
    addresses: [
      {
        id: 1,
        fullName: "Adarsh Balika",
        home_address: "W.No9,H.No.3, gole market,Jammu",
        state: "Jammu&Kashmir",
        country: "India",
        pincode: 182101, 
      },
    ],
  });
  return (
    <AddressContext.Provider value={{ state, dispatch }}>
      {children}
    </AddressContext.Provider>
  );
}
