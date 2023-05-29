import { createContext } from "react";

export const AddressContext = createContext()

export default function AddressProvider({children}){
    return <AddressProvider>{children}</AddressProvider>
}