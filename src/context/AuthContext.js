import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const[isLoggedIn,setIsLoggedIn]= useState(false)
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

        console.log(data.encodedToken);
        setToken(data.encodedToken);
        setIsLoggedIn(true)

        localStorage.setItem("token", data.encodedToken);
        localStorage.setItem("user", data.foundUser.email);
        localStorage.setItem("password", data.foundUser.password);
         navigate("/products");
      }
    } catch (e) {
      console.error(e);
    }
  };

   const logOutHandler = ()=>{
    localStorage.removeItem("token",token)
    setToken("")
   }
  
   const checkUserStatus = ()=>{
    const encodedToken=localStorage.getItem("token",token)
    if(encodedToken){
      setToken(encodedToken)
    }
   }

  return (
    <AuthContext.Provider value={{ checkUserStatus,loginHandler, logOutHandler,token ,isLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
}
