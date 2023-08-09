import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Footer() {
  const { isLoggedIn } = useContext(AuthContext);
  const linkStyle = { textDecoration: "none", color: "black"};

  return (
    <div className="footer-container">
      <div>
        <div className="footer-text-container">
          <div className="footer-text-item">
            <h3>Guarantee</h3>
            <p>Buy with confidence warranty on all products!</p>
          </div>
          <div className="footer-text-item">
            <h3>Delivery</h3>
            <p>Free delivery around 2km</p>
          </div>
          <div className="footer-text-item">
            <h3>In Return</h3>
            <p>Easy and cheap from old to new!</p>
          </div>
        </div>
        <Link to={"/"} style={linkStyle}>
          <h4>Home</h4>
        </Link>
      </div>
      <div>
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
        <div>
          <div className="footer-contact-container">
            <h3>CONTACT DETAILS</h3>
            <p>Address: Schoutstraat 10, 1111 EV, Amsterdam</p>
            <p> TP: +34 12345678901</p>
            <p>Whatsapp :+34 12345678901</p>
            <p>email: info@3rdfoot.com </p>
          </div>
          <div className="footer-hours-container">
            <h3>OPENING HOURS</h3>
            <p>Monday 12:00 - 18:00</p>
            <p>Tuesday 11:00 AM - 6:00 PM</p>
            <p>Wednesday 09:00 AM - 6:00 PM</p>
            <p>Thursday 09:00 AM - 6:00 PM</p>
            <p>Friday 09:00 AM - 6:00 PM</p>
            <p>Saturday 11:00 AM - 6:00 PM</p>
            <p>Sunday closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
