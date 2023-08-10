import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import profileImg from "../assets/user.png";
import Spinner from "../components/Spinner";
import LogoutButton from "../components/Logout";
import DeleteButton from "../components/Delete";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {};

  return !user ? (
    <>
      <Navbar />
      <div className="loading-spinner-container">
        <h1>Bare with me...</h1>
        <Spinner />
      </div>
    </>
    ) : (
    <>
      <Navbar />
      <div className="profile-page-container">
        <img src={profileImg} alt="" />
        <h2>{user.fullname}</h2>
        <p>{user.username}</p>
        <p>{user.phone}</p>
        <p>{user.email}</p>
        <p>{user.street}</p>
        <p>{user.country}</p>
        <Link to="/editProfile">
          <button className="profile-page-container-button">
            Edit profile
          </button>
        </Link>
        <br/>
        <div className="profile-page-container-logout-delete">
          <Link to="/login">
            <div>
              <LogoutButton />
            </div>
          </Link>
          <Link to="/">
            <div>
              <DeleteButton />
            </div>
          </Link>
        </div>
      </div>
    </>
  )
};

export default Profile;
