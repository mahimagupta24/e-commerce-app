import "./Auth.css";
export default function Login() {
  return (
    <div className="test">
        
    <div className="login-container">
      <div>
    <h2 className="login-heading">Log In</h2>
    </div>
      <form className="details">
        <div className="address">
          <label>Email address</label>
          <input type="email" placeholder="test@gmail.com" />
        </div>
        <div className="password">
          <label>Password</label>
          <input type="password" placeholder="********" />
        </div>
        <button id="login-btn">Login</button>
      </form>
    </div>
    </div>
  );
}
