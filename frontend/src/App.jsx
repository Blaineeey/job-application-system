import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Container from "@mui/material/Container";

export default function App() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}
