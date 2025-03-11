"use client";
import React from 'react'
// import { useRouter } from "next/router";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correcto en App Router

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await fetch('http://localhost:7000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) throw new Error('Error registering');

            setMessage('User registered successfully!');
            router.push('/login');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setMessage(err.message);
            } else {
                setMessage('An unknown error occurred');
            }
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Register
