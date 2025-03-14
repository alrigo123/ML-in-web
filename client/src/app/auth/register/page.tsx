"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [shake, setShake] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const { data } = await axios.post("http://localhost:7000/auth/register", { name, email, password });

            console.log("DATA PASSED: ", data)

            setMessage("✅ User registered successfully! Redirecting...");
            setTimeout(() => {
                setLoading(false);
                router.push("/auth/login");
            }, 2000);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMsg = err.response?.data?.message || "Registration failed!";
                setMessage(errorMsg);
            } else {
                setMessage("An unknown error occurred");
            }
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className={`card text-light bg-secondary p-4 shadow-lg ${shake ? "shake" : ""}`} style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Create Account</h2>

                {message && <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"} text-center`}>{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span> Registering...
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>

                <p className="text-center mt-3">
                    Already have an account? <a href="/auth/login" className="text-light">Log in</a>
                </p>
            </div>

            {/* Extra CSS for shake effect */}
            <style jsx>{`
                .shake {
                    animation: shake 0.5s ease-in-out;
                }
                @keyframes shake {
                    0% { transform: translateX(0); }
                    20% { transform: translateX(-5px); }
                    40% { transform: translateX(5px); }
                    60% { transform: translateX(-5px); }
                    80% { transform: translateX(5px); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};

export default Register;
