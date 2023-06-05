import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function SignUp() {
  const { signUpHandler } = useContext(AuthContext);
  const [signupDetails, setSignUpDetails] = useState({});

  const onSubmitHandler = (e) => {
    console.log("signup");
    e.preventDefault();
    signUpHandler(signupDetails)
   
  };
  return (
    <div className="auth-main">
      <div className="auth-container">
        <h2 className="auth-heading">SIGN UP</h2>
        <form className="details"onSubmit={onSubmitHandler}>
          <div className="address">
          <input
            type="email"
            placeholder="enter email"
            onChange={(e) =>
              setSignUpDetails({ ...signupDetails, email: e.target.value })
            }
          />
          </div>
          <div className="password">
          <input
            type="password"
            placeholder="*********"
            onChange={(e) =>
              setSignUpDetails({ ...signupDetails, password: e.target.value })
            }
          />
          </div>
          <input
            type="text"
            placeholder="first name"
            onChange={(e) =>
              setSignUpDetails({ ...signupDetails, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="last name"
            onChange={(e) =>
              setSignUpDetails({ ...signupDetails, lastName: e.target.value })
            }
          />
          <button className="account-btn"type="submit" onClick={() => signUpHandler(signupDetails)}>
            create account
          </button>
        </form>
      </div>
    </div>
  );
}
