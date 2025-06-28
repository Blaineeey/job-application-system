import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../api/axios";
import { Container, Typography, Box, CircularProgress } from "@mui/material";

export default function UserJobDetails() {
  const { id } = useParams();
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

  if (loading) return <Box p={4}><CircularProgress /></Box>;
  if (!job) return <Box p={4}><Typography color="error">Job not found.</Typography></Box>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {job.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {job.type} – {job.location}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {job.description}
      </Typography>
      <Typography variant="body2">
        <strong>Salary:</strong> ${parseFloat(job.salary).toFixed(2)}
      </Typography>
      <Typography variant="body2">
        <strong>Deadline:</strong> {new Date(job.deadline).toLocaleDateString()}
      </Typography>
    </Container>
  );
}
