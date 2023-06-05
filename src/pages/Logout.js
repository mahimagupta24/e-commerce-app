import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Logout.css";
import Header from "../components/Header";


export default function Logout() {
  const { logOutHandler } = useContext(AuthContext);

  return <div>
    <Header/>
    <div className="logout-container">
      <h1>Logout</h1>
      <div className="logout-card">
      <h3> You are already logged in </h3>
    
      <button className="logout-btn"onClick={() => logOutHandler()}>Log out</button>
      </div>
    </div>
  </div>;
}
