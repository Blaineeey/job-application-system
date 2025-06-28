import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Job System</Typography>
        {!user ? (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        ) : (
          <>
            {user.role === "admin" ? (
              <Button color="inherit" component={Link} to="/admin">Admin Dashboard</Button>
            ) : (
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            )}
            <Button color="inherit" onClick={logout}>Logout</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}