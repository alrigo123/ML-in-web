// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { FaUser, FaUsers, FaCogs, FaSignOutAlt } from "react-icons/fa";
// import axios from "axios";

// const Dashboard = () => {
//     const [user, setUser] = useState({ name: "John Doe", email: "johndoe@example.com" });

//     useEffect(() => {
//         // Fetch user data (Replace with actual API call)
//         const fetchUser = async () => {
//             try {
//                 const { data } = await axios.get("http://localhost:7000/auth/login"); // Example API
//                 setUser(data);
//             } catch (err) {
//                 console.error("Failed to fetch user data", err);
//             }
//         };
//         fetchUser();
//     }, []);

//     return (
//         <div className="d-flex">
//             {/* Sidebar */}
//             <div className="bg-dark text-light vh-100 p-3 d-flex flex-column shadow-lg" style={{ width: "250px" }}>
//                 <h2 className="text-center mb-4">Dashboard</h2>
//                 <div className="d-flex align-items-center mb-4 p-2 bg-secondary rounded">
//                     <FaUser size={40} className="me-2" />
//                     <div>
//                         <strong>{user.name}</strong>
//                         <br />
//                         <small>{user.email}</small>
//                     </div>
//                 </div>
//                 <nav className="nav flex-column">
//                     <Link href="/dashboard/users" className="nav-link text-light">
//                         <FaUsers className="me-2" /> Manage Users
//                     </Link>
//                     <Link href="/dashboard/models" className="nav-link text-light">
//                         <FaCogs className="me-2" /> Manage Models
//                     </Link>
//                 </nav>
//                 <div className="mt-auto">
//                     <button className="btn btn-danger w-100">
//                         <FaSignOutAlt className="me-2" /> Logout
//                     </button>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="p-4 flex-grow-1">
//                 <h1 className="display-6">Welcome, {user.name}! 👋</h1>
//                 <p className="text-muted">Here’s an overview of your dashboard.</p>

//                 <div className="row">
//                     <div className="col-md-6">
//                         <div className="card bg-primary text-white shadow p-3 mb-3">
//                             <h4>Manage Users</h4>
//                             <p>View, edit, and manage all users in the system.</p>
//                             <Link href="/dashboard/users" className="btn btn-light">
//                                 Go to Users
//                             </Link>
//                         </div>
//                     </div>
//                     <div className="col-md-6">
//                         <div className="card bg-success text-white shadow p-3 mb-3">
//                             <h4>Manage Models</h4>
//                             <p>Manage AI/ML models and configurations.</p>
//                             <Link href="/dashboard/models" className="btn btn-light">
//                                 Go to Models
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Dashboard = () => {
    const [user, setUser] = useState<{ email: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    router.push("/auth/login");
                    return;
                }

                const res = await axios.get("http://localhost:7000/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user:", error);
                router.push("/auth/login");
            }
        };

        fetchUser();
    }, [router]);

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        try {
            // If you have a logout endpoint, call it:
            await axios.post(
                "http://localhost:7000/auth/logout",
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (err) {
            console.warn("Logout API call failed, proceeding to clear session", err);
        } finally {
            localStorage.removeItem("token");
            router.push("/auth/login");
        }
    };

    return (
        // Main container for the dashboard, providing a consistent background and centering.
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-[Inter]">
            {/* Dashboard card container.
                Uses Tailwind for background, text color, padding, rounded corners, and shadow. */}
            <div className="bg-gray-800 text-white p-6 sm:p-8 lg:p-10 rounded-xl shadow-2xl max-w-3xl w-full">
                {/* Header section with title and logout button. */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-gray-700 pb-4">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-400 mb-4 sm:mb-0">
                        Dashboard
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </div>

                {/* Welcome message section. */}
                <div className="mb-8">
                    {user ? (
                        <p className="text-xl text-gray-300">
                            Welcome, <strong className="text-indigo-300">{user.email}</strong>! 🎉
                        </p>
                    ) : (
                        <p className="text-lg text-gray-400 animate-pulse">Loading user info...</p>
                    )}
                </div>

                {/* Navigation links for managing users and models. */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Manage Users Card */}
                    <Link
                        href="/dashboard/users"
                        className="block bg-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        <h2 className="text-2xl font-semibold text-indigo-300 mb-3 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.3.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                            Manage Users
                        </h2>
                        <p className="text-gray-400">View, add, and modify user accounts and permissions within the application.</p>
                    </Link>

                    {/* Manage Models Card */}
                    <Link
                        href="/dashboard/models"
                        className="block bg-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        <h2 className="text-2xl font-semibold text-indigo-300 mb-3 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                            </svg>
                            Manage Models
                        </h2>
                        <p className="text-gray-400">Configure, train, and monitor the AI and statistical models for weather prediction.</p>
                    </Link>
                </div>
            </div>
        </div>
    );

};

export default Dashboard;

