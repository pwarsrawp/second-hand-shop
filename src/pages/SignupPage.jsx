import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { postOne } from "../functions/api.calls";
const api_url = import.meta.env.VITE_API_URL;

function SignupPage() {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await postOne(`${api_url}/auth/signup`, {
        fullname,
        username,
        email,
        password,
        phone,
        address: {
          street,
          city,
          country,
        },
      });
      navigate("/login");
    } catch (error) {
      console.log("Issue with the sign up: ", error);
    }
  };

  return (
    <div className="signup-form">
      <Navbar />
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <label>Full name:</label>
        <input
          value={fullname}
          required
          onChange={(event) => {
            setFullName(event.target.value);
          }}
        />
        <label>Username:</label>
        <input
          value={username}
          required
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          required
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          required
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <label>Phone:</label>
        <input
          type="tel"
          value={phone}
          // pattern="[+][0-9]{2}[ ][0-9]{11,14}"
          placeholder="+34 12345678901"
          required
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />
        <label>Street:</label>
        <input
          value={street}
          required
          onChange={(event) => {
            setStreet(event.target.value);
          }}
        />
        <label>City:</label>
        <input
          value={city}
          required
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          value={country}
          required
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <button type="submit">Signup</button>
      </form>

      <div className="signup-form-bottom-text">
        <p>Already a member?</p>
        <Link to={"/login"}>Login</Link>
      </div>
    </div>
  );
}

export default SignupPage;
