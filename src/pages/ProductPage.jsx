import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import Filters from "./Filters";
export default function Products() {
  const { filteredProducts} = useContext(ProductContext);
  return (
    <div>
     {/* {filteredProducts&&<div><h2>Products:</h2> */}
      {filteredProducts.map(
        ({ _id, img, desc, original_price, price, rating }) => (
          <div key={_id}>
            <img src={img} alt={desc} />
            <h4>{desc}</h4>
            <p>Original Price: ${original_price}</p>
            <p>Price: ${price}</p>
            <p>Rating: {rating}</p>
          </div>
        )
      )}
      <Filters/>  
</div>
  );
}
