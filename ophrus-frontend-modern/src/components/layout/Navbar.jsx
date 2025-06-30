import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Search, Heart, User, LogOut, Plus, Settings, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useMessage } from '../../contexts/MessageContext';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { cn } from '../../lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { unreadCount } = useMessage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/home');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const publicLinks = [
    { path: '/home', label: 'Accueil', icon: Home },
    { path: '/properties', label: 'Propriétés', icon: Search },
    { path: '/about', label: 'À propos', icon: null },
    { path: '/contact', label: 'Contact', icon: null },
  ];

  const authenticatedLinks = [
    { path: '/dashboard', label: 'Tableau de bord', icon: Settings },
    { path: '/messages', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { path: '/favorites', label: 'Favoris', icon: Heart },
    { path: '/add-property', label: 'Ajouter', icon: Plus },
    { path: '/profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-primary to-blue-dark rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Ophrus</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-gray-700 hover:text-blue-primary transition-colors font-medium',
                  isActive(link.path) && 'text-blue-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {authenticatedLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'flex items-center space-x-1 text-gray-700 hover:text-blue-primary transition-colors relative',
                      isActive(link.path) && 'text-blue-primary'
                    )}
                  >
                    {link.icon && <link.icon className="w-4 h-4" />}
                    <span>{link.label}</span>
                    {link.badge > 0 && (
                      <Badge variant="primary" size="sm" className="ml-1">
                        {link.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Bonjour, {user?.nom}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-primary transition-colors font-medium"
                >
                  Connexion
                </Link>
                <Link to="/register">
                  <Button size="sm">Inscription</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-primary transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              {/* Public Links */}
              {publicLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'block text-gray-700 hover:text-blue-primary transition-colors font-medium',
                    isActive(link.path) && 'text-blue-primary'
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* Auth Section */}
              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="text-sm text-gray-600 mb-4">
                      Bonjour, {user?.nom}
                    </div>
                    {authenticatedLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={cn(
                          'flex items-center justify-between text-gray-700 hover:text-blue-primary transition-colors py-2',
                          isActive(link.path) && 'text-blue-primary'
                        )}
                      >
                        <div className="flex items-center space-x-2">
                          {link.icon && <link.icon className="w-4 h-4" />}
                          <span>{link.label}</span>
                        </div>
                        {link.badge > 0 && (
                          <Badge variant="primary" size="sm">
                            {link.badge}
                          </Badge>
                        )}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-primary transition-colors py-2 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-4 space-y-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 hover:text-blue-primary transition-colors font-medium"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button size="sm" className="w-full">
                      Inscription
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

