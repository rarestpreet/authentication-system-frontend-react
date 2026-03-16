import constants from "../util/constants.js";

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

const handleSessionStorage = {
    saveResetState,
    clearResetState,
    getStoredResetState,
}

export default handleSessionStorage