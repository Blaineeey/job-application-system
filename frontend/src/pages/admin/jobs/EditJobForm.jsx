import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, MenuItem } from "@mui/material";
import api from "../../../api/axios";

export default function EditJobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", description: "", location: "", salary: "", type: "Full-Time", deadline: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/jobs/${id}`)
      .then((res) => {
        const job = res.data;
        setForm({
          title: job.title || "",
          description: job.description || "",
          location: job.location || "",
          salary: job.salary || "",
          type: job.type || "Full-Time",
          deadline: job.deadline || ""
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch job", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/jobs/${id}`, form);
      alert("Job updated successfully");
      navigate("/admin/jobs");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Failed to update job");
    }
  };

  if (loading) return <Typography>Loading job data...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Edit Job</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} required margin="normal" />
        <TextField fullWidth label="Description" name="description" multiline rows={4} value={form.description} onChange={handleChange} required margin="normal" />
        <TextField fullWidth label="Location" name="location" value={form.location} onChange={handleChange} required margin="normal" />
        <TextField fullWidth label="Salary" name="salary" value={form.salary} onChange={handleChange} type="number" margin="normal" />
        <TextField select fullWidth label="Type" name="type" value={form.type} onChange={handleChange} margin="normal">
          <MenuItem value="Full-Time">Full-Time</MenuItem>
          <MenuItem value="Part-Time">Part-Time</MenuItem>
          <MenuItem value="Internship">Internship</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
        </TextField>
        <TextField fullWidth label="Deadline" name="deadline" type="date" value={form.deadline} onChange={handleChange} InputLabelProps={{ shrink: true }} margin="normal" />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Update Job</Button>
      </form>
    </Container>
  );
}
