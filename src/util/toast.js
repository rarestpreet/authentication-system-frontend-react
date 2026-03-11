import { toast } from "react-toastify"

export const notifySuccess = (msg) => toast.success(msg)
export const notifyError = (msg) => toast.error(msg)
export const notifyInfo = (msg) => toast.info(msg)

const handleToast = {
    notifyError,
    notifySuccess,
    notifyInfo
}

export default handleToast