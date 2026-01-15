import { useState, useEffect } from 'react';
import { getAuthHeader } from '../utils/auth.js';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            navigate("/login");
            return;
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch('https://auth-app-m6or.onrender.com/user/profile', {
                headers: {
                    ...getAuthHeader()
                }
            });

            if (response.status !== 200) {
                localStorage.removeItem("authToken");
                navigate("/login");
                return;
            }

            const data = await response.json();
            setUser(data);
        }
        fetchUserData();
    }, []);

    return (
        <>
            <div className="profile-wrapper">
                <div className="profile-card">
                    {user ? (
                        <>

                            <h2 className="profile-title">Profile Page</h2>
                            <p className="profile-email">Hii, {user.email || "No email provided"}</p>

                            <div className="info-section">
                                <div className="info-label">Full Name</div>
                                <div className="info-value">{user.name}</div>
                            </div>

                            <div className="nav-links">
                                <Link to="/users" className="link-btn">
                                    Manage Users List
                                </Link>

                            </div>
                        </>
                    ) : (
                        <p className="loading-text">Loading profile data...</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Profile;