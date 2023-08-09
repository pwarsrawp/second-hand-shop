import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function ErrorPage() {
  return (
    <div className="error-background">
      <h1 className="error-h1">404 Oops</h1>
      <h2 className="error-h2">Let's go back exploring!</h2>
      <Link to="/">
        <button>Back Home</button>
      </Link>
    </div>
  );
}

export default ErrorPage;
