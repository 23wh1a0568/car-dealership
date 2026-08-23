import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/AdminDashboard"

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

function AdminRoute({ children }) {
  const token = localStorage.getItem("token")

  if (!token) {
    return <Navigate to="/login" replace />
  }

  try {
    const decoded = jwtDecode(token)

    if (decoded.role !== "admin") {
      return <Navigate to="/dashboard" replace />
    }

    return children
  } catch {
    localStorage.removeItem("token")
    return <Navigate to="/login" replace />
  }
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App