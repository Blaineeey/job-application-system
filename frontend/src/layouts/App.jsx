import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </>
  );
}