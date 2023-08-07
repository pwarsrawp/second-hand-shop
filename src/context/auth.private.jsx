import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth.context";

function IsPrivate({ children }) {
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  if (isLoading) {
    return <p>Just a second ...</p>; // TODO: add spinner
  }

  return isLoggedIn? (
  <div>{children}</div>
  ) : (
    <Navigate to="/login" replace={true}/>
  )
}

export default IsPrivate;
