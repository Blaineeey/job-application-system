import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, Paper, Divider } from "@mui/material";
import api from "../../../api/axios";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then(res => {
        setJob(res.data);
      })
      .catch(err => {
        console.error("Failed to load job", err);
        setError("Unable to fetch job details.");
      });
  }, [id]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!job) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {job.title}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom><strong>Location:</strong> {job.location}</Typography>
          <Typography variant="subtitle1" gutterBottom><strong>Type:</strong> {job.type}</Typography>
          <Typography variant="subtitle1" gutterBottom><strong>Salary:</strong> ₱{job.salary?.toLocaleString()}</Typography>
          <Typography variant="subtitle1" gutterBottom><strong>Deadline:</strong> {job.deadline}</Typography>
        </Box>

        <Typography variant="h6" gutterBottom>Description</Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {job.description}
        </Typography>
      </Paper>

      <Button
        variant="outlined"
        sx={{ mt: 3 }}
        onClick={() => navigate("/admin/jobs")}
      >
        ← Back to Job List
      </Button>
    </Container>
  );
}
