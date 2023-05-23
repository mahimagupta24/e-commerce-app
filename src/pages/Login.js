import "./Auth.css";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const {loginHandler} = useContext(AuthContext)
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const fixedLoginDetails = {
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
  };
  const onSubmitHandler=(e)=>{
    e.preventDefault()
    loginHandler(loginDetails.email,loginDetails.password)
  }
  return (
    <div className="test">
      <div className="login-container">
        <div>
          <h2 className="login-heading">Log In</h2>
        </div>
        <form className="details" onSubmit={onSubmitHandler}>
          <div className="address">
            <label>Email address</label>
            <input type="email" placeholder="test@gmail.com" value={loginDetails.email}onChange={(e)=>setLoginDetails({...loginDetails
            ,email:e.target.value})}/>
          </div>
          <div className="password">
            <label>Password</label>
            <input type="password" placeholder="********"value={loginDetails.password}onChange={(e)=>setLoginDetails({...loginDetails
            ,password:e.target.value})} />
          </div>
          <button onClick={() =>
                setLoginDetails({
                  email: fixedLoginDetails.email,
                  password: fixedLoginDetails.password,
                })
              }id="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
