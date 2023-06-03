import { useContext, useState } from "react"
import { AddressContext } from "../context/AddressContext"

export default function UserAddress(){
    const{dispatch}=useContext(AddressContext)
    const [address,setAddress]=useState({name:"",home_address:"",city:'',state:'',postalCode:"",mobileNo:""})

    const handleSaveAddress = (address)=>{
dispatch({type:"ADD_ADDRESS",action:address})
    }

    return <div>
        <form>
            <input type="text"placeholder="Enter Name"/>
            <input placeholder="Enter House No,road,colony"/>
            <input type="text"placeholder="Enter City"/>
            <input type="text"placeholder="Enter State"/>
            <input type="number"placeholder="Enter Postal Code"/>
            <input type="number"placeholder="Enter Mobile no."/>
            <button onClick={()=>handleSaveAddress(address)} type="submit">Save</button>
        </form>
    </div>
}