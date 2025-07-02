'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, User, Heart, MessageSquare, Settings } from 'lucide-react';

const navigation = [
  { name: 'Accueil', href: '/', current: false },
  { name: 'Propriétés', href: '/properties', current: false },
  { name: 'À propos', href: '/about', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

const userNavigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: Settings },
  { name: 'Mes favoris', href: '/favorites', icon: Heart },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Profil', href: '/profile', icon: User },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Simuler l'état de connexion - à remplacer par votre logique d'authentification
  const isAuthenticated = false;

  const isCurrentPage = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" role="navigation" aria-label="Navigation principale">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo.svg"
                alt="Logo Ophrus"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold text-blue-600">Ophrus</span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isCurrentPage(item.href)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                  aria-current={isCurrentPage(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions utilisateur */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    type="button"
                    className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Ouvrir le menu utilisateur</span>
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </button>

                  {userMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        {userNavigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <item.icon className="mr-3 h-4 w-4" />
                            {item.name}
                          </Link>
                        ))}
                        <button
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <X className="mr-3 h-4 w-4" />
                          Se déconnecter
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/register"
                    className="btn-primary"
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isCurrentPage(item.href)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {!isAuthenticated && (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3 space-x-3">
                  <Link
                    href="/login"
                    className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center btn-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Inscription
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

