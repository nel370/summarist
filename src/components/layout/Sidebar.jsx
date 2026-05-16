import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { useAuthModal } from '@/lib/AuthModal';
import { base44 } from '@/api/base44Client';
import {
  Home, Pen, Search, Settings, HelpCircle, LogIn, LogOut, Menu, X, BookMarked
} from 'lucide-react';

const navItems = [
  { label: 'For you', path: '/for-you', icon: Home },
  { label: 'My Library', path: '/library', icon: BookMarked },
  { label: 'Highlights', path: null, icon: Pen },
  { label: 'Search', path: null, icon: Search },
];

const bottomItems = [
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Help & Support', path: null, icon: HelpCircle },
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    base44.auth.logout('/');
  };

  const NavLink = ({ item }) => {
    const isActive = item.path && location.pathname === item.path;
    const isDisabled = !item.path;

    if (isDisabled) {
      return (
        <div className={`flex items-center gap-3 px-6 py-3 text-[#032b41] cursor-not-allowed opacity-50`}>
          <item.icon className="w-5 h-5" />
          <span className="text-sm font-light">{item.label}</span>
        </div>
      );
    }

    return (
      <Link
        to={item.path}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 px-6 py-3 text-[#032b41] hover:bg-[#f1f6f4] transition-colors relative
          ${isActive ? 'bg-[#f1f6f4]' : ''}`}
      >
        {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#2bd97c]" />}
        <item.icon className="w-5 h-5" />
        <span className="text-sm font-light">{item.label}</span>
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white">
      {/* Logo */}
      <div className="p-6">
        <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 30 L20 24 L34 30 L20 36 Z" fill="#032b41"/>
            <path d="M6 22 L20 16 L34 22 L20 28 Z" fill="#032b41"/>
            <path d="M6 14 L20 8 L34 14 L20 20 Z" fill="#2bd97c"/>
          </svg>
          <span className="text-xl font-semibold text-[#032b41]">Summarist</span>
        </Link>
      </div>

      {/* Nav items */}
      <nav className="flex-1">
        {navItems.map((item) => (
          <NavLink key={item.label} item={item} />
        ))}
      </nav>

      {/* Bottom items */}
      <div className="border-t border-gray-100">
        {bottomItems.map((item) => (
          <NavLink key={item.label} item={item} />
        ))}
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 text-[#032b41] hover:bg-[#f1f6f4] transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-light">Logout</span>
          </button>
        ) : (
          <button
            onClick={() => { openAuthModal(); setMobileOpen(false); }}
            className="flex items-center gap-3 px-6 py-3 text-[#032b41] hover:bg-[#f1f6f4] transition-colors w-full"
          >
            <LogIn className="w-5 h-5" />
            <span className="text-sm font-light">Login</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-md"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-[200px] border-r border-gray-100 z-40 bg-white
        transition-transform duration-200
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {sidebarContent}
      </aside>
    </>
  );
}