'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const NewModel = () => {

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:7000/models", { name, type, description });
            router.push("/dashboard/models");
        } catch (error) {
            console.error("Error al crear el modelo", error);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Crear Nuevo Modelo</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre del modelo"
                    className="w-full p-2 border mb-4"
                    required
                />
                <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Tipo del modelo"
                    className="w-full p-2 border mb-4"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descripcion del modelo"
                    className="w-full p-2 border mb-4"
                    required
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white p-2 rounded w-full"
                >
                    Crear Modelo
                </button>
            </form>
        </div>
    )
}

export default NewModel
