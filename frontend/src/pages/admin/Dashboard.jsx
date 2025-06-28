import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Manage all job postings and review applications.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/admin/jobs")}>
        View All Jobs
      </Button>
    </Container>
  );
}
