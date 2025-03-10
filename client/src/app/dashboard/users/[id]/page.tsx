'use client';
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const HandleUser = () => {

    const { id } = useParams();
    const router = useRouter();
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsuario() {
            try {
                const res = await axios.get(`http://localhost:7000/users/${id}`);
                setNombre(res.data.nombre);
            } catch (error) {
                console.error("Error al obtener el usuario", error);
            } finally {
                setLoading(false);
            }
        }
        if (id) {
            fetchUsuario();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:7000/users/${id}`, { nombre });
            router.push("/dashboard/users");
        } catch (error) {
            console.error("Error al actualizar el usuario", error);
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Editar Usuario {nombre}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre del usuario"
                    className="w-full p-2 border mb-4"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded w-full mb-4"
                >
                    Actualizar Usuario
                </button>
            </form>
        </div>
    )
}

export default HandleUser
