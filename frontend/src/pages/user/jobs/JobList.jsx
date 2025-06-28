"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Box,
  Chip,
  Skeleton,
  TextField,
} from "@mui/material"
import api from "../../../api/axios"

export default function UserJobList() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs")
        setJobs(res.data)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getJobTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "full-time":
        return "#1976d2"
      case "part-time":
        return "#388e3c"
      case "contract":
        return "#f57c00"
      case "remote":
        return "#7b1fa2"
      default:
        return "#616161"
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
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
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Available Jobs
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            mb: 4,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          Discover your next career opportunity from {jobs.length} available positions
        </Typography>

        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search jobs by title, location, or type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            maxWidth: 600,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.9)",
              },
              "&.Mui-focused": {
                backgroundColor: "rgba(255, 255, 255, 1)",
              },
            },
          }}
        />
      </Box>

      {/* Jobs Grid */}
      <Grid container spacing={3}>
        {loading
          ? // Loading Skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <Card
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Skeleton variant="text" width="80%" height={32} />
                    <Skeleton variant="text" width="60%" height={24} sx={{ mt: 1 }} />
                    <Skeleton variant="text" width="40%" height={24} sx={{ mt: 1 }} />
                    <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                      <Skeleton variant="rounded" width={80} height={24} />
                      <Skeleton variant="rounded" width={60} height={24} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : // Job Cards
            filteredJobs.map((job) => (
              <Grid item xs={12} sm={6} lg={4} key={job.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => navigate(`/dashboard/jobs/${job.id}`)}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                  >
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      {/* Job Title */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          color: "text.primary",
                          lineHeight: 1.3,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {job.title}
                      </Typography>

                      {/* Location */}
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                          fontWeight: 500,
                        }}
                      >
                        📍 {job.location}
                      </Typography>

                      {/* Job Type */}
                      <Box sx={{ mb: 2 }}>
                        <Chip
                          label={job.type}
                          size="small"
                          sx={{
                            backgroundColor: getJobTypeColor(job.type),
                            color: "white",
                            fontWeight: 500,
                            fontSize: "0.75rem",
                          }}
                        />
                      </Box>

                      {/* Salary */}
                      <Box
                        sx={{
                          mt: "auto",
                          pt: 2,
                          borderTop: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: "#388e3c",
                            fontSize: "1.1rem",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          💰 ₱{Number.parseFloat(job.salary).toLocaleString()}
                          <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: "text.secondary", fontWeight: 400 }}
                          >
                            / month
                          </Typography>
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
      </Grid>

      {/* No Results Message */}
      {!loading && filteredJobs.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
          }}
        >
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            No jobs found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or check back later for new opportunities.
          </Typography>
        </Box>
      )}
    </Container>
  )
}
