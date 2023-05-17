import { Routes, Route } from "react-router-dom";

import Filters from "./pages/Filters";

// import Header from "./components/Header";
import Home from "./pages/HomePage";
// import Login from "./pages/Login";
// import logo from "./logo.png";
import Mockman from "mockman-js";
import Products from "./pages/ProductPage";

function App() {
  return (
    <div className="App">
      {/* <Mockman /> */}
      {/* <Header /> */}
      {/* <Products /> */}
      {/* <Filters /> */}

      {/* <Login/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>

      {/* <header className="App-header"> 
        <img src={logo} alt="mockBee logo" width="180" height="180" />
        <h1 className="brand-title">
          Welcome to <span>mockBee!</span>
        </h1>
        <p className="brand-description">
          Get started by editing <code>src/App.js</code>
        </p>
        <div className="links">
          <a
            href="https://mockbee.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            Explore mockBee
          </a>
          <a
            href="https://mockbee.netlify.app/docs/api/introduction"
            target="_blank"
            rel="noreferrer"
          >
            API Documentation
          </a>
          <a
            href="https://github.com/neogcamp/mockBee"
            target="_blank"
            rel="noreferrer"
          >
            Contribute
          </a>
        </div>
      </header> */}
    </div>
  );
}

export default App;
