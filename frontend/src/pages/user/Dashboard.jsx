import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>User Dashboard</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Explore and apply for jobs that fit your profile.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/dashboard/jobs")}>
        Browse Jobs
      </Button>
    </Container>
  );
}
