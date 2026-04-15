import api from "../util/axiosConfig.js"
import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { AppContext } from "../context/AppContext.js"
import handleToast from "../util/toast.js"
import apiMethod from "../services/api.js"

const AppContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()
    const isAdmin = userData?.role === "ADMIN"

    const contextValue = {
        userData, setUserData,
        loading, setLoading,
        isAdmin
    }

    useEffect(() => {
        apiMethod.getUserData(setLoading, setUserData)
    }, [])

    useEffect(() => {
        const interceptor = api.interceptors.response.use(
            (response) => response,

            async (error) => {
                if (error.response?.status === 401) {
                    setUserData({})
                    handleToast.notifyError("Session expired. Please login again.")
                    navigate("/login")
                }

                return Promise.reject(error)
            }
        );

        return () => {
            api.interceptors.response.eject(interceptor)
        }
    }, [navigate])

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider