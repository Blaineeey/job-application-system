import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function UserLayout({ children }) {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {children || <Outlet />}
      </Container>
    </>
  );
}
