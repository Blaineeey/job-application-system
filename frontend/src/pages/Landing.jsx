import { Container, Typography, Button, Box } from "@mui/material"
import { Link } from "react-router-dom"

export default function Landing() {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: { xs: 8, md: 12 },
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        sx={{
          fontWeight: 700,
          background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 3,
          fontSize: { xs: "2.5rem", md: "3.75rem" },
        }}
      >
        Welcome to the Job Application System
      </Typography>

      <Typography
        variant="h6"
        sx={{
          mb: 6,
          color: "text.secondary",
          maxWidth: "600px",
          mx: "auto",
          lineHeight: 1.6,
          fontSize: { xs: "1.1rem", md: "1.25rem" },
        }}
      >
        Apply for jobs, manage your applications, or post new job listings if you're an admin. Your career journey
        starts here.
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        gap={3}
        flexDirection={{ xs: "column", sm: "row" }}
        alignItems="center"
      >
        <Button
          variant="contained"
          component={Link}
          to="/login"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 600,
            background: "linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)",
            boxShadow: "0 4px 20px rgba(25, 118, 210, 0.3)",
            minWidth: { xs: "200px", sm: "auto" },
            "&:hover": {
              background: "linear-gradient(45deg, #1565c0 30%, #1976d2 90%)",
              boxShadow: "0 6px 25px rgba(25, 118, 210, 0.4)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Get Started
        </Button>

        <Button
          variant="outlined"
          component={Link}
          to="/register"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            textTransform: "none",
            fontSize: "1.1rem",
            fontWeight: 600,
            borderWidth: 2,
            minWidth: { xs: "200px", sm: "auto" },
            "&:hover": {
              borderWidth: 2,
              backgroundColor: "rgba(25, 118, 210, 0.04)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Create Account
        </Button>
      </Box>

      {/* Feature highlights */}
      <Box
        sx={{
          mt: 8,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 4,
          maxWidth: "800px",
          mx: "auto",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
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
            💼
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Easy Applications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Streamlined application process with one-click submissions
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
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
            📊
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Track Progress
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monitor your applications and get real-time status updates
          </Typography>
        </Box>

        <Box sx={{ textAlign: "center" }}>
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
            🤝
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Connect
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Network with employers and discover new opportunities
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
