import "./Auth.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
 import {Link, useLocation, useNavigate} from "react-router-dom"

export default function Login() {
  const {loginHandler} = useContext(AuthContext)
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const fixedLoginDetails = {
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
  };
   const navigate = useNavigate()
  // const location = useLocation()
  // const token = localStorage.getItem("token")
  const onSubmitHandler=(e)=>{
    console.log('submit')
    e.preventDefault()
    loginHandler(loginDetails.email,loginDetails.password)
   
  }

  const onTestLogin = () => {
    console.log('test')
      setLoginDetails({
        email: fixedLoginDetails.email,
        password: fixedLoginDetails.password,
      });
    };
  
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
         <button type="submit"required={true}onClick={onTestLogin}id="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
}
