import { useContext } from "react";
import "./Header.css";
import { ProductContext } from "../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate()
  const { state:productState,dispatch } = useContext(ProductContext);
  const { cartProducts,removeCartProducts } = useContext(CartContext);
  const { removeWishlistProducts,state } = useContext(WishlistContext);
  const { logOutHandler, token, isLoggedIn } = useContext(AuthContext);

  const removeProductsHandler=()=>{
    logOutHandler();
    removeCartProducts();
    removeWishlistProducts();
  }

  return (
    <>
      <div className="header">
        <h2>Fashion Emporium</h2>
        <div className="search-container">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 16C9.77498 15.9996 11.4988 15.4054 12.897 14.312L17.293 18.708L18.707 17.294L14.311 12.898C15.405 11.4997 15.9996 9.77544 16 8C16 3.589 12.411 0 8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16ZM8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2Z"
              fill="#666666"
            />
          </svg>
          <input
            value={productState.searchText}
            onChange={(e) =>{
              dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value })
              
            }
           
            }
    
            placeholder="search"
            className="search-bar"
          />
        </div>
        <div className="nav-icons">
          {isLoggedIn ? (
            <Link to="/">
              <button className="nav-login-btn" onClick={() => removeProductsHandler()}>Log out</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="nav-login-btn">Login</button>
            </Link>
          )}
          <Link className="link-tag"to="/wishlist">
            <svg
              width="28"
              height="26"
              viewBox="0 0 28 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.75 1.75C4.29875 1.75 1.5 4.52 1.5 7.9375C1.5 10.6962 2.59375 17.2437 13.36 23.8625C13.5529 23.9798 13.7743 24.0419 14 24.0419C14.2257 24.0419 14.4471 23.9798 14.64 23.8625C25.4063 17.2437 26.5 10.6962 26.5 7.9375C26.5 4.52 23.7013 1.75 20.25 1.75C16.7988 1.75 14 5.5 14 5.5C14 5.5 11.2013 1.75 7.75 1.75Z"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="notification">{state.wishListProducts.length>0&&state.wishListProducts.length}</span>
          </Link>
          <Link className="link-tag"to="/cart">
            <svg
              width="28"
              height="25"
              viewBox="0 0 28 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.0381 17.5635H8.5918L9.46777 15.7793L24.0225 15.7529C24.5146 15.7529 24.9365 15.4014 25.0244 14.915L27.04 3.63281C27.0928 3.33691 27.0137 3.03223 26.8203 2.80078C26.7247 2.68688 26.6055 2.59512 26.471 2.53189C26.3364 2.46865 26.1897 2.43544 26.041 2.43457L7.52539 2.37305L7.36719 1.62891C7.26758 1.1543 6.83984 0.808594 6.35352 0.808594H1.82715C1.55287 0.808594 1.28982 0.917552 1.09587 1.1115C0.901927 1.30544 0.792969 1.56849 0.792969 1.84277C0.792969 2.11706 0.901927 2.3801 1.09587 2.57405C1.28982 2.768 1.55287 2.87695 1.82715 2.87695H5.51562L6.20703 6.16406L7.90918 14.4053L5.71777 17.9824C5.60397 18.136 5.53543 18.3184 5.51989 18.5089C5.50436 18.6995 5.54246 18.8905 5.62988 19.0605C5.80566 19.4092 6.16016 19.6289 6.55273 19.6289H8.39258C8.00035 20.1499 7.78849 20.7844 7.78906 21.4365C7.78906 23.0947 9.13672 24.4424 10.7949 24.4424C12.4531 24.4424 13.8008 23.0947 13.8008 21.4365C13.8008 20.7832 13.584 20.1475 13.1973 19.6289H17.917C17.5248 20.1499 17.3129 20.7844 17.3135 21.4365C17.3135 23.0947 18.6611 24.4424 20.3193 24.4424C21.9775 24.4424 23.3252 23.0947 23.3252 21.4365C23.3252 20.7832 23.1084 20.1475 22.7217 19.6289H26.041C26.6094 19.6289 27.0752 19.166 27.0752 18.5947C27.0735 18.3207 26.9635 18.0585 26.7692 17.8653C26.5749 17.6721 26.3121 17.5636 26.0381 17.5635ZM7.95606 4.41211L24.8252 4.46777L23.1728 13.7197L9.92187 13.7432L7.95606 4.41211ZM10.7949 22.3623C10.2852 22.3623 9.86914 21.9463 9.86914 21.4365C9.86914 20.9268 10.2852 20.5107 10.7949 20.5107C11.3047 20.5107 11.7207 20.9268 11.7207 21.4365C11.7207 21.6821 11.6232 21.9175 11.4495 22.0912C11.2759 22.2648 11.0405 22.3623 10.7949 22.3623ZM20.3193 22.3623C19.8096 22.3623 19.3936 21.9463 19.3936 21.4365C19.3936 20.9268 19.8096 20.5107 20.3193 20.5107C20.8291 20.5107 21.2451 20.9268 21.2451 21.4365C21.2451 21.6821 21.1476 21.9175 20.974 22.0912C20.8003 22.2648 20.5649 22.3623 20.3193 22.3623Z"
                fill="white"
              />
            </svg>
            <span className="notification">{cartProducts.length>0&&cartProducts.length}</span>

          </Link>
          {isLoggedIn ?
         <Link to="/logout"><span className="address-icon"><i className="fa fa-user"></i></span></Link> : <Link to="/login"><span className="address-icon"><i className="fa fa-user"></i></span></Link>}
        </div>
      </div>
    </>
  );
}
