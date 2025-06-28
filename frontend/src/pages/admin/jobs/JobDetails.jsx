// src/pages/admin/jobs/JobDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import api from "../../../api/axios";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then(res => {
        console.log("Job fetched:", res.data);
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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{job.title}</Typography>
      <Box sx={{ mb: 2 }}>
        <Typography><strong>Location:</strong> {job.location}</Typography>
        <Typography><strong>Type:</strong> {job.type}</Typography>
        <Typography><strong>Salary:</strong> ₱{job.salary?.toLocaleString()}</Typography>
        <Typography><strong>Deadline:</strong> {job.deadline}</Typography>
      </Box>
      <Typography variant="body1">{job.description}</Typography>
    </Container>
  );
}
