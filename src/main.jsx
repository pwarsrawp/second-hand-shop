import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextWrapper } from "./context/auth.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextWrapper>
      <App />
    </AuthContextWrapper>
  </React.StrictMode>
);
