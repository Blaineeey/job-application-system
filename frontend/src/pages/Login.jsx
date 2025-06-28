import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      const { data } = await api.get("/user");
      setUser(data);
      navigate(data.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h5" gutterBottom textAlign="center">Login</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField name="email" label="Email" type="email" fullWidth margin="normal" onChange={handleChange} required />
        <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} required />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Login</Button>
      </Box>
    </Container>
  );
}
