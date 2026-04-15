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
            // handleToast.notifyError(msg) // muted for silent loading
        }
    } finally {
        setLoading(false)
    }
}

const resetPassword = async (info, navigate, setLoading, setUserData) => {
    try {
        await api.post(
            "/auth/reset-password",
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
            `/auth/send-reset-otp?email=${email}`
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
            "/auth/logout"
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
            "/auth/send-verify-otp"
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
            "/auth/verify-email",
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
            "/auth/register",
            user
        )

        handleToast.notifySuccess("Account created successfully")
        navigate("/login")
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
            "/auth/login",
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

const createTodo = async (task) => {
    try {
        const response = await api.post(
            "/todo",
            { task }
        )
        handleToast.notifySuccess("Todo created")
        return response.data
    } catch (ex) {
        const msg = ex.response?.data?.message || "Failed to create todo"
        handleToast.notifyError(msg)
        throw ex
    }
}

const getTodos = async () => {
    try {
        const response = await api.get(
            "/todo"
        )
        return response.data
    } catch (ex) {
        const msg = ex.response?.data?.message || "Failed to fetch todos"
        handleToast.notifyError(msg)
        return []
    }
}

const updateTodo = async (id, task) => {
    try {
        await api.put(
            `/todo/${id}`,
            { task }
        )
        handleToast.notifySuccess("Todo updated")
    } catch (ex) {
        const msg = ex.response?.data?.message || "Failed to update todo"
        handleToast.notifyError(msg)
        throw ex
    }
}

const deleteTodo = async (id) => {
    try {
        await api.delete(
            `/todo/${id}`
        )
        handleToast.notifySuccess("Todo deleted")
    } catch (ex) {
        const msg = ex.response?.data?.message || "Failed to delete todo"
        handleToast.notifyError(msg)
        throw ex
    }
}

const getAllUsersAdmin = async () => {
    try {
        const response = await api.get(
            "profile/admin/all"
        )
        return response.data
    } catch (ex) {
        const msg = ex.response?.data?.message || "Failed to fetch users"
        handleToast.notifyError(msg)
        return []
    }
}

const getAllTodosAdmin = async () => {
    try {
        const response = await api.get(
            "/todo/admin/all"
        )
        return response.data
    } catch (ex) {
        const msg = ex.response?.data?.message || "Failed to fetch all todos"
        handleToast.notifyError(msg)
        return []
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
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    getAllUsersAdmin,
    getAllTodosAdmin
}

export default apiMethod