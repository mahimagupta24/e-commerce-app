import { createContext, useReducer } from "react";
import axios
 from "axios";
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
    const handleAddWishlistItems = async(product) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ODI4MzFlMC02ODUxLTQ1NGQtYTQyNC04ODJiMmJiNGE5MjkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.dug-ofAz7IuYiDLCVZRVaaOl_TuUPoT-fxbUN9uKkvw";
     try{
        const resp= await axios
        .post(
          "/api/user/wishlist",
          { product },
          {
            headers: {
              authorization: `bearer ${token}`,
            },
          }
        )
          console.log("wishlist", resp.data.wishlist);
          dispatch({ type: "LOAD_WISHLIST", payload: resp.data.wishlist });
     }catch(e){
      console.error(e)
     }
    };
  return <WishlistContext.Provider value={{state,dispatch,handleAddWishlistItems}}>{children}</WishlistContext.Provider>;
}
