import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav>
      <div>
        <Link to={"/"}>
          <h4>Home</h4>
        </Link>
      </div>
      <div>
        {isLoggedIn && (
          <>
            <Link to={"/purchases"}>
              <h4>Purchases</h4>
            </Link>
            <Link to={"/favorites"}>
              <h4>Favorites</h4>
            </Link>
            <Link to={"/upload"}>
              <h4>Upload</h4>
            </Link>
          </>
        )}
        <Link to={"/profile"}>
          <h4>Profile</h4>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
