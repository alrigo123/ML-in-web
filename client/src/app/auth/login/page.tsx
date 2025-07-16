"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
// import Link from "next/link";

const Login = () => {
    const [identifier, setIdentifier] = useState('');
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

    // return (
    //     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
    //         <div
    //             className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-500 ${shake ? "animate-shake" : ""}`}
    //         >
    //             <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
    //                 Iniciar Sesión
    //             </h2>

    //             {error && (
    //                 <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
    //                     {error}
    //                 </div>
    //             )}

    //             <form onSubmit={handleSubmit} className="space-y-6">
    //                 <div>
    //                     <label
    //                         htmlFor="identifier"
    //                         className="block text-sm font-medium text-gray-700"
    //                     >
    //                         Correo electrónico o nombre de usuario
    //                     </label>
    //                     <input
    //                         id="identifier"
    //                         type="text"
    //                         className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
    //                         placeholder="Usuario o email"
    //                         value={identifier}
    //                         onChange={(e) => setIdentifier(e.target.value)}
    //                         required
    //                     />
    //                 </div>
    //                 <div>
    //                     <label
    //                         htmlFor="password"
    //                         className="block text-sm font-medium text-gray-700"
    //                     >
    //                         Contraseña
    //                     </label>
    //                     <input
    //                         id="password"
    //                         type="password"
    //                         className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
    //                         placeholder="Ingrese su contraseña"
    //                         value={password}
    //                         onChange={(e) => setPassword(e.target.value)}
    //                         required
    //                     />
    //                 </div>

    //                 <button
    //                     type="submit"
    //                     className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:bg-blue-400"
    //                     disabled={loading}
    //                 >
    //                     {loading ? (
    //                         <>
    //                             <svg
    //                                 className="animate-spin h-5 w-5 mr-2 text-white"
    //                                 xmlns="http://www.w3.org/2000/svg"
    //                                 fill="none"
    //                                 viewBox="0 0 24 24"
    //                             >
    //                                 <circle
    //                                     className="opacity-25"
    //                                     cx="12"
    //                                     cy="12"
    //                                     r="10"
    //                                     stroke="currentColor"
    //                                     strokeWidth="4"
    //                                 ></circle>
    //                                 <path
    //                                     className="opacity-75"
    //                                     fill="currentColor"
    //                                     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    //                                 ></path>
    //                             </svg>
    //                             Cargando...
    //                         </>
    //                     ) : (
    //                         "Ingresar"
    //                     )}
    //                 </button>
    //             </form>

    //             <p className="text-center text-gray-600 mt-4">
    //                 ¿No tienes cuenta?{" "}
    //                 <Link href="/auth/register" className="text-blue-600 hover:underline">
    //                     Regístrate
    //                 </Link>
    //             </p>
    //         </div>

    //         <style jsx global>{`
    //     .animate-shake {
    //       animation: shake 0.5s ease-in-out;
    //     }
    //     @keyframes shake {
    //       0% {
    //         transform: translateX(0);
    //       }
    //       20% {
    //         transform: translateX(-5px);
    //       }
    //       40% {
    //         transform: translateX(5px);
    //       }
    //       60% {
    //         transform: translateX(-5px);
    //       }
    //       80% {
    //         transform: translateX(5px);
    //       }
    //       100% {
    //         transform: translateX(0);
    //       }
    //     }
    //   `}</style>
    //     </div>
    // );

    // return (
    //     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
    //         <div
    //             className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition-all duration-500 ${shake ? "animate-shake" : ""}`}
    //         >
    //             <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
    //                 Iniciar Sesión
    //             </h2>

    //             {error && (
    //                 <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">
    //                     {error}
    //                 </div>
    //             )}

    //             <form onSubmit={handleSubmit} className="space-y-6">
    //                 <div>
    //                     <label
    //                         htmlFor="identifier"
    //                         className="block text-sm font-medium text-gray-700"
    //                     >
    //                         Correo electrónico o nombre de usuario
    //                     </label>
    //                     <input
    //                         id="identifier"
    //                         type="text"
    //                         className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
    //                         placeholder="Usuario o email"
    //                         value={identifier}
    //                         onChange={(e) => setIdentifier(e.target.value)}
    //                         required
    //                     />
    //                 </div>
    //                 <div>
    //                     <label
    //                         htmlFor="password"
    //                         className="block text-sm font-medium text-gray-700"
    //                     >
    //                         Contraseña
    //                     </label>
    //                     <input
    //                         id="password"
    //                         type="password"
    //                         className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300"
    //                         placeholder="Ingrese su contraseña"
    //                         value={password}
    //                         onChange={(e) => setPassword(e.target.value)}
    //                         required
    //                     />
    //                 </div>

    //                 <button
    //                     type="submit"
    //                     className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:bg-blue-400"
    //                     disabled={loading}
    //                 >
    //                     {loading ? (
    //                         <>
    //                             <svg
    //                                 className="animate-spin h-5 w-5 mr-2 text-white"
    //                                 xmlns="http://www.w3.org/2000/svg"
    //                                 fill="none"
    //                                 viewBox="0 0 24 24"
    //                             >
    //                                 <circle
    //                                     className="opacity-25"
    //                                     cx="12"
    //                                     cy="12"
    //                                     r="10"
    //                                     stroke="currentColor"
    //                                     strokeWidth="4"
    //                                 ></circle>
    //                                 <path
    //                                     className="opacity-75"
    //                                     fill="currentColor"
    //                                     d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    //                                 ></path>
    //                             </svg>
    //                             Cargando...
    //                         </>
    //                     ) : (
    //                         "Ingresar"
    //                     )}
    //                 </button>
    //             </form>

    //             <p className="text-center text-gray-600 mt-4">
    //                 ¿No tienes cuenta?{" "}
    //                 <Link href="/auth/register" className="text-blue-600 hover:underline">
    //                     Regístrate
    //                 </Link>
    //             </p>
    //         </div>

    //         <style jsx global>{`
    //     .animate-shake {
    //       animation: shake 0.5s ease-in-out;
    //     }
    //     @keyframes shake {
    //       0% {
    //         transform: translateX(0);
    //       }
    //       20% {
    //         transform: translateX(-5px);
    //       }
    //       40% {
    //         transform: translateX(5px);
    //       }
    //       60% {
    //         transform: translateX(-5px);
    //       }
    //       80% {
    //         transform: translateX(5px);
    //       }
    //       100% {
    //         transform: translateX(0);
    //       }
    //     }
    //   `}</style>
    //     </div>
    // );

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

                    {/* Password input field. */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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


