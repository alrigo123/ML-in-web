'use client'
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-2">
      <div className="container">
        <div className="row">
          {/* Sección de información de la marca */}
          <div className="col-md-4 mb-3">
            <h5>Mi Sitio Web</h5>
            <p>&copy; 2025 Mi Sitio Web. Todos los derechos reservados.</p>
          </div>
          {/* Sección de enlaces de navegación */}
          <div className="col-md-4 mb-3">
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/" className="text-white text-decoration-none">Inicio</Link>
              </li>
              <li>
                <Link href="/" className="text-white text-decoration-none">Acerca de</Link>
              </li>
              <li>
                <Link href="/" className="text-white text-decoration-none">Contacto</Link>
              </li>
            </ul>
          </div>
          {/* Sección de redes sociales */}
          <div className="col-md-4 mb-3">
            <h5>Redes Sociales</h5>
            <ul className="list-unstyled d-flex gap-3 justify-content-md-end justify-content-center">
              <li>
                <a href="#" className="text-white">
                  <i className="bi bi-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  <i className="bi bi-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white">
                  <i className="bi bi-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <small>Diseñado por Mi Sitio Web</small>
        </div>
      </div>
    </footer>
  );
}
