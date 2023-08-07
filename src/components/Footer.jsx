import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Footer() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3>Gurantee</h3>
            <p>Buy with confidence warranty on all products!</p>
          </div>
          <div>
            <h3>Delivery</h3>
            <p>Free delivery around 2km</p>
          </div>
          <div>
            <h3>In Return</h3>
            <p>Easy and cheap from old to new!</p>
          </div>
        </div>
        <div></div>
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
          </>
        )}
        <Link to={"/profile"}>
          <h4>Profile</h4>
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3>CONTACT DETAILS</h3>
            <p>Address: Schoutstraat 10, 1111 EV, Amsterdam</p>
            <p> TP: +34 12345678901</p>
            <p>Whatsapp :+34 12345678901</p>
            <p>email: 3feet@3feet.com </p>
          </div>
          <div>
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
    </>
  );
}

export default Footer;
