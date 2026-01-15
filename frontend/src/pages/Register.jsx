import { useState } from "react";
import { registerUser } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await registerUser(formData);

            console.log("REGISTER RESPONSE:", res);

            alert("Registration successful!");
            navigate("/login");
        } catch (error) {
            console.error("REGISTER ERROR:", error);
            alert("Registration failed. Check console.");
        }
    };


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }




    return (
        <>
            <div className="register-wrapper">
                <div className="register-card">
                    <h2 className="register-title">Create Account</h2>
                    <p className="register-subtitle">Enter your details to get started.</p>

                    <form onSubmit={handleSubmit}>
                        {/* NAME OPTION */}
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                className="form-input"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* EMAIL OPTION */}
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                className="form-input"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* PASSWORD OPTION */}
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                className="form-input"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="register-btn">
                            Create Account
                        </button>
                    </form>

                    <p className="register-footer">
                        Already have an account? <Link to="/login" className="login-link">Login</Link>
                    </p>

                </div>
            </div>
        </>

    );

};

export default Register;