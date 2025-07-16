'use client'
import { useState } from 'react';
import { Menu, X, Cloud, Zap, BarChart3, LogIn, UserPlus, Home } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const navItems = [
    { href: '/', label: 'Inicio', icon: <Home className="w-4 h-4" /> },
    { href: '/dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { href: '/auth/login', label: 'Login', icon: <LogIn className="w-4 h-4" /> },
    { href: '/auth/register', label: 'Registro', icon: <UserPlus className="w-4 h-4" /> },
    { href: '/prediction', label: 'Predictions', icon: <Zap className="w-4 h-4" /> }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Weather AI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${menuOpen
            ? 'max-h-96 opacity-100 mt-4'
            : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group w-full"
              >
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Animated border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    </nav>
  );
};

export default Navbar;


// 'use client'
// import { useState } from 'react'
// import { Menu, X, Cloud, Zap, BarChart3, LogIn, UserPlus, Home, LogOut } from 'lucide-react'
// import Link from 'next/link'
// import { useSession, signOut } from 'next-auth/react'

// const allNavItems = {
//   public: [
//     { href: '/', label: 'Inicio', icon: <Home className="w-4 h-4" /> },
//     { href: '/prediction', label: 'Predictions', icon: <Zap className="w-4 h-4" /> },
//     { href: '/auth/login', label: 'Login', icon: <LogIn className="w-4 h-4" /> },
//     { href: '/auth/register', label: 'Registro', icon: <UserPlus className="w-4 h-4" /> },
//   ],
//   protected: [
//     { href: '/', label: 'Inicio', icon: <Home className="w-4 h-4" /> },
//     { href: '/dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
//     { href: '/prediction', label: 'Predictions', icon: <Zap className="w-4 h-4" /> },
//     // we'll render logout separately
//   ]
// }

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const { data: session, status } = useSession()
//   const isLoggedIn = status === 'authenticated'

//   // choose items based on auth state
//   const navItems = isLoggedIn
//     ? allNavItems.protected
//     : allNavItems.public

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
//       <div className="container mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo/Brand */}
//           <Link href="/" className="flex items-center space-x-2 group">
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//               <Cloud className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//               Weather AI
//             </span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
//               >
//                 <span className="group-hover:scale-110 transition-transform duration-300">
//                   {item.icon}
//                 </span>
//                 <span className="font-medium">{item.label}</span>
//               </Link>
//             ))}

//             {/* If logged in, show Logout */}
//             {isLoggedIn && (
//               <button
//                 onClick={() => signOut()}
//                 className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-red-600/20 transition-all duration-300 group"
//               >
//                 <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
//                 <span className="font-medium">Logout</span>
//               </button>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMenuOpen(v => !v)}
//             className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-300"
//             aria-label="Toggle menu"
//           >
//             {menuOpen ? (
//               <X className="w-6 h-6 text-white" />
//             ) : (
//               <Menu className="w-6 h-6 text-white" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`
//             md:hidden 
//             transition-all duration-300 
//             ${menuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'}
//           `}
//         >
//           <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 space-y-2">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 onClick={() => setMenuOpen(false)}
//                 className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 group w-full"
//               >
//                 <span className="group-hover:scale-110 transition-transform duration-300">
//                   {item.icon}
//                 </span>
//                 <span className="font-medium">{item.label}</span>
//               </Link>
//             ))}

//             {isLoggedIn && session.user && (
//               <div className="ml-4 flex items-center space-x-2">
//                 <span className="text-gray-200">Hola, {session.user.name}</span>
//                 <button onClick={() => signOut()} className="text-sm text-red-400">
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Animated border bottom */}
//       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
//     </nav>
//   )
// }
