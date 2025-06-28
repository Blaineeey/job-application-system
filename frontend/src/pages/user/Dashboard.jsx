"use client"

import { Container, Typography, Button, Box, Paper, Grid, Card, CardContent } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function UserDashboard() {
  const navigate = useNavigate()

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6 }}>
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
          Welcome Back!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "text.secondary",
            mb: 4,
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            maxWidth: "600px",
          }}
        >
          Explore and apply for jobs that fit your profile. Your next career opportunity is just a click away.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/dashboard/jobs")}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 600,
            background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
            boxShadow: "0 4px 20px rgba(25, 118, 210, 0.3)",
            "&:hover": {
              background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
              boxShadow: "0 6px 25px rgba(25, 118, 210, 0.4)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Browse Jobs
        </Button>
      </Box>

      {/* Dashboard Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #e3f2fd 30%, #bbdefb 90%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                  fontSize: "1.5rem",
                }}
              >
                📋
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#1976d2", mb: 1 }}>
                ...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Applications Sent
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #e8f5e8 30%, #c8e6c9 90%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                  fontSize: "1.5rem",
                }}
              >
                ⏳
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#388e3c", mb: 1 }}>
                ...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending Reviews
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #fff3e0 30%, #ffcc02 90%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                  fontSize: "1.5rem",
                }}
              >
                📞
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#f57c00", mb: 1 }}>
                ...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Interviews Scheduled
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 3,
              background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 3 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #fce4ec 30%, #f8bbd9 90%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: 2,
                  fontSize: "1.5rem",
                }}
              >
                💼
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#c2185b", mb: 1 }}>
                ...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Available Jobs
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}
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
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 3,
            color: "text.primary",
          }}
        >
          Quick Actions
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/dashboard/jobs")}
              sx={{
                py: 2,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                  backgroundColor: "rgba(25, 118, 210, 0.04)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              🔍 Search Jobs
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
