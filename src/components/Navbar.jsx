import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/logo.png"
import { AiFillHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdFavorite } from 'react-icons/md';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { PiHandshakeFill } from 'react-icons/pi';

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="nav-bar-top">
      <Link to={"/"}>
        <AiFillHome size={30} style={{color: "#6BBAEC"}}/>
        </Link>
        {isLoggedIn && (
          <>            
            <Link to={"/favorites"}>
            <MdFavorite size={30} style={{color: "#6BBAEC"}}/>
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
          <CgProfile size={30} style={{color: "#6BBAEC"}} />
        </Link>
    </nav>
  );
}

export default Navbar;
