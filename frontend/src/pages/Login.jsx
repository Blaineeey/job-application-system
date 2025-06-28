"use client"

import { useState } from "react"
import { TextField, Button, Container, Typography, Box, Link as MuiLink, Paper, Alert } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"
import { useAuth } from "../auth/AuthContext"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await api.post("/login", form)
      localStorage.setItem("token", res.data.token)
      const { data } = await api.get("/user")
      setUser(data)
      navigate(data.role === "admin" ? "/admin" : "/dashboard")
    } catch (err) {
      setError("Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          width: "100%",
          maxWidth: 400,
          borderRadius: 4,
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem" }}>
            Sign in to your account
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              "& .MuiAlert-message": {
                fontSize: "0.95rem",
              },
            }}
          >
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              },
              "& .MuiInputLabel-root": {
                fontWeight: 500,
              },
            }}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            onChange={handleChange}
            required
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              },
              "& .MuiInputLabel-root": {
                fontWeight: 500,
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
              boxShadow: "0 4px 20px rgba(25, 118, 210, 0.3)",
              mb: 3,
              "&:hover": {
                background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                boxShadow: "0 6px 25px rgba(25, 118, 210, 0.4)",
                transform: "translateY(-1px)",
              },
              "&:disabled": {
                background: "linear-gradient(45deg, #90a4ae 30%, #b0bec5 90%)",
                transform: "none",
              },
              transition: "all 0.3s ease",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          {/* Sign Up Link */}
          <Typography
            textAlign="center"
            sx={{
              color: "text.secondary",
              fontSize: "0.95rem",
            }}
          >
            Don't have an account?{" "}
            <MuiLink
              component={Link}
              to="/register"
              sx={{
                fontWeight: 600,
                textDecoration: "none",
                background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Create Account
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}
