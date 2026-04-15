import { useNavigate } from "react-router-dom";
import Assets from "../assets/assets";
import { useAppContext } from "../context/AppContext.js";

const Header = () => {
    const navigate = useNavigate()
    const { userData, isAdmin } = useAppContext()

    return (
        <div className="text-center d-flex flex-column align-items-center justify-content-center py-5 px-3"
            style={{ minHeight: "80vh" }}>
            <img src={Assets.header} alt="header" width={200} className="mb-4" />
            <h5 className="fw-semibold text-white">
                Hey {userData?.username || "Developer"} <span role="img" aria-label="wave">👋</span>
            </h5>
            <h1 className="fw-bold display-5 mb-3 text-white">Welcome to my product</h1>
            <p className="text-secondary fs-5 mb-4" style={{ maxWidth: "500px" }}>
                Let's start with a quick product tour and you can setup the authentication in no time!
            </p>

            <div className="d-flex gap-3 mt-2">
                {userData?.username ? (
                    <>
                        <button className="btn-primary rounded-pill px-4" onClick={() => navigate("/dashboard")}>
                            Go to Dashboard
                        </button>
                        {isAdmin && (
                            <button className="btn btn-danger rounded-pill px-4 text-white" onClick={() => navigate("/admin")}>
                                Admin Panel
                            </button>
                        )}
                    </>
                ) : (
                    <button className="btn-primary rounded-pill px-4" onClick={() => navigate("/login")}>
                        Get Started
                    </button>
                )}
            </div>
        </div>
    )
}

export default Header;