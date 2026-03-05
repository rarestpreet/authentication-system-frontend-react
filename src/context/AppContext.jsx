import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../util/axiosConfig";

const AppContext = createContext({
    userData: {
        userId: "",
        username: "",
        isAccountVerified: false
    },
    setUserData: () => { },
    getUserData: async () => { }
})

export const AppContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({})

    const getUserData = async () => {
        try {
            const response = await api.get(
                "/profile",
            )

            setUserData(response.data)
            return response.data
        }
        catch (ex) {
            if (ex.response) {
                toast.error(ex.response)
            }
            else {
                toast.error("Network error")
            }
        }
    }

    const contextValue = {
        userData, setUserData,
        getUserData
    }

    useEffect(() => {
        getUserData()
    }, [])

    useEffect(() => {
        const interceptor = api.interceptors.response.use(
            (response) => response,

            async (error) => {
                console.log("found error");
                
                if (error.response?.status === 401) {
                    setUserData({});
                    setIsLogged(false);
                    toast.error("Session expired. Please login again.");
                    navigate("/login");
                }

                return Promise.reject(error);
            }
        );

        return () => {
            api.interceptors.response.eject(interceptor);
        };
    }, []);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)
