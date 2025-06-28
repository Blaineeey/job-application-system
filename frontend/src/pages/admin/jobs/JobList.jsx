"use client"

import { useEffect, useState } from "react"
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
  Paper,
  Chip,
  TextField,
  TableContainer,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import api from "../../../api/axios"

export default function JobList() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [jobToDelete, setJobToDelete] = useState(null)
  const navigate = useNavigate()

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs")
      setJobs(res.data)
    } catch (err) {
      console.error("Failed to fetch jobs", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (job) => {
    setJobToDelete(job)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!jobToDelete) return

    try {
      const res = await api.delete(`/jobs/${jobToDelete.id}`)
      if (res.status === 200) {
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobToDelete.id))
      } else {
        alert("Deletion failed. Please try again.")
      }
    } catch (err) {
      console.error("Delete error:", err)
      alert("Failed to delete job. Make sure you're authenticated.")
    } finally {
      setDeleteDialogOpen(false)
      setJobToDelete(null)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setJobToDelete(null)
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getJobTypeColor = (type) => {
    switch (type?.toLowerCase()) {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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
          Job Management
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            mb: 4,
            fontSize: { xs: "1rem", md: "1.25rem" },
          }}
        >
          Manage all job postings and track their performance
        </Typography>

        {/* Action Bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <TextField
            placeholder="Search jobs by title, location, or type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              maxWidth: { xs: "100%", sm: 400 },
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
            }}
          />

          <Button
            variant="contained"
            onClick={() => navigate("/admin/jobs/new")}
            sx={{
              px: 3,
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
              transition: "all 0.3s ease",
            }}
          >
            ➕ Add New Job
          </Button>
        </Box>
      </Box>

      {/* Jobs Table */}
      <Paper
        sx={{
          borderRadius: 3,
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
                  "& .MuiTableCell-head": {
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                  },
                }}
              >
                <TableCell>Job Title</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Deadline</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading
                ? // Loading Skeletons
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton variant="text" width="80%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="60%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rounded" width={80} height={24} />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="70%" />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1} justifyContent="center">
                          <Skeleton variant="rounded" width={60} height={32} />
                          <Skeleton variant="rounded" width={60} height={32} />
                          <Skeleton variant="rounded" width={60} height={32} />
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                : // Job Rows
                  filteredJobs.map((job) => (
                    <TableRow
                      key={job.id}
                      hover
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.04)",
                        },
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {job.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          📍 {job.location}
                        </Typography>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          📅 {formatDate(job.deadline)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" gap={1} justifyContent="center">
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => navigate(`/admin/jobs/${job.id}`)}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 500,
                              minWidth: "auto",
                              px: 2,
                              "&:hover": {
                                backgroundColor: "rgba(25, 118, 210, 0.04)",
                                transform: "translateY(-1px)",
                              },
                              transition: "all 0.2s ease",
                            }}
                          >
                            👁️ View
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => navigate(`/admin/jobs/${job.id}/edit`)}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 500,
                              minWidth: "auto",
                              px: 2,
                              "&:hover": {
                                backgroundColor: "rgba(25, 118, 210, 0.04)",
                                transform: "translateY(-1px)",
                              },
                              transition: "all 0.2s ease",
                            }}
                          >
                            ✏️ Edit
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteClick(job)}
                            sx={{
                              borderRadius: 2,
                              textTransform: "none",
                              fontWeight: 500,
                              minWidth: "auto",
                              px: 2,
                              "&:hover": {
                                backgroundColor: "rgba(211, 47, 47, 0.04)",
                                transform: "translateY(-1px)",
                              },
                              transition: "all 0.2s ease",
                            }}
                          >
                            🗑️ Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* No Results Message */}
        {!loading && filteredJobs.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No jobs found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm ? "Try adjusting your search criteria" : "Start by creating your first job posting"}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the job posting "{jobToDelete?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            color="error"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Delete Job
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
