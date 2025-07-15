// components/Footer.tsx
'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h5 className="text-lg font-semibold text-white">Mi Sitio Web</h5>
          <p className="mt-2 text-sm">&copy; 2025 Mi Sitio Web. Todos los derechos reservados.</p>
        </div>

        {/* Links */}
        <div>
          <h5 className="text-lg font-semibold text-white">Enlaces</h5>
          <ul className="mt-2 space-y-1">
            {[
              { name: 'Inicio', href: '/' },
              { name: 'Acerca de', href: '/about' },
              { name: 'Contacto', href: '/contact' },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-sm hover:text-white transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div className="flex flex-col md:items-end">
          <h5 className="text-lg font-semibold text-white">Redes Sociales</h5>
          <div className="mt-2 flex space-x-4">
            <a href="#" className="hover:text-white">
              <i className="bi bi-facebook text-2xl"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="bi bi-twitter text-2xl"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="bi bi-instagram text-2xl"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        Diseñado por Mi Sitio Web
      </div>
    </footer>
  )
}
