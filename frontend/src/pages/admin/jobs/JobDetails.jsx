"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Grid,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material"
import api from "../../../api/axios"

export default function JobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`)
        setJob(res.data)
      } catch (err) {
        console.error("Failed to load job", err)
        setError("Unable to fetch job details. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [id])

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress
            size={60}
            sx={{
              color: "#1976d2",
            }}
          />
          <Typography variant="h6" color="text.secondary">
            Loading job details...
          </Typography>
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert
          severity="error"
          sx={{
            borderRadius: 3,
            p: 3,
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Error Loading Job
          </Typography>
          <Typography variant="body1">{error}</Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/jobs")}
            sx={{
              mt: 2,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Back to Job List
          </Button>
        </Alert>
      </Container>
    )
  }

  if (!job) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
            Job Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            The job you're looking for doesn't exist or has been removed.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/admin/jobs")}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 600,
              background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
            }}
          >
            Back to Job List
          </Button>
        </Paper>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
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

      <Grid container spacing={3}>
        {/* Main Job Details */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 3,
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              mb: 3,
            }}
          >
            {/* Job Header */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                  fontSize: { xs: "1.75rem", md: "2.5rem" },
                  lineHeight: 1.2,
                }}
              >
                {job.title}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
                <Chip
                  label={job.type}
                  sx={{
                    backgroundColor: getJobTypeColor(job.type),
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  📍 {job.location}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Job Description */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: "text.primary",
                }}
              >
                Job Description
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-line",
                  lineHeight: 1.7,
                  color: "text.primary",
                  fontSize: "1.1rem",
                }}
              >
                {job.description}
              </Typography>
            </Box>

            {/* Admin Actions */}
            <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: "text.primary",
                }}
              >
                Admin Actions
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/admin/jobs/${job.id}/edit`)}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  ✏️ Edit Job
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Job Details Sidebar */}
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: 3,
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              mb: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: "text.primary",
                }}
              >
                Job Details
              </Typography>

              {/* Salary */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                  Salary
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: "#388e3c",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  💰 ₱{Number.parseFloat(job.salary || 0).toLocaleString()}
                  <Typography component="span" variant="body2" sx={{ color: "text.secondary", fontWeight: 400 }}>
                    / month
                  </Typography>
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Deadline */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                  Application Deadline
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  📅 {formatDate(job.deadline)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Job Type */}
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                  Employment Type
                </Typography>
                <Chip
                  label={job.type}
                  sx={{
                    backgroundColor: getJobTypeColor(job.type),
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Job Statistics */}
          <Card
            sx={{
              borderRadius: 3,
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: "text.primary",
                }}
              >
                Job Statistics
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Applications
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#1976d2" }}>
                    ...
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    Pending Review
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#f57c00" }}>
                    ...
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    Interviews Scheduled
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: "#388e3c" }}>
                    ...
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
