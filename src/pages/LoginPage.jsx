import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Navbar from "../components/Navbar";
import { postOne } from "../functions/api.calls";
import Spinner from "../components/Spinner";
const api_url = import.meta.env.VITE_API_URL;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { userAuthentication } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true); 
      const { data } = await postOne(`${api_url}/auth/login`, {
        email: email,
        password: password
      });

      try {
        localStorage.setItem("authToken", data.token);
      } catch (error) {
        console.error("Error setting authToken in localStorage:", error);
      }

      await userAuthentication();
      navigate("/profile");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorMessage
      ) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage("An error occurred while logging in.");
      }
    }
  };

  return (
    <div className="login-form">
      <Navbar />
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />

        <label>Password:</label>
        <input
          type="password"
          name="current-password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button type="submit">Login</button>
      </form>
      {isLoading ? ( 
        <div className="loading-spinner-container">
          <Spinner />
        </div>
      ) : (
        errorMessage && <p className="error-message">{errorMessage}</p>
      )}

      <div className="login-form-bottom-text">
        <p>Not yet a member?</p>
        <Link to={"/signup"}>Sign Up</Link>
      </div>
    </div>
  );
}

export default LoginPage;
