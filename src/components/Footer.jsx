import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Footer() {
  const { isLoggedIn } = useContext(AuthContext);
  const linkStyle = {
    marginBottom: "0.3rem",
    textDecoration: "none",
  };

  return (
    <div className="footer-container">
      <div className="footer-inner-container">
        <div className="footer-contact-container">
          <h3>CONTACT DETAILS</h3>
          <p>Address: Schoutstraat 10, 1111 EV, Amsterdam</p>
          <p> TP: +34 12345678901</p>
          <p>Whatsapp :+34 12345678901</p>
          <p>email: info@3rdfoot.com </p>
        </div>
        <div className="footer-links-container">
          <Link to={"/"} style={linkStyle}>
            <h4>Home</h4>
          </Link>
          {isLoggedIn && (
            <>
              <Link to={"/purchases"} style={linkStyle}>
                <h4>Purchases</h4>
              </Link>
              <Link to={"/favorites"} style={linkStyle}>
                <h4>Favorites</h4>
              </Link>
            </>
          )}
          <Link to={"/profile"} style={linkStyle}>
            <h4>Profile</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
