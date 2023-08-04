import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5005/auth/login", {
        email,
        password,
      });
      console.log("singup done", res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
    return (
      <div>
        <h2>Sign Up </h2>
        <form onSubmit={handleSignup}>
          <label>
            Email:
            <input
              type="text"
              value={email}
              required
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              value={password}
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
          <button type="submit">Signup</button>
        </form>
      </div>
    );
  };
}

export default SignupPage;
