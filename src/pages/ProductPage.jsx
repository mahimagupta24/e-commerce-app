import { useContext, useEffect, useState } from "react";
import Filters from "../components/Filters";
import Header from "../components/Header";
import "./Productpage.css";
import { ProductContext } from "../context/ProductContext";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
//  import { useNavigate } from "react-router-dom";

export default function Products() {
  const { setCartProducts, cartProducts } = useContext(CartContext);
  const { dispatch, state } = useContext(WishlistContext);
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

  const handleAddCartItems = (product) => {
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
        setCartProducts(resp.data.cart);
      })
      .catch((e) => console.error(e));
  };

  const handleAddWishlistItems = (product) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI0ODI4MzFlMC02ODUxLTQ1NGQtYTQyNC04ODJiMmJiNGE5MjkiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.dug-ofAz7IuYiDLCVZRVaaOl_TuUPoT-fxbUN9uKkvw";
    axios
      .post(
        "/api/user/wishlist",
        { product },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
      .then((resp) => {
        console.log("wishlist", resp.data.wishlist);
        dispatch({ type: "LOAD_WISHLIST", payload: resp.data.wishlist });
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <Header />
      {/* {filteredProducts&&<div><h2>Products:</h2> */}
      {filteredPriceProducts.map((product) => {
        const { _id, img, desc, original_price, price, rating } = product;
        const isCartProductPresent = cartProducts.some(
          (cartProduct) => cartProduct._id === product._id
        );
        const isWishlistProductPresent = state.wishListProducts.some(
          (wishListProduct) => wishListProduct._id === product._id
        );
        return (
          <div className="product-card" key={_id}>
            <img className="product-img" src={img} alt={desc} />
            <h4>{desc}</h4>
            <p>Original Price: ${original_price}</p>
            <p>Price: ${price}</p>
            <p>Rating: {rating}</p>
            {isCartProductPresent ? (
              <Link to="/cart">
                <button>Go to cart</button>
              </Link>
            ) : (
              <button onClick={() => handleAddCartItems(product)}>
                Add to cart
              </button>
            )}
            {isWishlistProductPresent ? (
              <Link to="/wishlist">
                <button>Go to wishlist</button>
              </Link>
            ) : (
              <button onClick={() => handleAddWishlistItems(product)}>
                Add to wishlist
              </button>
            )}
          </div>
        );
      })}

      <Filters />
    </div>
  );
}
