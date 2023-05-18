
import "./Filters.css";

export default function Filters({sortHandler,categoryHandler,ratingHandler,clearFiltersHandler}) {
  

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h5>Filters</h5>
        <button onClick={clearFiltersHandler}id="clear-btn">Clear</button>
      </div>
      <PriceSelector />
      <CategorySelector categoryHandler={categoryHandler}/>
      <RatingSelector ratingHandler={ratingHandler}/>
      <SortOrderSelector sortHandler={sortHandler}/>
    </div>
  );
}
function PriceSelector() {
  return (
    <div className="price-container">
      <h5>Price</h5>
      <div className="price-range">
        <label>500</label>
        <label>1000</label>
        <label>1500</label>
      </div>

      <input type="range" />
    </div>
  );
}

function CategorySelector({categoryHandler}) {
  
  return (
    <div>
      <h5>Category</h5>
      <div>
        <input type="checkbox" value="men"onChange={(e)=>categoryHandler(e.target.value)}/>
        <label>Men clothing</label>
      </div>
      <div>
        <input type="checkbox" value="women"onChange={(e)=>categoryHandler(e.target.value)} />
        <label>Women clothing</label>
      </div>
      <div>
        <input type="checkbox"value="kids"onChange={(e)=>categoryHandler(e.target.value)} />
        <label>kids clothing</label>
      </div>
    </div>
  );
}
function RatingSelector({ratingHandler}) {
  return (
    <div>
      <h5>Rating</h5>
      <div>
        <input type="radio" name="rate" value="4"onChange={(e)=>ratingHandler(e.target.value)}/>
        <label>4 stars & above</label>
      </div>
      <div>
        <input type="radio" name="rate" onChange={(e)=>ratingHandler(e.target.value)}/>
        <label>3 stars & above</label>
      </div>
      <div>
        <input type="radio" name="rate"value="2" onChange={(e)=>ratingHandler(e.target.value)}/>
        <label>2 stars & above</label>
      </div>
      <div>
        <input type="radio" name="rate" onChange={(e)=>ratingHandler(e.target.value)}/>
        <label>1 stars & above</label>
      </div>
    </div>
  );
}

function SortOrderSelector({sortHandler}) {
  return (
    <div>
      <h5>Sort by</h5>
      <div>
        <input
          type="radio"
          name="sort"
          value="HTL"
          onChange={(e)=>sortHandler(e.target.value)}
            
        />
        <label>Price-high to low</label>
      </div>
      <div>
        <input
          type="radio"
          name="sort"
            value="LTH"
            onChange={(e)=>sortHandler(e.target.value)}
        />
        <label>Price-low to high</label>
      </div>
    </div>
  );
}
