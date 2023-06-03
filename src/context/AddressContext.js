import { createContext, useReducer } from "react";

export const AddressContext = createContext()
const addressReducer= (state,action)=>{
    switch (action.type){
        case"ADD_ADDRESS":
        return{...state,addresses:action.payload}
        case"EDIT_ADDRESS":
        return {...state,addresses:action.payload}
        case "REMOVE_ADDRESS":
            return{...state,addresses:action.payload}
            default:
                return state
    }
}

export default function AddressProvider({children}){
    const[state,dispatch] = useReducer(addressReducer,{
        addresses:[]
    })
    return <AddressProvider value={{...state,dispatch}}>{children}</AddressProvider>
}