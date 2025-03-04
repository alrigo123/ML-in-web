import React from 'react'

const UserDetail = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold">Editar Usuario {params.id}</h2>
            <input className="w-full p-2 border mb-2" placeholder="Nombre" />
            <button className="bg-blue-600 text-white p-2 rounded">Guardar</button>
        </div>
    )
}

export default UserDetail
