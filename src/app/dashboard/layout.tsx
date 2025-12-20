'use client';

import {
  FileText,
  MessageCircle,
  Settings,
  LogOut,
  Upload,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase-client'
// Reusable navigation link
const NavLink = ({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}) => (
  <Link
    href={href}
    className="group flex items-center p-4 text-sm font-medium rounded-xl text-gray-300 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:text-white transition-all duration-300 hover:scale-105"
  >
    <Icon className="w-6 h-6 mr-4 flex-shrink-0 group-hover:text-blue-400 transition-colors" />
    <span className="truncate">{label}</span>
  </Link>
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) router.push('/login');
  };

  const SidebarContent = (
    <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col p-6 border-r border-slate-700/50 shadow-2xl">
      {/* Logo */}
      <div className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-8 tracking-wide border-b border-slate-700 pb-4">
        Research Nexus
      </div>

      {/* Main Nav */}
      <nav className="flex-grow space-y-2">
        <NavLink
          icon={MessageCircle}
          href="/dashboard"
          label="Chat Assistant"
        />
        <NavLink
          icon={FileText}
          href="/dashboard/documents"
          label="My Documents"
        />
        <NavLink
          icon={Upload}
          href="/dashboard/upload"
          label="Upload Papers"
        />
      </nav>

      {/* Bottom Nav */}
      <div className="mt-auto pt-4 border-t border-gray-700 space-y-2">
        <NavLink
          icon={Settings}
          href="/dashboard/settings"
          label="Settings"
        />
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-4 text-sm font-medium rounded-xl text-red-400 hover:bg-red-600/20 hover:text-red-300 transition-all duration-300"
        >
          <LogOut className="w-6 h-6 mr-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">{SidebarContent}</div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {SidebarContent}
        <button
          className="absolute top-4 right-4 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile Top Bar */}
        <header className="md:hidden sticky top-0 z-30 bg-gradient-to-r from-slate-900 to-slate-800 p-4 border-b border-slate-700/50 shadow-lg backdrop-blur-sm">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-300 hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Page Content */}
        <div className="p-6 sm:p-8 flex-1 bg-gradient-to-br from-slate-950 to-slate-900 min-h-screen">{children}</div>
      </main>
    </div>
  );
}