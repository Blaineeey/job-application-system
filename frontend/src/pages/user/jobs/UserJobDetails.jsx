import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Divider,
  Button
} from "@mui/material";

export default function UserJobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data);
      } catch (error) {
        console.error("Failed to fetch job:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading)
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );

  if (!job)
    return (
      <Box p={4}>
        <Typography color="error">Job not found.</Typography>
      </Box>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {job.title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" gutterBottom color="text.secondary">
          {job.type} — {job.location}
        </Typography>

        <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 3 }}>
          {job.description}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" gutterBottom>
            <strong>Salary:</strong> ₱{parseFloat(job.salary).toLocaleString()}
          </Typography>
          <Typography variant="body2">
            <strong>Deadline:</strong>{" "}
            {new Date(job.deadline).toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>

      <Button variant="outlined" sx={{ mt: 3 }} onClick={() => navigate("/dashboard/jobs")}>
        ← Back to Job List
      </Button>
    </Container>
  );
}
