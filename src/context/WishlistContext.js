import { createContext, useReducer } from "react";

export const WishlistContext = createContext();
const initialState = {
  wishListProducts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_WISHLIST":
      return { ...state, wishListProducts: action.payload };
    default:
      return state;
  }
};
export default function WishlistProvider({ children }) {
    const [state,dispatch] = useReducer(reducer,initialState)
  return <WishlistContext.Provider value={{state,dispatch}}>{children}</WishlistContext.Provider>;
}
