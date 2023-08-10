import { useContext, useState } from "react";
import { sendUser } from "../utils/usersAPICalls";
import { AuthContext } from "../context/auth.context";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const UserEditForm = () => {
  const { user, setUserUpdate } = useContext(AuthContext);
  const navigate = useNavigate()

  const [fullname, setFullName] = useState(user.fullname);
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [street, setStreet] = useState(user.address.street);
  const [city, setCity] = useState(user.address.city);
  const [country, setCountry] = useState(user.address.country);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleNameInput = (event) => setFullName(event.target.value);
  const handlePhoneInput = (event) => setPhone(event.target.value);
  const handleEmailInput = (event) => setEmail(event.target.value);
  const handleUsernameInput = (event) => setUsername(event.target.value);
  const handleStreetInput = (event) => setStreet(event.target.value);
  const handleCityInput = (event) => setCity(event.target.value);
  const handleCountryInput = (event) => setCountry(event.target.value);
  const handleOldPasswordInput = (event) => setOldPassword(event.target.value);
  const handleNewPasswordInput = (event) => setNewPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();

    const handleUpdateUser = async () => {
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
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      await sendUser(UpdatedUser, user._id, "PUT");

      setUserUpdate(true);
      navigate(`/profile`);
    };
    handleUpdateUser();
  };

  return (
    <>
      <Navbar />
      <div className="update-form">



      <form onSubmit={handleSubmit}>
        <label>Name :</label>
        <input
          name="fullname"
          type="text"
          placeholder="enter name"
          value={fullname}
          onChange={handleNameInput}
          required
        />
        <label>User Name :</label>
        <input
          name="username"
          type="text"
          placeholder="user name"
          value={username}
          onChange={handleUsernameInput}
          required
        />
        <label>Mobile number :</label>
        <input
          name="phone"
          type="text"
          placeholder="mobile number"
          value={phone}
          onChange={handlePhoneInput}
          required
        />
        <label>Email :</label>
        <input
          name="email"
          type="email"
          placeholder="your email address"
          value={email}
          onChange={handleEmailInput}
          required
        />
        <label>Password :</label>
        <input
          name="password"
          type="password"
          placeholder="current password"
          value={oldPassword}
          onChange={handleOldPasswordInput}
        />
        <label>New Password :</label>
        <input
          name="new password"
          type="password"
          placeholder="new password"
          value={newPassword}
          onChange={handleNewPasswordInput}
        />

        <label>Street :</label>
        <input
          name="street"
          type="text"
          placeholder="street"
          value={street}
          onChange={handleStreetInput}
          required
        />
        <label>City :</label>
        <input
          name="city"
          type="text"
          placeholder="city"
          value={city}
          onChange={handleCityInput}
          required
        />
        <label>Country :</label>
        <input
          name="country"
          type="text"
          placeholder="country"
          value={country}
          onChange={handleCountryInput}
          required
        />
        <button type="submit">Submit</button>
      </form>
      </div>

    </>
  );
};


export default UserEditForm;
