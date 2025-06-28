// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#9c27b0", // Purple
    },
    background: {
      default: "#f9fafb",
    },
  },
  typography: {
    fontFamily: "Segoe UI, sans-serif",
  },
});

export default theme;
