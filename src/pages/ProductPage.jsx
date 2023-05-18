import { useEffect, useState } from "react";
import Filters from "../components/Filters";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

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

  const categoryHandler = (category) => {
    setSelectedCategory(category);
  };

  const sortHandler = (sortType) => {
    setSortOrder(sortType);
  };

  const ratingHandler = (rating) => {
    setSelectedRating(rating);
  };

  const filteredProducts = selectedCategory
    ? [...products].filter(
        ({ categoryName }) => categoryName === selectedCategory
      )
    : products;

  const sortedProducts =
    sortOrder !== null
      ? filteredProducts.sort((a, b) =>
          sortOrder === "HTL" ? b.price - a.price : a.price - b.price
        )
      : filteredProducts;

  const productsRating = selectedRating
    ? sortedProducts.filter(({ rating }) => rating === selectedRating)
    : sortedProducts;

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
      <Filters />
    </div>
  );
}
