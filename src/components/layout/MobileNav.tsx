'use client';

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Phone, MapPin, Calendar } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useGlobalSettings } from '@/context/GlobalSettingsContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const globalSettings = useGlobalSettings();

  const navItems = globalSettings.navigation;
  const hasNetwork = navItems.some((item) => item.href === ROUTES.NETWORK);
  const displayNavItems = hasNetwork
    ? navItems
    : [
        ...navItems.slice(0, 3),
        { id: 'network', label: 'Notre Réseau', href: ROUTES.NETWORK },
        ...navItems.slice(3),
      ];
  const phoneNumber = globalSettings.phone.main || '0801 00 0801';
  const formattedPhone = phoneNumber.replace(/(\d{4})(\d{2})(\d{4})/, '$1 $2 $3');
  const ctaText = globalSettings.header.ctaText || 'Prendre rendez-vous';

  // Close menu on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <nav
        className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-lg font-bold text-gray-900 uppercase tracking-wide">
              Menu
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Fermer le menu"
            >
              <X size={24} className="text-gray-700" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-1 px-4">
              {displayNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-yellow-50 text-gray-900 border-l-4 border-yellow-400'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Quick Actions */}
            <div className="mt-8 px-4">
              <div className="border-t border-gray-100 pt-6">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">
                  Accès rapide
                </p>
                <div className="space-y-2">
                  <Link
                    href={ROUTES.CENTERS}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <MapPin size={20} className="text-yellow-500" />
                    <span className="font-medium">Trouver un centre</span>
                  </Link>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Phone size={20} className="text-yellow-500" />
                    <span className="font-medium">{formattedPhone}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="p-4 border-t border-gray-100">
            <Link
              href={ROUTES.BOOKING}
              className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-2xl transition-colors"
            >
              <Calendar size={20} />
              <span>{ctaText}</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
