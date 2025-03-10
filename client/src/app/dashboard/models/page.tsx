/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const ModelsPage = () => {

  const [models, setModels] = useState([]);

  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await axios.get("http://localhost:7000/models");
        setModels(res.data);
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
      }
    }
    fetchModels();
  }, []);

  const handleDelete = async (id: number | string) => {
    try {
      await axios.delete(`http://localhost:7000/models/${id}`);
      // Actualizamos el estado eliminando el usuario borrado
      setModels(models.filter((usuario: any) => usuario.id !== id));
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Listado de Usuarios</h1>
      <Link
        href="/dashboard/models/new"
        className="bg-green-500 text-dark p-2 rounded inline-block my-4"
      >
        Crear Nuevo Modelo
      </Link>
      <ul>
        {models.map((model: any) => (
          <li
            key={model.id}
            className="border p-2 my-2 flex justify-between items-center"
          >
            <span>{model.name}</span>
            <span>{model.type}</span>
            <span>{model.description}</span>
            <div className="flex gap-2">
              <Link
                href={`/dashboard/models/${model.id}`}
                className="text-blue-600"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(model.id)}
                className="bg-red-600 text-dark p-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModelsPage
