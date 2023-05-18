import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.status === 200) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,

        // setFilteredProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
