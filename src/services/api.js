import api from "../util/axiosConfig.js"
import handleSessionStorage from "./handleSessionStorage.js";
import handleToast from "../util/toast.js";

const getUserData = async (setLoading, setUserData) => {
    setLoading(true)

    try {
        const response = await api.get(
            "/profile",
        )

        setUserData(response.data)
        return response.data
    } catch (ex) {
        if (ex.response?.status !== 401) {
            const msg = ex.response?.data?.message || "Network error"
            handleToast.notifyError(msg)
        }
    } finally {
        setLoading(false)
    }
}

const resetPassword = async (info, navigate, setLoading, setUserData) => {
    try {
        await api.post(
            "/reset-password",
            info
        )

        handleSessionStorage.clearResetState()
        await logout(setUserData)
        handleToast.notifySuccess("Password changed successfully!")
        navigate("/login")

    } catch (ex) {
        const msg = ex.response?.data?.message || "Network error"
        handleToast.notifyError(msg)
    } finally {
        setLoading(false)
    }
}

const requestPasswordOtp = async (email, setLoading, setIsEmailSent) => {
    try {
        await api.post(
            `send-reset-otp?email=${email}`
        )

        handleToast.notifySuccess("Otp sent on email")
        setIsEmailSent(true)
        handleSessionStorage.saveResetState({ email, isEmailSent: true, otp: "", isOtpSubmitted: false })
    } catch (ex) {
        const msg = ex.response?.data?.message || "Network error"
        handleToast.notifyError(msg)
    } finally {
        setLoading(false)
    }
}

const logout = async (setUserData) => {
    try {
        await api.post(
            "/logout"
        )

        setUserData({})
        handleToast.notifySuccess("Logged out successfully")
    } catch (ex) {
        const msg = ex.response?.data?.message || "Network error"
        handleToast.notifyError(msg)
    }
}

const sendVerificationOtp = async (navigate) => {
    try {
        await api.get(
            "/send-verify-otp"
        )

        handleToast.notifySuccess("Otp sent successfully")
        navigate("/email-verify")
    } catch (ex) {
        const msg = ex.response?.data?.message || "Network error"
        handleToast.notifyError(msg)
    }
}

const verifyEmail = async (otp, setLoading, navigate, setUserData) => {
    setLoading(true)

    try {
        await api.post(
            "/verify-email",
            { otp }
        )

        handleToast.notifySuccess("Email verified successfully")
        await getUserData(setLoading, setUserData)
        navigate("/")
    } catch (ex) {
        const msg = ex.response?.data?.message || "Network error"
        handleToast.notifyError(msg)
    } finally {
        setLoading(false)
    }
}

const register = async (user, navigate, setLoading) => {
    try {
        await api.post(
            "/register",
            user
        )

        handleToast.notifySuccess("Account created successfully")
        navigate("/")
    } catch (ex) {
        const msg = ex.response?.data?.message || "Network error";
        handleToast.notifyError(msg)
    } finally {
        setLoading(false)
    }
}

const login = async (user, navigate, setLoading, setUserData) => {
    try {
        await api.post(
            "/login",
            user
        )

        handleToast.notifySuccess("Logged in successfully")
        await getUserData(setLoading, setUserData)
        navigate("/")
    } catch (ex) {
        const msg = ex.response?.data?.message || "Network error"
        handleToast.notifyError(msg)
    } finally {
        setLoading(false)
    }
}

const apiMethod = {
    login,
    logout,
    resetPassword,
    requestPasswordOtp,
    getUserData,
    sendVerificationOtp,
    verifyEmail,
    register,
}

export default apiMethod