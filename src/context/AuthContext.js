import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
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

        localStorage.setItem("token", data.encodedToken);
        localStorage.setItem("user", data.foundUser.email);
        localStorage.setItem("password", data.foundUser.password);
        navigate("/products");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ loginHandler, token }}>
      {children}
    </AuthContext.Provider>
  );
}
