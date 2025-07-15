// 'use client'
// import { useState } from 'react';
// import Link from 'next/link';
// import '../styles/Navbar.css';

// const Navbar: React.FC = () => {
//   const [menuOpen, setMenuOpen] = useState<boolean>(false);

//   const toggleMenu = () => {
//     setMenuOpen(prev => !prev);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link href="/" className="navbar-brand">
//           MiWeb
//         </Link>
//         <button className="navbar-toggle" onClick={toggleMenu}>
//           <span className="bar"></span>
//           <span className="bar"></span>
//           <span className="bar"></span>
//         </button>
//         <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
//           <Link href="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
//           <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
//           <Link href="/auth/login" onClick={() => setMenuOpen(false)}>Login</Link>
//           <Link href="/auth/register" onClick={() => setMenuOpen(false)}>Registro</Link>
//           <Link href="/prediction" onClick={() => setMenuOpen(false)}>Predictions</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Inicio',      href: '/' },
  { label: 'Dashboard',   href: '/dashboard' },
  { label: 'Login',       href: '/auth/login' },
  { label: 'Registro',    href: '/auth/register' },
  { label: 'Predictions', href: '/prediction' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // close drawer when route changes
  useEffect(() => setOpen(false), [pathname])

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            MiWeb
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`font-medium hover:text-primary transition 
                  ${pathname === href ? 'underline underline-offset-4' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Hamburger – mobile */}
          <button
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <svg
              className="h-6 w-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed top-16 inset-x-0 bg-white/95 backdrop-blur-sm
          transition-transform duration-300 ${open ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <ul className="flex flex-col py-4 px-6 space-y-2">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className={`block py-2 text-lg font-medium ${
                  pathname === href ? 'font-semibold text-primary' : 'text-gray-800'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
