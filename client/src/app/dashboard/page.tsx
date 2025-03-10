import React from 'react'
import Link from 'next/link'

const Dashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Link href="/dashboard/users" className="text-blue-600">Gestionar Usuarios</Link>
            <Link href="/dashboard/models" className="text-blue-600">Gestionar Modelos</Link>
        </div>
    )
}

export default Dashboard
