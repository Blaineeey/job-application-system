import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user from /user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/user");
        setUser(data);
      } catch {
        setUser(null);
        localStorage.removeItem("token"); 
      }
    };

    const token = localStorage.getItem("token");
    if (token) fetchUser();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      setUser(null);
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
