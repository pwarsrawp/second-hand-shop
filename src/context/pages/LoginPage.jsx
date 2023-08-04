import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
 
const api_url = "http://localhost:5005";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    
    const navigate = useNavigate();
   
    
    const handleLoginSubmit = (event) => {
        event.preventDefault()


        try {
            const { data } = await axios.post("http://localhost:5005/auth/login", {email,password});

            localStorage.setItem("authToken", data.token); // TODO: check for keyname (backend)
        
            await authenticateUser();
            nav("/");           // TODO: add route
                
        } catch (error) {
            console.log(err);
            setErrorMessage(err.response.data.errorMessage);
        }

    };


  return (
     <div>
      <h1>Login</h1>
 
      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={(event) => {setEmail(event.target.value)}}
        />
 
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(event) => {setPassword(event.target.value)}}
        />
 
        <button type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p>Not yet a member?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  )
}

export default LoginPage