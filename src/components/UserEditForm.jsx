import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUser, sendUser } from "../utils/usersAPICalls";
import { AuthContext } from "../context/auth.context";

// eslint-disable-next-line react/prop-types
const UserEditForm = () => {
  const { user, setUserUpdate } = useContext(AuthContext);

  const [fullname, setFullName] = useState(user.fullname);
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [street, setStreet] = useState(user.address.street);
  const [city, setCity] = useState(user.address.city);
  const [country, setCountry] = useState(user.address.country);
  const [password, setPassword] = useState(user.password);
  const [passwordHash, setPasswordHash] = useState(user.passwordHash);

  const handleNameInput = (event) => setFullName(event.target.value);
  const handlePhoneInput = (event) => setPhone(event.target.value);
  const handleEmailInput = (event) => setEmail(event.target.value);
  const handleUsernameInput = (event) => setUsername(event.target.value);
  const handleStreetInput = (event) => setStreet(event.target.value);
  const handleCityInput = (event) => setCity(event.target.value);
  const handleCountryInput = (event) => setCountry(event.target.value);
  const handlePasswordInput = (event) => setPassword(event.target.value);
  const handlePasswordHashInput = (event) =>
    setPasswordHash(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const handleUpdateUser = async () => {
      console.log("we are here:");
      const UpdatedUser = {
        fullname: fullname,
        username: username,
        email: email,
        phone: phone,
        address: {
          street: street,
          city: city,
          country: country,
        },
        password: password,
        passwordHash: passwordHash,
      };

      const response = await sendUser(UpdatedUser, user._id, "PUT");

      const parsed = await response.json();

      setUserUpdate(true);
      // navigate(`/users/${parsed._id}`);
    };
    handleUpdateUser();
  };

  return (
    <>
      <h2>Edit your details..</h2>

      <form onSubmit={handleSubmit}>
        <label>Name :</label>
        <input
          name="fullname"
          type="text"
          placeholder="enter name"
          value={fullname}
          onChange={handleNameInput}
        />
        <label>User Name :</label>
        <input
          name="username"
          type="text"
          placeholder="user name"
          value={username}
          onChange={handleUsernameInput}
        />
        <label>Mobile number :</label>
        <input
          name="phone"
          type="text"
          placeholder="mobile number"
          value={phone}
          onChange={handlePhoneInput}
        />
        <label>Email :</label>
        <input
          name="email"
          type="text"
          placeholder="your email address"
          value={email}
          onChange={handleEmailInput}
        />
        <label>Password :</label>
        <input
          name="password"
          type="text"
          placeholder="current password"
          value={password}
          onChange={handlePasswordInput}
        />
        <label>New Password :</label>
        <input
          name="new password"
          type="text"
          placeholder="new password"
          value={password}
          onChange={handlePasswordHashInput}
        />

        <label>Street :</label>
        <input
          name="street"
          type="text"
          placeholder="street"
          value={street}
          onChange={handleStreetInput}
        />
        <label>City :</label>
        <input
          name="city"
          type="text"
          placeholder="city"
          value={city}
          onChange={handleCityInput}
        />
        <label>Country :</label>
        <input
          name="country"
          type="text"
          placeholder="country"
          value={country}
          onChange={handleCountryInput}
        />
        <button type="submit">Update your Profile</button>
      </form>
    </>
  );
};

export default UserEditForm;
