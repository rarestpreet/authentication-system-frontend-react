export const notifySuccess = (msg) => alert("[SUCCESS]" + msg)
export const notifyError = (msg) => alert("[ERROR]" + msg)
export const notifyInfo = (msg) => alert("[INFO]" + msg)

const handleToast = {
    notifyError,
    notifySuccess,
    notifyInfo
}

export default handleToast