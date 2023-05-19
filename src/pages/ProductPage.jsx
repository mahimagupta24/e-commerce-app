import { useEffect, useState } from "react";
import Filters from "../components/Filters";
import Header from "../components/Header";
import "./Productpage.css"

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const[selectedPrice,setSelectedPrice] = useState(null)
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

  const searchHandler = (text) => {
    setSearchText(text);
  };

  const categoryHandler = (category) => {
    setSelectedCategory(category);
  };

  const sortHandler = (sortType) => {
    setSortOrder(sortType);
  };

  const ratingHandler = (rating) => {
    setSelectedRating(rating);
  };

  const priceHandler = (price)=>{
    setSelectedPrice(price)
  }
  const clearFiltersHandler = () => {
    setSelectedCategory(null);
    setSelectedRating(null);
    setSortOrder(null);
  };

  const searchedProducts =
    searchText !== null
      ? products.filter(({ name }) => name.includes(searchText))
      : products;

  const filteredProducts =
    selectedCategory !== null
      ? searchedProducts.filter(({ categoryName }) => categoryName === selectedCategory)
      : searchedProducts;

      
      
  const sortedProducts =
    sortOrder !== null
      ? filteredProducts.sort((a, b) =>
          sortOrder === "HTL" ? b.price - a.price : a.price - b.price
        )
      : filteredProducts;

  const productsRating = selectedRating
    ? sortedProducts.filter(({ rating }) => {
        return rating >= parseFloat(selectedRating);
      })
    : sortedProducts;

  return (
    <div>
      <Header searchHandler={searchHandler}/>
      {/* {filteredProducts&&<div><h2>Products:</h2> */}
      {productsRating.map(
        ({ _id, img, desc, original_price, price, rating }) => (
          <div className="product-card"key={_id}>
            <img className="product-img"src={img} alt={desc} />
            <h4>{desc}</h4>
            <p>Original Price: ${original_price}</p>
            <p>Price: ${price}</p>
            <p>Rating: {rating}</p>
          </div>
        )
      )}
      <Filters
        sortHandler={sortHandler}
        categoryHandler={categoryHandler}
        ratingHandler={ratingHandler}
       
        clearFiltersHandler={clearFiltersHandler}
      />
    
    </div>
  );
}
