import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import { useNavigate } from "react-router-dom"


export default function Price(){
  
  const navigate = useNavigate()
    const {cartProducts} = useContext(CartContext)
    const[discount,setDiscount] = useState(0)

    const totalPrice = cartProducts.reduce((acc, curr) => acc + curr.price*curr.qty, 0);
    console.log(totalPrice);
  
    const grandTotal = totalPrice-discount
    console.log(grandTotal)

    const checkoutHandler = ()=>{
      navigate("/address")
    }

    return <div>
        <button onClick ={()=>setDiscount(55)}>Apply coupon</button>
      <p>Total items:{cartProducts.length}</p>
      <p>discount:{discount}</p>
      <p>Total Price:{grandTotal}</p> 
      <button onClick={checkoutHandler}>Checkout</button>
    </div>
}