import { useAppContext } from "../context/AppContext.js"
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRoute = () => {
    const { loading, userData } = useAppContext()

    if (loading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center text-white">
                Loading...
            </div>
        )
    }

    if (!userData?.username) {
        return <Navigate to="/login" replace />
    }

    if (userData?.isAccountVerified) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export const DashboardRoute = () => {
    const { loading, userData } = useAppContext()

    if (loading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center text-white">
                Loading...
            </div>
        )
    }

    if (!userData?.username) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export const AdminRoute = () => {
    const { loading, userData, isAdmin } = useAppContext()

    if (loading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center text-white">
                Loading...
            </div>
        )
    }

    if (!userData?.username) {
        return <Navigate to="/login" replace />
    }

    if (!isAdmin) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}

export const PublicRoute = () => {
    const { userData } = useAppContext()

    if (userData?.username) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}