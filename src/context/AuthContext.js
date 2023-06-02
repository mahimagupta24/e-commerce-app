import { useState, createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(token);

  const loginHandler = async () => {
    try {
      const creds = {
        email: "adarshbalika@gmail.com",
        password: "adarshbalika",
      };
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(creds),
      });
      if (resp.status === 200) {
        const data = await resp.json();
        setToken(data.encodedToken);
        

        localStorage.setItem("token", data.encodedToken);
        localStorage.setItem("user", data.foundUser.email);
        localStorage.setItem("password", data.foundUser.password);
        navigate("/products");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const logOutHandler = () => {
    localStorage.removeItem("token", token);
    setToken("");
  };

  const checkUserStatus = () => {
    const encodedToken = localStorage.getItem("token", token);
    if (encodedToken) {
      setToken(encodedToken);
    }
  };

  const isLoggedIn = token.length !== 0;
  const signUpHandler = async () => {
    try {
      const response = await fetch("api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email: "",
          password: "",
          someUserAttribute1: "",
          someUserAttribute2: "",
        }),
      })
      if(response.status===200){
        const data = await response.json();
        console.log(data)
      }
    } catch (e) {
      console.log(e);
    }
  };
 
  return (
    <AuthContext.Provider
      value={{
        signUpHandler,
        checkUserStatus,
        loginHandler,
        logOutHandler,
        token,
         isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
