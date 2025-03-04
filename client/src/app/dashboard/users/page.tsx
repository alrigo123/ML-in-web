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

    return (
        <div className="p-6">
      <h1 className="text-2xl font-bold">Listado de Usuarios</h1>
      <Link
        href="/dashboard/users/new"
        className="bg-green-500 text-white p-2 rounded inline-block my-4"
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
            <div>
              <Link
                href={`/dashboard/usuarios/${usuario.id}`}
                className="text-blue-600 mr-2"
              >
                Editar
              </Link>
              {/* Aquí podrías incluir un botón para eliminar si lo deseas */}
            </div>
          </li>
        ))}
      </ul>
    </div>
    );
}

export default UsersPage
