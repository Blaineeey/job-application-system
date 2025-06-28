// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
      } catch {
        navigate("/login");
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    await api.post("/logout", {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          Welcome, {user?.name || "User"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is your dashboard.
        </Typography>
        <Button onClick={logout} variant="outlined" sx={{ mt: 4 }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}
