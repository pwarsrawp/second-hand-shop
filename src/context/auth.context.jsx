import React, { useState, useEffect } from "react";
import axios from "axios";

const api_url = "http://localhost:5005";
const AuthContext = createContext();

function AuthContextWrapper({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{
                user,
                isLoading,
                isLoggedIn
                }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextWrapper }; 
