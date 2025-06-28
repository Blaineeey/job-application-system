// src/App.jsx
import { Outlet, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function App() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  return (
    <>
      {!isAuthPage && (
        <AppBar position="static" color="primary">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" component={Link} to="/" sx={{ color: "white", textDecoration: "none" }}>
              Job App System
            </Typography>
            {!token ? (
              <Box>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/register" color="inherit">
                  Register
                </Button>
              </Box>
            ) : (
              <Button component={Link} to="/dashboard" color="inherit">
                Dashboard
              </Button>
            )}
          </Toolbar>
        </AppBar>
      )}
      <main>
        <Outlet />
      </main>
    </>
  );
}
