import { useState } from "react"
import Assets from "../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext.js"
import apiMethod from "../services/api.js";

const Login = () => {
    const [isCreateAccount, setIsCreateAccount] = useState(true)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { loading, setLoading, setUserData } = useAppContext()
    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        setLoading(true)

        if (isCreateAccount) {
            const user = {
                username: name,
                password: password,
                email: email
            }

            try {
                await apiMethod.register(user, navigate, setLoading)
            } catch (e) {
                // Error handled in apiMethod
            }
        } else {
            const user = {
                password: password,
                email: email
            }

            try {
                await apiMethod.login(user, navigate, setLoading, setUserData)
            } catch (e) {
                // Error handled in apiMethod
            }
        }
    }

    return (
        <div
            className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "var(--bg-primary)" }}
        >
            <Link
                to="/"
                className="d-flex align-items-center gap-2 fw-bold fs-4 text-decoration-none text-light"
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "30px"
                }}
            >
                <img src={Assets.logo} alt="logo" height={32} width={32} />
                <span>Authify</span>
            </Link>

            <div className="glass-panel p-4 shadow-lg text-white" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">
                    {isCreateAccount ? "Create Account" : "Login"}
                </h2>
                <form onSubmit={onSubmitHandler}>
                    {isCreateAccount &&
                        (
                            <div className="mb-3">
                                <label
                                    htmlFor="username"
                                    className="form-label">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    className="input-field"
                                    placeholder="Enter username"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required />
                            </div>
                        )
                    }
                    <div className="mb-3">
                        <label
                            htmlFor="email"
                            className="form-label">
                            Email Id
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="input-field"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="password"
                            className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="input-field"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <Link to="/reset-password" className="text-secondary text-decoration-none">
                            Forgot password?</Link>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary w-50" disabled={loading}>
                            {loading ? "Loading" : (isCreateAccount ? "Sign up" : "Login")}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-3">
                    <div className="mb-0">
                        {isCreateAccount ?
                            (
                                <div className="d-flex gap-1 justify-content-center">
                                    <span>Already have an account?</span>
                                    <span
                                        className="text-decoration-underline"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setIsCreateAccount(false)}
                                    >
                                        Login here
                                    </span>
                                </div>
                            ) :
                            (
                                <div className="d-flex gap-1 justify-content-center">
                                    <span>Don't have an account?</span>
                                    <span
                                        className="text-decoration-underline"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setIsCreateAccount(true)}
                                    >
                                        Signup here
                                    </span>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;