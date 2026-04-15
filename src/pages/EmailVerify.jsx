import { Link, useNavigate } from "react-router-dom"
import Assets from "../assets/assets"
import { useRef } from "react"
import { useAppContext } from "../context/AppContext.js"
import inputHandler from "../util/inputHandler.js"
import apiMethod from "../services/api.js";
import handleToast from "../util/toast.js";

const EmailVerify = () => {
    const inputRef = useRef([])
    const { loading, setLoading, setUserData } = useAppContext()
    const navigate = useNavigate()

    const handleVerify = async () => {
        const otp = inputRef.current.map(input => input.value).join("")
        if (otp.length !== 6) {
            handleToast.notifyError("Please enter valid otp")
            return
        }

        try {
            await apiMethod.verifyEmail(otp, setLoading, navigate, setUserData)
        } catch (e) {
            // Error handled in apiMethod
        }
    }


    return (
        <div
            className="email-verify-container d-flex align-items-center justify-content-center vh-100 position-relative"
            style={{ backgroundColor: "var(--bg-primary)" }}
        >
            <Link
                to="/"
                className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2 text-decoration-none"
            >
                <img src={Assets.logo} alt="logo" height={32} width={32} />
                <span className="fs-4 fw-semibold text-light">
                    Authify
                </span>
            </Link>

            <div
                className="glass-panel p-5 shadow-lg text-white"
                style={{
                    width: "400px"
                }}
            >
                <h4 className="text-center text-light fw-bold mb-2">
                    Email Verify OTP
                </h4>

                <p className="text-center text-light mb-4">
                    Enter the 6-digit code sent to your email.
                </p>

                <div className="d-flex justify-content-between gap-2 mb-4">
                    {[...Array(6)].map((_, i) => (
                        <input
                            key={i}
                            type="text"
                            maxLength={1}
                            className="input-field text-center fs-4 otp-input p-2"
                            ref={(el) => {
                                inputRef.current[i] = el
                            }}
                            onChange={(e) => inputHandler.handleChange(e, i, inputRef)}
                            onKeyDown={(e) => inputHandler.handleKeyDown(e, i, inputRef)}
                            onPaste={(e) => inputHandler.handlePaste(e, inputRef)}
                        />
                    ))}
                </div>

                <button
                    className="btn btn-primary w-100 fw-semibold"
                    disabled={loading}
                    onClick={handleVerify}
                >
                    {loading ? "Verifying..." : "Verify Email"}
                </button>
            </div>
        </div>
    );
};

export default EmailVerify;