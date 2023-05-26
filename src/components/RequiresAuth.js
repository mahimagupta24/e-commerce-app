import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function RequiresAuth({children}){
const location = useLocation()
const {token} = useContext(AuthContext)
console.log(token)
return token ? children:<Navigate to = "/login"state={{from:location}}/>
}