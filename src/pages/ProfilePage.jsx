import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div>
        <h2>Welcome {user.fullname}!</h2>
        <p>{user.username}</p>
        <p>{user.phone}</p>
        <p>{user.email}</p>
        <p>{user.street}</p>
        <p>{user.country}</p>
      </div>
      <Link to="/editProfile">
        <button>Edit Your Profile</button>
      </Link>
    </>
  );
};

export default Profile;
