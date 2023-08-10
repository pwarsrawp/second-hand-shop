import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth.context";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
function IsPrivate({ children }) {
  const { isLoading, isLoggedIn } = useContext(AuthContext);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="loading-spinner-container">
          <h1>Bare with me...</h1>
          <Spinner />
        </div>
      </>
    );
  }

  return isLoggedIn ? (
    <div>{children}</div>
  ) : (
    <Navigate to="/login" replace={true} />
  );
}

export default IsPrivate;
