import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import UserDashboard from "./pages/user/Dashboard";
import AdminJobList from "./pages/admin/jobs/JobList";
import JobForm from "./pages/admin/jobs/JobForm";
import JobDetails from "./pages/admin/jobs/JobDetails";
import UserJobList from "./pages/user/jobs/JobList";
import UserJobDetails from "./pages/user/jobs/UserJobDetails";
import AppLayout from "./layouts/App";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import EditJobForm from "./pages/admin/jobs/EditJobForm";
import "./index.css";

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to={`/${user.role}`} />;
  return children;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="user">
                <UserLayout>
                  <UserDashboard />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/jobs"
            element={
              <ProtectedRoute role="user">
                <UserLayout>
                  <UserJobList />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/jobs/:id"
            element={
              <ProtectedRoute role="user">
                <UserLayout>
                  <UserJobDetails />
                </UserLayout>
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <AdminJobList />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs/new"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <JobForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs/:id/edit"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout>
                  <EditJobForm />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
