import { useState, createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState("");
  
  console.log(token);

  const loginHandler = async ({email,password}) => {
    try {
      const creds = {
        email,
        password,
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

  const signUpHandler = async ({email,password,firstName,lastName}) => {
    try {
      const response = await fetch("api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName
        }),
      })
      if(response.status===201){
        const data = await response.json();
        setToken(data.encodedToken)
        navigate("/login")
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
