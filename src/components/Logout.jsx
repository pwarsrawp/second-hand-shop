import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function LogoutButton() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  if (!isLoggedIn) {
    return null; 
  }

  return (
  <div>
    <button onClick={logout} className="profile-page-container-button">Logout</button>
  </div>
  );
}

export default LogoutButton;


