import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth.context";

function IsPrivate({ children }) {
  const { isLoading, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Just a second ...</p>; // TODO: add spinner
  }
  if (!isLoggedIn) {
    navigate("/login");
  }
  return <div>{children}</div>;
}

export default IsPrivate;
