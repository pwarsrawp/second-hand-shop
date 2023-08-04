// http://localhost:5173/
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import Purchases from "./pages/PurchaseDetailPage";
import Products from "./pages/ProductDetailPage";
import Profile from "./pages/ProfilePage";
import Error from "./pages/ErrorPage";
// import IsPrivate from "./components/IsPrivate";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
