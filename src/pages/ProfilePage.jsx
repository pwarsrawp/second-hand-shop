
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/auth.context";

const Profile = () => {
  const [name, setName] = useState("");
  const [number, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleNameInput = (event) => setName(event.target.value);
  const handlePhoneInput = (event) => setPhone(event.target.value);
  const handleEmailInput = (event) => setEmail(event.target.value);
  const handleAddressInput = (event) => setAddress(event.target.value);

  const { isLoggedIn, user } = useContext(AuthContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = { name, number, email, address };
    newUser;
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
  };
  return isLoggedIn ? (
    <div>
      <h2>Welcome {user.name}!</h2>
      <p>{user.phone}</p>
      <p>{user.email}</p>
      <p>{user.address}</p>
    </div>
  ) : (
    <>
      <h2>Edit your details..</h2>
      <form onSubmit={handleSubmit}>
        <label>Name :</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={handleNameInput}
        />
        <label>Mobile number:</label>
        <input
          name="number"
          type="number"
          value={number}
          onChange={handlePhoneInput}
        />
        <label>Email:</label>
        <input
          name="email"
          type="text"
          value={email}
          onChange={handleEmailInput}
        />
        <label>Address:</label>
        <input
          name="address"
          type="text"
          value={address}
          onChange={handleAddressInput}
        />
        <Link to="/">
          <button type="submit">Update your Profile</button>
        </Link>
      </form>
    </>
  );
};

export default Profile;



