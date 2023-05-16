import { createContext, useState,useEffect } from "react";

export const ProductContext = createContext()

export default function ProductProvider({children}){
    const [products, setProducts] = useState([]);
    const [filteredProducts,setFilteredProducts]=useState([])
  console.log(products)

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = JSON.parse(response._bodyText);
      if(response.status===200){
        setProducts(data.products)
      }
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

  

  const categoryHandler = (reqdCategoryName) => {
    const filtered = products.filter(
      ({ categoryName }) => categoryName === reqdCategoryName
    );
    setFilteredProducts(filtered);
  };

    return<ProductContext.Provider value={{products,filteredProducts,categoryHandler,setFilteredProducts}}>{children}</ProductContext.Provider>
}