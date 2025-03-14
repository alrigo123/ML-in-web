"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [shake, setShake] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data } = await axios.post("http://localhost:7000/auth/login", { email, password });

            // Save token & redirect
            localStorage.setItem("token", data.access_token);
            setTimeout(() => {
                setLoading(false);
                router.push("/dashboard");
            }, 1000);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || "Credenciales inválidas";
                if (message.includes("User not found")) {
                    setError("El correo electrónico no está registrado.");
                } else if (message.includes("Incorrect password")) {
                    setError("La contraseña es incorrecta.");
                } else {
                    setError(message);
                }
            } else {
                setError("Ocurrió un error desconocido");
            }
            setShake(true);
            setTimeout(() => setShake(false), 500); // Stops shake animation
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className={`card text-light bg-secondary p-4 shadow-lg ${shake ? "shake" : ""}`} style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Iniciar Sesión</h2>

                {error && <div className="alert alert-danger text-center">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Ingrese su email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span> Cargando...
                            </>
                        ) : (
                            "Ingresar"
                        )}
                    </button>
                </form>

                <p className="text-center mt-3">
                    ¿No tienes cuenta? <a href="/auth/register" className="text-light">Regístrate</a>
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

export default Login;
