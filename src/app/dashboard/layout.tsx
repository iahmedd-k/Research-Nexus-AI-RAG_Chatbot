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
    className="flex items-center p-3 text-sm font-medium rounded-lg text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors duration-200"
  >
    <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
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
    <aside className="w-64 bg-gray-900 flex flex-col p-4 border-r border-indigo-900/30">
      {/* Logo */}
      <div className="text-2xl font-extrabold text-indigo-400 mb-8 tracking-wide border-b border-indigo-900/50 pb-4">
        ResearchNexus AI
      </div>

      {/* Main Nav */}
      <nav className="flex-grow space-y-2">
        <NavLink
          icon={MessageCircle}
          href="/dashboard"
          label="Ask My Papers"
        />
        <NavLink
          icon={FileText}
          href="/dashboard/documents"
          label="My Documents"
        />
        <NavLink
          icon={Upload}
          href="/dashboard/upload"
          label="Upload New Paper"
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
          className="w-full flex items-center p-3 text-sm font-medium rounded-lg text-red-400 hover:bg-gray-700 transition-colors duration-200"
        >
          <LogOut className="w-5 h-5 mr-3" />
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
          className="absolute top-4 right-4 p-2 bg-indigo-600 rounded-full"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile Top Bar */}
        <header className="md:hidden sticky top-0 z-30 bg-gray-900 p-4 border-b border-indigo-900/50">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-gray-300 hover:text-indigo-400"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-8 flex-1">{children}</div>
      </main>
    </div>
  );
}