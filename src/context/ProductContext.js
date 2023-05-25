import { createContext, useState, useEffect, useReducer } from "react";

export const ProductContext = createContext();

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: action.payload };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategories: action.payload };
     
    case "SET_SELECTED_PRICE":
      return { ...state, selectedPrice: action.payload };
    case "SET_SELECTED_RATING":
      return { ...state, selectedRating: action.payload };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    case "CLEAR_FILTERS":
      return {
        ...state,
        
        selectedCategories: [], // Reset the selected categories array
        selectedPrice: null, // Reset the selected price
        selectedRating: null, // Reset the selected rating
        sortOrder: null,
      };
    default:
      return state;
  }
};

export default function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, {
    searchText: "",
    selectedCategories: [],
    selectedPrice: null,
    selectedRating: null,
    sortOrder: null,
  });

  // const categoryHandler = (categoryName) => {
  //   if (state.selectedCategories.includes(categoryName)) {
  //     setSelectedCategories(
  //       state.selectedCategories.filter((category) => category !== categoryName)
  //     );
  //   } else {
  //     setSelectedCategories([...selectedCategories, categoryName]);
  //   }
  // };

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
