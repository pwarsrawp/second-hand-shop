import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/logo.png"
import { PiHouseFill } from 'react-icons/pi';
import { PiUserFill } from 'react-icons/pi';
import { PiHeartFill } from 'react-icons/pi';
import { PiPlusCircleBold } from 'react-icons/pi';
import { PiHandshakeFill } from 'react-icons/pi';

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="nav-bar-top">
      <Link to={"/"}>
        <PiHouseFill size={30} style={{color: "#6BBAEC"}}/>
        </Link>
        {isLoggedIn && (
          <>            
            <Link to={"/favorites"}>
            <PiHeartFill size={30} style={{color: "#6BBAEC"}}/>
            </Link>
            <Link to={"/upload"}>
            <PiPlusCircleBold size={30} style={{color: "#6BBAEC"}}/>
            </Link>
            <Link to={"/purchases"}>
            <PiHandshakeFill size={30} style={{color: "#6BBAEC"}}/>
            </Link>           
          </>
        )}
        <Link to={"/profile"}>
          <PiUserFill size={30} style={{color: "#6BBAEC"}} />
        </Link>
    </nav>
  );
}

export default Navbar;
