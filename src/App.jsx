// http://localhost:5173/
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Purchases from "./pages/Purchases";
import Products from "./pages/Products";
// import IsPrivate from "./components/IsPrivate";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/purchases" element={<Purchases />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </>
  );
}

export default App;
