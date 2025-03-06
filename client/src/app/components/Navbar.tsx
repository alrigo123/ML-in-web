'use client'
import { useState } from 'react';
import Link from 'next/link';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-brand">
          MiWeb
        </Link>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <Link href="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
          <Link href="/auth/login" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link href="/auth/register" onClick={() => setMenuOpen(false)}>Registro</Link>
          <Link href="/prediction" onClick={() => setMenuOpen(false)}>Predictions</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
