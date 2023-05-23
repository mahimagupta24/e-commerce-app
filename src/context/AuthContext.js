import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
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
 localStorage.setItem('foundUser',data.encodedToken)
 localStorage.setItem('user',data.foundUser.email)
 localStorage.setItem('user',data.foundUser.password)
    }catch(e){
        console.error(e)
    }
}

  return <AuthContext.Provider value={{loginHandler}}>{children}</AuthContext.Provider>;
}
