'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const NewUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:7000/users", { name, email, password });
            router.push("/dashboard/users");
        } catch (error) {
            console.error("Error al crear el usuario", error);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Crear Nuevo Usuario</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre del usuario"
                    className="w-full p-2 border mb-4"
                    required
                />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email del usuario"
                    className="w-full p-2 border mb-4"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password del usuario"
                    className="w-full p-2 border mb-4"
                    required
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white p-2 rounded w-full"
                >
                    Crear Usuario
                </button>
            </form>
        </div>
    )
}

export default NewUser
