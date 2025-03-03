'use client'
import Link from 'next/link';
import { useState } from 'react';
import styles from '../../styles/navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/">
          <a className={styles.logo}>Mi Sitio</a>
        </Link>
        <button className={styles.hamburger} onClick={toggleMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <Link href="/">
            <a className={styles.navLink}>Inicio</a>
          </Link>
          <Link href="/about">
            <a className={styles.navLink}>Acerca</a>
          </Link>
          <Link href="/contact">
            <a className={styles.navLink}>Contacto</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
