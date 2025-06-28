import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { TextField, Button, Container, Typography, MenuItem } from "@mui/material";
import api from "../../../api/axios";

export default function JobForm() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get("edit") === "true";
  const [form, setForm] = useState({
    title: "", description: "", location: "", salary: "", type: "Full-Time", deadline: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      api.get(`/jobs/${id}`).then((res) => setForm(res.data));
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await api.put(`/jobs/${id}`, form);
        alert("Job updated");
      } else {
        await api.post("/jobs", form);
        alert("Job created");
      }
      navigate("/admin/jobs");
    } catch {
      alert("Error saving job");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>{isEdit ? "Edit Job" : "Create Job"}</Typography>
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
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>{isEdit ? "Update" : "Create"}</Button>
      </form>
    </Container>
  );
}
