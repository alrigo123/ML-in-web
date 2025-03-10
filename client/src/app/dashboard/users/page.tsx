/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const UsersPage = () => {

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const res = await axios.get("http://localhost:7000/users");
        setUsuarios(res.data);
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
      }
    }
    fetchUsuarios();
  }, []);

  const handleDelete = async (id: number | string) => {
    try {
      await axios.delete(`http://localhost:7000/users/${id}`);
      // Actualizamos el estado eliminando el usuario borrado
      setUsuarios(usuarios.filter((usuario: any) => usuario.id !== id));
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Listado de Usuarios</h1>
      <Link
        href="/dashboard/users/new"
        className="bg-green-500 text-dark p-2 rounded inline-block my-4"
      >
        Crear Nuevo Usuario
      </Link>
      <ul>
        {usuarios.map((usuario: any) => (
          <li
            key={usuario.id}
            className="border p-2 my-2 flex justify-between items-center"
          >
            <span>{usuario.nombre}</span>
            <span>{usuario.email}</span>
            <span>{usuario.password}</span>
            <div className="flex gap-2">
              <Link
                href={`/dashboard/users/${usuario.id}`}
                className="text-blue-600"
              >
                Editar
              </Link>
              <button
                onClick={() => handleDelete(usuario.id)}
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

export default UsersPage
