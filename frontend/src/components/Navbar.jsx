"use client"

import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton, Menu, MenuItem } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthContext"
import { useState } from "react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMenuLogout = () => {
    handleMenuClose()
    handleLogout()
  }

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 20px rgba(25, 118, 210, 0.15)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          py: 1,
          px: { xs: 2, sm: 3 },
        }}
      >
        {/* Logo/Brand */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontWeight: 700,
            color: "white",
            textDecoration: "none",
            background: "linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
            "&:hover": {
              background: "linear-gradient(45deg, #f5f5f5 30%, #ffffff 90%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            },
            transition: "all 0.3s ease",
          }}
        >
          JobApp System
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            {user?.role === "admin" ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/admin/jobs"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Manage Jobs
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/dashboard"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/dashboard/jobs"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Browse Jobs
                </Button>
              </>
            )}

            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                px: 2,
                py: 1,
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Logout
            </Button>
          </Box>

          {/* Mobile Navigation */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                color: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: "0.875rem",
                  background: "linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)",
                  color: "#1976d2",
                  fontWeight: 600,
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{
                "& .MuiPaper-root": {
                  borderRadius: 2,
                  mt: 1,
                  minWidth: 180,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              {user?.role === "admin"
                ? [
                    <MenuItem key="admin-dashboard" component={Link} to="/admin" onClick={handleMenuClose}>
                      Dashboard
                    </MenuItem>,
                    <MenuItem key="admin-jobs" component={Link} to="/admin/jobs" onClick={handleMenuClose}>
                      Manage Jobs
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key="user-dashboard" component={Link} to="/dashboard" onClick={handleMenuClose}>
                      Dashboard
                    </MenuItem>,
                    <MenuItem key="user-jobs" component={Link} to="/dashboard/jobs" onClick={handleMenuClose}>
                      Browse Jobs
                    </MenuItem>,
                  ]}
              <MenuItem onClick={handleMenuLogout} sx={{ color: "error.main" }}>
                Logout
              </MenuItem>
            </Menu>
          </Box>

          {/* Desktop User Avatar */}
          <Box sx={{ display: { xs: "none", md: "flex" }, ml: 2 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: "linear-gradient(45deg, #ffffff 30%, #e3f2fd 90%)",
                color: "#1976d2",
                fontWeight: 600,
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
