import { useState,createContext } from "react";


export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  console.log(token)
    // const localStorageToken =JSON.parse(localStorage.getItem('loginItems'))
const loginHandler = async()=>{
    try{
      const creds={
        email: "adarshbalika@gmail.com",
    password: "adarshbalika"
      }
      const resp = await fetch("/api/auth/login",{
        method:'POST',
        body:JSON.stringify(creds)
      })
const data=await resp.json()
console.log(data.encodedToken)
setToken(data.encodedToken)
 localStorage.setItem('token',data.encodedToken)
 localStorage.setItem('user',data.foundUser.email)
 localStorage.setItem('password',data.foundUser.password)
    }catch(e){
        console.error(e)
    }
}

  return <AuthContext.Provider value={{loginHandler,token}}>{children}</AuthContext.Provider>;
}
