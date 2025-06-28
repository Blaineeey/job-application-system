"use client"

import { useEffect, useState } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { TextField, Button, Container, Typography, MenuItem, Box, Paper, Grid, Alert, Chip } from "@mui/material"
import api from "../../../api/axios"

export default function JobForm() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const isEdit = searchParams.get("edit") === "true"
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    type: "Full-Time",
    deadline: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (isEdit && id) {
      const fetchJob = async () => {
        try {
          const res = await api.get(`/jobs/${id}`)
          setForm(res.data)
        } catch (error) {
          setError("Failed to load job details")
        }
      }
      fetchJob()
    }
  }, [id, isEdit])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (isEdit) {
        await api.put(`/jobs/${id}`, form)
        setSuccess("Job updated successfully!")
      } else {
        await api.post("/jobs", form)
        setSuccess("Job created successfully!")
      }

      setTimeout(() => {
        navigate("/admin/jobs")
      }, 1500)
    } catch (err) {
      setError("Error saving job. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getJobTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "full-time":
        return "#1976d2"
      case "part-time":
        return "#388e3c"
      case "contract":
        return "#f57c00"
      case "internship":
        return "#7b1fa2"
      default:
        return "#616161"
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/admin/jobs")}
          sx={{
            mb: 3,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
              backgroundColor: "rgba(25, 118, 210, 0.04)",
              transform: "translateY(-1px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          ← Back to Job List
        </Button>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          {isEdit ? "Edit Job Posting" : "Create New Job"}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            mb: 4,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          {isEdit ? "Update the job posting details below" : "Fill in the details to create a new job posting"}
        </Typography>

        {/* Job Type Preview */}
        {form.type && (
          <Box sx={{ mb: 3 }}>
            <Chip
              label={`${form.type} Position`}
              sx={{
                backgroundColor: getJobTypeColor(form.type),
                color: "white",
                fontWeight: 600,
                fontSize: "0.875rem",
              }}
            />
          </Box>
        )}
      </Box>

      {/* Alerts */}
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
          }}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          severity="success"
          sx={{
            mb: 3,
            borderRadius: 2,
          }}
        >
          {success}
        </Alert>
      )}

      {/* Form */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Job Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
              />
            </Grid>

            {/* Location and Type */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Job Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
              >
                <MenuItem value="Full-Time">Full-Time</MenuItem>
                <MenuItem value="Part-Time">Part-Time</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
              </TextField>
            </Grid>

            {/* Salary and Deadline */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Monthly Salary (₱)"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                type="number"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Application Deadline"
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
              />
            </Grid>

            {/* Job Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                name="description"
                multiline
                rows={6}
                value={form.description}
                onChange={handleChange}
                required
                placeholder="Describe the job responsibilities, requirements, and qualifications..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                    },
                    "&.Mui-focused": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                  },
                }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin/jobs")}
                  disabled={loading}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      backgroundColor: "rgba(25, 118, 210, 0.04)",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                    boxShadow: "0 4px 20px rgba(25, 118, 210, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                      boxShadow: "0 6px 25px rgba(25, 118, 210, 0.4)",
                      transform: "translateY(-1px)",
                    },
                    "&:disabled": {
                      background: "linear-gradient(45deg, #90a4ae 30%, #b0bec5 90%)",
                      transform: "none",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  {loading ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update Job" : "Create Job"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
