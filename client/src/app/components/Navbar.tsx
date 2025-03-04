'use client'
import Link from 'next/link';

export default function Navbar() {

  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-4">
      <Link href="/">Inicio</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/register">Registro</Link>
      <Link href="/prediction ">Predictions</Link>
    </nav>
  );
}
