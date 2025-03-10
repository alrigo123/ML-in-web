'use client';
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const HandlerModel = () => {

    const { id } = useParams();
    const router = useRouter();
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fecthModel() {
            try {
                const res = await axios.get(`http://localhost:7000/models/${id}`);
                setName(res.data.name);
            } catch (error) {
                console.error("Error al obtener el usuario", error);
            } finally {
                setLoading(false);
            }
        }
        if (id) {
            fecthModel();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:7000/models/${id}`, { name });
            router.push("/dashboard/models");
        } catch (error) {
            console.error("Error al actualizar el model", error);
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Editar Model {name}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre del usuario"
                    className="w-full p-2 border mb-4"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-dark p-2 rounded w-full mb-4"
                >
                    Actualizar Model
                </button>
            </form>
        </div>
    )
}

export default HandlerModel
