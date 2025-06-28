import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/jobs/${id}`);
      if (res.status === 200) {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      } else {
        alert("Deletion failed. Please try again.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete job. Make sure you're authenticated.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Job Postings</Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/admin/jobs/new")}
        sx={{ mb: 2 }}
      >
        Add Job
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Deadline</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id} hover>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>{job.type}</TableCell>
              <TableCell>{job.deadline}</TableCell>
              <TableCell>
                <Box display="flex" gap={1}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/admin/jobs/${job.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => navigate(`/admin/jobs/${job.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
