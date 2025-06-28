import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Job Application System
      </Typography>
      <Button component={Link} to="/login" variant="contained" sx={{ m: 1 }}>
        Login
      </Button>
      <Button component={Link} to="/register" variant="outlined" sx={{ m: 1 }}>
        Register
      </Button>
    </Container>
  );
}
