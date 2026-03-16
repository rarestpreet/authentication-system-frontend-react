import { useAppContext } from "../context/AppContext.js"
import { Navigate, Outlet } from "react-router-dom"
import { useEffect } from "react"
import handleToast from "../util/toast.js"

export const ProtectedRoute = () => {
    const { loading, userData } = useAppContext()

    if (loading) {
        return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                Loading...
            </div>
        )
    }

    useEffect(() => {
        if (!loading && !userData?.username) {
            handleToast.notifyInfo("Please login first")
        } else if (!loading && userData?.isAccountVerified) {
            handleToast.notifyInfo("Your email is already verified")
        }
    }, [loading, userData])

    if (!userData?.username) {
        return <Navigate to="/login" replace />
    }

    if (userData?.isAccountVerified) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export const PublicRoute = () => {
    const { userData } = useAppContext()

    useEffect(() => {
        if (userData?.username) {
            handleToast.notifyInfo("Already logged in")
        }
    }, [userData])

    if (userData?.username) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}