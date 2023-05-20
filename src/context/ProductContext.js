import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  const searchHandler = (text) => {
    setSearchText(text);
  };

  const categoryHandler = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== categoryName)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  const sortHandler = (sortType) => {
    setSortOrder(sortType);
  };

  const ratingHandler = (rating) => {
    setSelectedRating(rating);
  };

  const priceHandler = (price) => {
    setSelectedPrice(price);
  };
  
  const clearFiltersHandler = () => {
    setSelectedCategories([])
    setSelectedRating(null);
    setSortOrder(null);
  };
  return (
    <ProductContext.Provider
      value={{
        searchText,
        setSearchText,
        selectedCategories,
        setSelectedCategories,
        selectedPrice,
        setSelectedPrice,
        selectedRating,
        setSelectedRating,
        sortOrder,setSortOrder,
        searchHandler,sortHandler,categoryHandler,priceHandler,ratingHandler,clearFiltersHandler
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
