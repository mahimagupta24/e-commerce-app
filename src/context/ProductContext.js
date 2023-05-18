import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  
  return (
    <ProductContext.Provider
      value={{
       
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
