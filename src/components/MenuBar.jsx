import { useNavigate } from "react-router-dom";
import Assets from "../assets/assets";
import { useAppContext } from "../context/AppContext.js";
import { useRef, useState, useEffect } from "react";
import apiMethod from "../services/api.js";

const MenuBar = () => {
    const [dropDownOpen, setDropDownOpen] = useState(false)
    const dropDownRef = useRef(null)
    const navigate = useNavigate();
    const { userData, setUserData } = useAppContext()

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropDownRef.current &&
                !dropDownRef.current.contains(event.target)
            ) {
                setDropDownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    return (
        <nav className="container navbar d-flex justify-content-center"
            style={{
                width: "100%"
            }}>
            <div
                className="glass-panel px-4 py-3 mt-4 d-flex rounded-pill justify-content-between align-items-center mx-3"
                style={{
                    width: "100%",
                    userSelect: "none",
                }}
            >
                <div className="d-flex align-items-center gap-2">
                    <img src={Assets.logo} alt="logo" width={32} height={32} />
                    <span className="fw-bold fs-4 text-white">Authify</span>
                </div>

                {userData?.username ? (
                    <div className="position-relative" ref={dropDownRef}>
                        <div
                            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center cursor-pointer"
                            style={{
                                width: "40px",
                                height: "40px",
                                userSelect: "none",
                                cursor: "pointer"
                            }}
                            onClick={() => setDropDownOpen(state => !state)}
                        >
                            {userData.username[0].toUpperCase()}
                        </div>
                        {dropDownOpen && (
                            <div className="position-absolute shadow glass-panel p-2 mt-2"
                                style={{
                                    top: "50px",
                                    zIndex: 1000,
                                    right: 0
                                }}
                            >
                                {!userData.isAccountVerified && userData.role != "ADMIN" && (
                                    <div className="dropdown-item py-1 px-2 text-white"
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        onClick={() => {
                                            apiMethod.sendVerificationOtp(navigate)
                                        }}
                                    >
                                        Verify email
                                    </div>
                                )}
                                {userData.role != "ADMIN" && <div className="dropdown-item py-1 px-2 text-white"
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() => navigate("/reset-password")}
                                >
                                    Change password
                                </div>}
                                <div className="dropdown-item py-1 px-2 text-danger"
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() => {
                                        apiMethod.logout(setUserData)
                                    }}
                                >
                                    Logout
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <button
                        className="btn-primary rounded-pill px-4"
                        onClick={() => {
                            navigate("/login")
                        }}
                    >
                        Login <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                )}
            </div>
        </nav>
    );
};

export default MenuBar;