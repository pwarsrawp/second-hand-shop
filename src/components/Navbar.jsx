import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { PiHouseFill } from "react-icons/pi";
import { PiUserFill } from "react-icons/pi";
import { PiHeartFill } from "react-icons/pi";
import { PiPlusCircleBold } from "react-icons/pi";
import { PiHandshakeFill } from "react-icons/pi";

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="nav-bar-top">
      <div className="nav-bar-top-link-container">
      <Link to={"/"}>
        <PiHouseFill size={30} style={{ color: "#1778b5" }} />
      </Link>
      {isLoggedIn && (
        <>
          <Link to={"/favorites"}>
            <PiHeartFill size={30} style={{ color: "#1778b5" }} />
          </Link>
          <Link to={"/upload"}>
            <PiPlusCircleBold size={30} style={{ color: "#1778b5" }} />
          </Link>
          <Link to={"/purchase"}>
            <PiHandshakeFill size={30} style={{ color: "#1778b5" }} />
          </Link>
        </>
      )}
      <Link to={"/profile"}>
        <PiUserFill size={30} style={{ color: "#1778b5" }} />
      </Link>
      </div>
    </nav>
  );
}

export default Navbar;
