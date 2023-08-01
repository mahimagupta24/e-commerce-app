import axios from "axios";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import Price from "./Price";
import "./Cart.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Cart() {
  const { cartProducts, setCartProducts, removeCartHandler } =
    useContext(CartContext);
  const { isWishlistProductPresent, addWishlistItems } =
    useContext(WishlistContext);

  const fetchCartDetails = () => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/user/cart", {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((resp) => setCartProducts(resp.data.cart))
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const changeQuantityHandler = (productId, actionType) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `/api/user/cart/${productId}`,
        {
          action: {
            type: actionType,
          },
        },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp.data.cart);
        setCartProducts(resp.data.cart);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1>My Cart</h1>

        <div className="cart-container">
          <ul className="cart-card">
            {cartProducts.length > 0 &&
              cartProducts.map((product) => {
                return (
                  <li className="cart-list" key={product._id}>
                    {isWishlistProductPresent(product._id) ? (
                      <Link to="/wishlist">
                        <span className="wishlist"  onClick ={()=>removeCartHandler(product._id)}>
                          <i className="fa fa-heart"></i>
                        </span>
                       
                      </Link>
                    ) : (
                      <span
                        className="wishlist-icon"
                        onClick={() => {
                          addWishlistItems(product);
                          removeCartHandler(product._id)
                        }}
                      >
                        <i className="fa fa-heart"></i>
                      </span>
                    )}
                    <div>
                      <img
                        className="product-img"
                        src={product.img}
                        alt="clothes"
                        width="100"
                        height="200"
                      />
                    </div>
                    <div className="product-desc">
                      <p>{product.name}</p>
                      <p className="price">
                        <span> ₹{product.price}</span>
                        <span className="original-price">
                          ₹{product.original_price}
                        </span>
                      </p>
                    </div>
                    <button
                      className="cart-remove-btn"
                      onClick={() => removeCartHandler(product._id)}
                    >
                      Remove from cart
                    </button>
                    <div className="qty-btn">
                      <button className="increase-qty" disabled ={product.qty===1}
                        onClick={() =>
                          changeQuantityHandler(product._id, "decrement")
                        }
                      >
                        <i className="fa fa-minus"></i>
                      </button>
                      <span className="qty"> {product.qty}</span>
                      <button className="decrease-qty"
                        onClick={() =>
                          changeQuantityHandler(product._id, "increment")
                        }
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </li>
                );
              })}
          </ul>

          {cartProducts.length > 0 && <Price />}

          {cartProducts.length === 0 && (
            <h1 style={{ color: "grey" }}>Your cart is empty😑</h1>
          )}
        </div>
      </div>
    </div>
  );
}
