import React from 'react'

const Login = () => {
    return (
        <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
            <input className="w-full p-2 border mb-2" placeholder="Correo" />
            <input className="w-full p-2 border mb-2" type="password" placeholder="Contraseña" />
            <button className="w-full bg-blue-600 text-white p-2 rounded">Ingresar</button>
        </div>
    )
}

export default Login
