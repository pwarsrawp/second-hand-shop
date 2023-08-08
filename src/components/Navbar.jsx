import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/logo.png"
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { PiHandshakeFill } from 'react-icons/pi';

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="nav-bar-top">
      <Link to={"/"}>
        <AiOutlineHome size={30} style={{color: "#6BBAEC"}}/>
        </Link>
        {isLoggedIn && (
          <>            
            <Link to={"/favorites"}>
            <AiOutlineHeart size={30} style={{color: "#6BBAEC"}}/>
            </Link>
            <Link to={"/upload"}>
            <AiOutlinePlusCircle size={30} style={{color: "#6BBAEC"}}/>
            </Link>
            <Link to={"/purchases"}>
            <PiHandshakeFill size={30} style={{color: "#6BBAEC"}}/>
            </Link>           
          </>
        )}
        <Link to={"/profile"}>
          <AiOutlineUser size={30} style={{color: "#6BBAEC"}} />
        </Link>
    </nav>
  );
}

export default Navbar;
