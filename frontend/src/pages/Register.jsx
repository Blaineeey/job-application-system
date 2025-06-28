import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (errors) alert(Object.values(errors).flat().join("\n"));
      else alert("Registration failed.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <TextField fullWidth label="Name" name="name" margin="normal" onChange={handleChange} required />
        <TextField fullWidth label="Email" name="email" type="email" margin="normal" onChange={handleChange} required />
        <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} required />
        <TextField fullWidth label="Confirm Password" name="password_confirmation" type="password" margin="normal" onChange={handleChange} required />
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>Register</Button>
      </Box>
    </Container>
  );
}
