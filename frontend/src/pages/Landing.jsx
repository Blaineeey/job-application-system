import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <Container maxWidth="md" sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Job Application System
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Apply for jobs, manage your applications, or post new job listings if you're an admin.
      </Typography>
      <Box display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" component={Link} to="/login">
          Login
        </Button>
        <Button variant="outlined" component={Link} to="/register">
          Register
        </Button>
      </Box>
    </Container>
  );
}
