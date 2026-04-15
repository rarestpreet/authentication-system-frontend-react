import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import EmailVerify from "./pages/EmailVerify"
import ResetPassword from "./pages/ResetPassword"
import Dashboard from "./pages/Dashboard"
import Admin from "./pages/Admin"
import { ProtectedRoute, PublicRoute, DashboardRoute, AdminRoute } from "./components/CustomRoute.jsx"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/email-verify" element={<EmailVerify />} />
        </Route >

        <Route element={<DashboardRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route >

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route >

      </Routes >
    </div >
  )
}

export default App
