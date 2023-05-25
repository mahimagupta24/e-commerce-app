import { useContext, useEffect, useState } from "react";
import Filters from "../components/Filters";
import Header from "../components/Header";
import "./ProductsListingpage.css";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
//  import { useNavigate } from "react-router-dom";

export default function Products() {
  const { handleAddCartItems, cartProducts, } = useContext(CartContext);
  const { handleAddWishlistItems, state } = useContext(WishlistContext);
  const {
    state:productState
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
    productState.searchText !== null
      ? products.filter(({ name }) => name.includes(productState.searchText))
      : products;

  const filteredProducts =
   productState.selectedCategories.length > 0
      ? searchedProducts.filter(({ categoryName }) =>
          productState.selectedCategories.includes(categoryName)
        )
      : searchedProducts;

  const sortedProducts =
    productState.sortOrder !== null
      ? filteredProducts.sort((a, b) =>
          productState.sortOrder === "HTL" ? b.price - a.price : a.price - b.price
        )
      : filteredProducts;

  const productsRating = productState.selectedRating
    ? sortedProducts.filter(({ rating }) => rating >= productState.selectedRating)
    : sortedProducts;

  const filteredPriceProducts = productState.selectedPrice
    ? productsRating.filter(({ price }) => price <= productState.selectedPrice)
    : productsRating;

  
  
 
  return (
    <div>
      <Header />
      {/* {filteredProducts&&<div><h2>Products:</h2> */}
      {filteredPriceProducts.map((product) => {
        const { _id, img,  original_price, price, rating,name } = product;
        const isCartProductPresent = cartProducts.some(
          (cartProduct) => cartProduct._id === product._id
        );
        const isWishlistProductPresent = state.wishListProducts.some(
          (wishListProduct) => wishListProduct._id === product._id
        );
       
        return (
          <div key={_id}>
       <Link  to ={`/product/${_id}`}><div className="product-card" key={_id}></div></Link>  
            <img className="product-img" src={img} alt={name} />
            <h4>{name}</h4>
            <p>Original Price: ${original_price}</p>
            <p>Price: ${price}</p>
            <p>Rating: {rating}</p>
            
            {isCartProductPresent ? (
              <Link to="/cart">
                <button className="cart-btn">Go to cart</button>
              </Link>
            ) : (
              <button className="cart-btn"onClick={() => handleAddCartItems(product)}>
                Add to cart
              </button>
            )}
            {isWishlistProductPresent ? (
              <Link to="/wishlist">
                <button className="wishlist-btn">Go to wishlist</button>
              </Link>
            ) : (
              <button className="wishlist-btn"onClick={() => handleAddWishlistItems(product)}>
                Add to wishlist
              </button>
            )}
            </div>
        
        )
      
      })}


      <Filters />
    </div>
  );
}
