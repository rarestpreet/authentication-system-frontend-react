import { createContext, useContext, useState } from "react";
import { AppConstants } from "../util/constants";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true
axios.defaults.baseURL = AppConstants.BACKEND_URL

const AppContext = createContext({
    isLogged: false,
    setIsLogged: () => { },
    userData: {
        userId: "",
        username: "",
        isAccountVerified: false
    },
    setUserData: () => { },
    getUserData: async () => { }
})

export const AppContextProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState(false)
    const [userData, setUserData] = useState({})

    const getUserData = async () => {
        try {
            const response = await axios.get(
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
        isLogged, setIsLogged,
        userData, setUserData,
        getUserData
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)
