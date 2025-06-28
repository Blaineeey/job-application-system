// src/pages/Landing.jsx
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Container maxWidth="md" sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Box textAlign="center" width="100%">
        <Typography variant="h2" gutterBottom>
          Job Application System
        </Typography>
        <Typography variant="h6" gutterBottom>
          Manage your job applications easily and efficiently.
        </Typography>
        <Box mt={4}>
          <Button component={Link} to="/login" variant="contained" sx={{ mr: 2 }}>
            Login
          </Button>
          <Button component={Link} to="/register" variant="outlined">
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
