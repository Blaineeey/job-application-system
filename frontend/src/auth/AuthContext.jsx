import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/user");
        setUser(data);
      } catch (_) {
        setUser(null);
      }
    };
    const token = localStorage.getItem("token");
    if (token) fetchUser();
  }, []);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);