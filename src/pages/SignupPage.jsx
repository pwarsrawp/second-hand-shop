import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [fullName, setFullName] = useState("");
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
      const res = await axios.post("http://localhost:5005/auth/signup", {
        email,
        password,
      });
      console.log("signup done", res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Sign Up </h2>
      <form onSubmit={handleSignup}>
        <label>Full name: </label>
          <input
            value={fullName}
            required
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
        <label>Username: </label>
          <input
            value={username}
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        <label>Email: </label>
          <input
            type="email"
            value={email}
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label>Password: </label>
            <input
              type="password"
              value={password}
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
        <label>Phone: </label>
          <input
            type="tel"
            value={phone}
            required
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        <label>Street: </label>
          <input
            value={street}
            required
            onChange={(event) => {
              setStreet(event.target.value);
            }}
          />
        <label>City: </label>
          <input
            value={city}
            required
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
        <label>Country: </label>
          <input
            value={country}
            required
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
