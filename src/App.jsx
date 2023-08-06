// http://localhost:5173/
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Purchases from "./pages/PurchaseDetailPage";
import Product from "./pages/ProductDetailPage";
import Profile from "./pages/ProfilePage";
import Error from "./pages/ErrorPage";
// import IsPrivate from "./components/IsPrivate";
import "./App.css";
import { AuthContextWrapper } from "./context/auth.context";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />

        {/* Private Routes */}
        <Route path="/profile" element={<AuthContextWrapper><Profile /></AuthContextWrapper>} />
        <Route path="/purchases" element={<AuthContextWrapper><Purchases /></AuthContextWrapper>} />

        {/* 404 Page */}
        <Route path="*" element={<Error />} />

      </Routes>
    </>
  );
}

export default App;
