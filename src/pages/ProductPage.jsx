import { useContext, useEffect, useState } from "react";
import Filters from "../components/Filters";
import Header from "../components/Header";
import "./Productpage.css";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
//  import { useNavigate } from "react-router-dom";

export default function Products() {
const {setCartProducts} = useContext(CartContext)
  const {
   
    searchText,
    selectedCategories,
    sortOrder,
    selectedRating,
    selectedPrice,
  } = useContext(ProductContext);
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

  const searchedProducts =
    searchText !== null
      ? products.filter(({ name }) => name.includes(searchText))
      : products;

  const filteredProducts =
    selectedCategories.length > 0
      ? searchedProducts.filter(({ categoryName }) =>
          selectedCategories.includes(categoryName)
        )
      : searchedProducts;

  const sortedProducts =
    sortOrder !== null
      ? filteredProducts.sort((a, b) =>
          sortOrder === "HTL" ? b.price - a.price : a.price - b.price
        )
      : filteredProducts;

  const productsRating = selectedRating
    ? sortedProducts.filter(({ rating }) => rating >= selectedRating)
    : sortedProducts;

  const filteredPriceProducts = selectedPrice
    ? productsRating.filter(({ price }) => price <= selectedPrice)
    : productsRating;

  
  const addCartItems = (product) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ODI4MzFlMC02ODUxLTQ1NGQtYTQyNC04ODJiMmJiNGE5MjkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.dug-ofAz7IuYiDLCVZRVaaOl_TuUPoT-fxbUN9uKkvw";
    axios
      .post(
        "/api/user/cart",
        { product },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
      .then((resp) => {
        console.log("cart", resp.data.cart);
        setCartProducts(resp.data.cart);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <Header />
      {/* {filteredProducts&&<div><h2>Products:</h2> */}
      {filteredPriceProducts.map((product) => {
        const { _id, img, desc, original_price, price, rating } = product;
        return (
          <div className="product-card" key={_id}>
            <img className="product-img" src={img} alt={desc} />
            <h4>{desc}</h4>
            <p>Original Price: ${original_price}</p>
            <p>Price: ${price}</p>
            <p>Rating: {rating}</p>
            <button onClick={() => addCartItems(product)}>Add to cart</button>
          </div>
        );
      })}

      <Filters />
    </div>
  );
}
