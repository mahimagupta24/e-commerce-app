import { createContext, useState, useEffect, useReducer } from "react";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const [filteredProducts,setFilteredProducts]=useState([])
  console.log(products);

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = JSON.parse(response._bodyText);
      if (response.status === 200) {
        setProducts(data.products);
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(({ categoryName }) => categoryName === selectedCategory)
    : products;

  const categoryHandler = (reqdCategoryName) => {
    setSelectedCategory(reqdCategoryName);
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SORT_ORDER_CHANGED":
        products.sort((a, b) =>
          action.payload === "HTL" ? b.price - a.price : a.price - b.price
        );
        return { ...state, sort: action.payload };
      case "default":
        return state;
    }
  };
  const initialState = {
  
    sort: null,
    menClothesChecked: false,
    womenClothesChecked: false,
    kidsClothesChecked: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        filteredProducts,
        categoryHandler,
        dispatch,
        

        // setFilteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
