"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { AlertCircle, Cloud, Eye, EyeOff, Loader2, Lock, LogIn, Mail, UserPlus } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [shake, setShake] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data } = await axios.post("http://localhost:7000/auth/login", { identifier, password });

            // Save token & redirect
            console.log("DATA FROM BE IN FE: ", data)
            localStorage.setItem("token", data.token);
            setTimeout(() => {
                setLoading(false);
                router.push("/dashboard");
            }, 1000);
        } catch (err) {
            let msg = "Credenciales inválidas";
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                if (err.response.data.message === "Invalid credentials") {
                    msg = "Email o contraseña incorrectos";
                } else {
                    msg = err.response.data.message;
                }
            }
            setError(msg);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            setLoading(false);
        }
    };

    // Function to toggle password visibility.
    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    //    GEMINI

    return (
        // Main container for the login page, centering the form vertically and horizontally.
        // Uses Tailwind for background, flexbox properties, and minimum height.
        <div className="flex items-center justify-center min-h-screen bg-gray-900 font-[Inter]">
            {/* Login card container.
                Uses Tailwind for background, text color, padding, rounded corners, shadow,
                and dynamic shake animation class.
                Max-width and full width for responsiveness. */}
            <div
                className={`bg-gray-800 text-white p-8 rounded-xl shadow-2xl max-w-md w-full ${shake ? "shake" : ""
                    }`}
            >
                {/* Login form title. */}
                <h2 className="text-center text-3xl font-bold mb-6">Iniciar Sesión</h2>

                {/* Error message display. */}
                {error && (
                    <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                {/* Login form. */}
                <form onSubmit={handleSubmit}>
                    {/* Identifier (Email or Username) input field. */}
                    <div className="mb-4">
                        <label htmlFor="identifier" className="block text-sm font-medium text-gray-300 mb-1">
                            Correo electrónico o nombre de usuario
                        </label>
                        <input
                            type="text"
                            id="identifier"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Usuario o email"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password input field with toggle. */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"} // Dynamically change input type
                                id="password"
                                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10" // Added pr-10 for icon space
                                placeholder="Ingrese su contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {/* Toggle button for password visibility */}
                            <button
                                type="button" // Important: type="button" to prevent form submission
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200 focus:outline-none"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    // EyeOff icon (inline SVG)
                                    // <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye-off">
                                    //     <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.54 18.54 0 0 1 2.21-3.6l-1.63-1.63A12.08 12.08 0 0 0 1 12c.78 2.34 2.39 4.29 4.34 5.43M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                                    //     <path d="M1 1l22 22"></path>
                                    //     <path d="M15.02 15.02a4 4 0 0 1-5.04-5.04"></path>
                                    //     <path d="M19.73 4.97A10.07 10.07 0 0 0 12 4c-7 0-11 8-11 8a18.54 18.54 0 0 0 2.21 3.6l1.63 1.63A12.08 12.08 0 0 1 1 12c.78-2.34 2.39-4.29 4.34-5.43"></path>
                                    // </svg>
                                    <EyeOff />
                                ) : (
                                    // Eye icon (inline SVG)
                                    // <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye">
                                    //     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    //     <circle cx="12" cy="12" r="3"></circle>
                                    // </svg>
                                    <Eye />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit button with loading indicator. */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                {/* Simple spinner animation using Tailwind classes. */}
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Cargando...
                            </span>
                        ) : (
                            "Ingresar"
                        )}
                    </button>
                </form>

                {/* Registration link. */}
                <p className="text-center mt-6 text-gray-400">
                    ¿No tienes cuenta?{" "}
                    <a href="/auth/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors duration-200">
                        Regístrate
                    </a>
                </p>
            </div>

            {/* Inline JSX style for the shake animation. */}
            <style jsx>{`
                .shake {
                    animation: shake 0.5s ease-in-out;
                }
                @keyframes shake {
                    0% {
                        transform: translateX(0);
                    }
                    20% {
                        transform: translateX(-5px);
                    }
                    40% {
                        transform: translateX(5px);
                    }
                    60% {
                        transform: translateX(-5px);
                    }
                    80% {
                        transform: translateX(5px);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    );

};

export default Login;


