import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.js"
import Header from "../components/Header";

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const[selectedCategories,setSelectedCategories]=useState([])
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



  
    // const handleCategoryChange = (categoryName) => {
    //   setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
    //   navigate('/products');
    // };
    
    const handleCategoryChange = (categoryName) => {
      const updatedCategories=selectedCategories.includes(categoryName)?
     selectedCategories.filter((cat)=>cat!==categoryName):[...selectedCategories,categoryName]
      setSelectedCategories(updatedCategories)
      navigate('/products')
     }
    
      
  
  
    return (
      <div>
        <Header/>
        {isLoading&&<p>Loading...</p>}
        {!isLoading &&categories.map((category) => {
          const { _id, categoryName, description } = category;
          return (
            <div key={_id}>
              <h4>{categoryName} collection</h4>
              <p>{description}</p>
              <button onClick={()=>handleCategoryChange(categoryName)}>go </button>
            </div>
          );
        })}
        <button onClick={clickHandler}>Shop now</button>
        <Footer/>
      </div>
    );
}
