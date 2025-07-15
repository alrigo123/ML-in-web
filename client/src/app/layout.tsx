"use client";

import 'bootstrap-icons/font/bootstrap-icons.css';
import "./globals.css";

// IMPORT CONSISTENT COMPONENTS
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="body flex flex-col min-h-screen" suppressHydrationWarning>
        <Navbar />
        <main className="main flex-1 container mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
