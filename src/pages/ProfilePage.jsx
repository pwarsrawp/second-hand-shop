import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import profileImg from "../assets/user.png"
import { PiPenFill } from 'react-icons/pi';
import LogoutButton from "../components/Logout";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <div className="profile-page-container">
        <img src={ profileImg } alt=""/>
        <h2>{user.fullname}</h2>
        <p>{user.username}</p>
        <p>{user.phone}</p>
        <p>{user.email}</p>
        <p>{user.street}</p>
        <p>{user.country}</p>
        <Link to="/editProfile">
          <button><PiPenFill size={15}/></button>
        </Link>
      <div className="logout button">
        <LogoutButton />
      </div>
      </div>
    </>
  );
};

export default Profile;
