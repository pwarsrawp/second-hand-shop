import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// eslint-disable-next-line react/prop-types
const UserEditForm = ({ onSubmit }) => {
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");

  const handleNameInput = (event) => setFullName(event.target.value);
  const handlePhoneInput = (event) => setPhone(event.target.value);
  const handleEmailInput = (event) => setEmail(event.target.value);
  const handleUsernameInput = (event) => setUsername(event.target.value);
  const handleStreetInput = (event) => setStreet(event.target.value);
  const handleCountryInput = (event) => setCountry(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ fullname, username, phone, email, street, country });
  };

  return (
    <>
      <Navbar />
      <div className="update-form">
        <h1>Edit your details..</h1>
        <form onSubmit={handleSubmit}>
          <label>Name :</label>
          <input
            name="fullname"
            type="text"
            value={fullname}
            onChange={handleNameInput}
          />
          <label>User Name :</label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={handleUsernameInput}
          />
          <label>Mobile number :</label>
          <input
            name="phone"
            type="text"
            value={phone}
            onChange={handlePhoneInput}
          />
          <label>Email :</label>
          <input
            name="email"
            type="text"
            value={email}
            onChange={handleEmailInput}
          />

          <label>Street :</label>
          <input
            name="street"
            type="text"
            value={street}
            onChange={handleStreetInput}
          />
          <label>Country :</label>
          <input
            name="country"
            type="text"
            value={country}
            onChange={handleCountryInput}
          />
          <Link to="/">
            <button type="submit">Update</button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default UserEditForm;
