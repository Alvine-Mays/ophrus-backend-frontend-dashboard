import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Building, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings,
  LogOut,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Vue d\'ensemble',
      icon: Home,
      href: '/admin',
      active: location.pathname === '/admin'
    },
    {
      title: 'Propriétés',
      icon: Building,
      href: '/admin/properties',
      active: location.pathname.startsWith('/admin/properties')
    },
    {
      title: 'Utilisateurs',
      icon: Users,
      href: '/admin/users',
      active: location.pathname.startsWith('/admin/users')
    },
    {
      title: 'Messages',
      icon: MessageSquare,
      href: '/admin/messages',
      active: location.pathname.startsWith('/admin/messages')
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      href: '/admin/analytics',
      active: location.pathname.startsWith('/admin/analytics')
    },
    {
      title: 'Paramètres',
      icon: Settings,
      href: '/admin/settings',
      active: location.pathname.startsWith('/admin/settings')
    }
  ];

  return (
    <div className={cn(
      "bg-card border-r border-border h-screen flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-lg text-foreground">Ophrus Admin</h2>
              <p className="text-xs text-muted-foreground">Tableau de bord</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                  item.active 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium">{item.title}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <button className={cn(
          "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors w-full",
          "text-muted-foreground hover:text-foreground hover:bg-accent"
        )}>
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="font-medium">Déconnexion</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

