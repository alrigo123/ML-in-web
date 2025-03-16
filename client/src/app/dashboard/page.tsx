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

"use client"

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
                const token = localStorage.getItem("token"); // Get token from storage
                if (!token) {
                    router.push("/auth/login"); // Redirect if no token
                    return;
                }

                const res = await axios.get("http://localhost:7000/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` }, // Send token in header
                });

                setUser(res.data); // Store user data
            } catch (error) {
                console.error("Error fetching user:", error);
                router.push("/auth/login"); // Redirect on error
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                {user ? (
                    <p className="text-lg">Welcome, <strong>{user.email}</strong>! 🎉</p>
                ) : (
                    <p>Loading user info...</p>
                )}
                <Link href="/dashboard/users">Manage Users</Link>
                <Link href="/dashboard/models">Manage Models</Link>
            </div>
        </div>
    );
};

export default Dashboard;
