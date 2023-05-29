import { useState } from "react";

export default function Address() {
  const [address, setAddress] = useState([
    {
      name: "adarsh balika",
      phoneNo: 91023456,
      pincode: 890172,
      home_address: "1241 gole market",
    },
  ]);
  return (
    <div>
      {address.map(({name,phoneNo,pincode,home_address}) => (
        <div><p>{name}</p>
        <p>{phoneNo}</p>
        <p>{pincode}</p>
        <p>{home_address}</p>
        <button>Place order</button>
        </div>
      ))}
    </div>
  );
}
