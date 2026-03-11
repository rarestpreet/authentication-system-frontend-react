import constants from "../util/constants.js";

const saveUserData_Session = (userData) => {
    sessionStorage.setItem(constants.USER_PROFILE_DETAILS, JSON.stringify(userData))
}

const getUserProfile_Session = () => {
    try {
        const user = sessionStorage.getItem(constants.USER_PROFILE_DETAILS)
        return user ? JSON.parse(user) : {}
    } catch {
        return {}
    }
}

const getStoredResetState = () => {
    try {
        const stored = sessionStorage.getItem(constants.RESET_STORAGE_KEY)
        return stored ? JSON.parse(stored) : {}
    } catch {
        return {}
    }
}

const saveResetState = (state) => {
    sessionStorage.setItem(constants.RESET_STORAGE_KEY, JSON.stringify(state))
}

const clearResetState = () => {
    sessionStorage.removeItem(constants.RESET_STORAGE_KEY)
}

const clearUserProfile_Session = () => {
    sessionStorage.removeItem(constants.USER_PROFILE_DETAILS)
}

const handleSessionStorage = {
    saveUserData_Session,
    saveResetState,
    clearResetState,
    getUserProfile_Session,
    getStoredResetState,
    clearUserProfile_Session
}

export default handleSessionStorage