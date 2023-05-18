import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadCategories = async () => {
    try{
    const response = await fetch("/api/categories");
    if(response.status===200){
      const data = await response.json();
      const categories = data.categories;
      setCategories(categories);
    }
  }catch(e){
    console.error(e);
  }
  setIsLoading(false);
}

  useEffect(() => {
    loadCategories();
  }, []);

  const clickHandler = () => {
    navigate("/products");
  };

  const categoryHandler =  ()=> {
    navigate("/products");
  };
  
    return (
      <div>
        {isLoading&&<p>Loading...</p>}
        {!isLoading &&categories.map((category) => {
          const { _id, categoryName, description } = category;
          return (
            <div key={_id}>
              <h4>{categoryName} collection</h4>
              <p>{description}</p>
              <button onClick={categoryHandler}>go </button>
            </div>
          );
        })}
        <button onClick={clickHandler}>Shop now</button>
      </div>
    );
}
