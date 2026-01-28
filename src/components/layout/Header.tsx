'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu } from 'lucide-react';
import MobileNav from './MobileNav';
import { ROUTES } from '@/config/routes';
import { useGlobalSettings } from '@/context/GlobalSettingsContext';

interface HeaderProps {
    variant?: 'default' | 'transparent' | 'app';
}

export default function Header({ variant = 'default' }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const globalSettings = useGlobalSettings();

    const isTransparent = variant === 'transparent';
    const isApp = variant === 'app';
    const phoneNumber = globalSettings.phone.main || '0801 00 0801';
    const logoUrl = globalSettings.logoUrl || '/logo.png';
    const siteName = globalSettings.siteName || 'Pare-Brise Express';

    return (
        <>
            <header
                className={`w-full z-30 ${isTransparent
                        ? 'absolute top-0 left-0 right-0'
                        : 'bg-white border-b border-gray-100 relative'
                    }`}
                style={isTransparent ? { backgroundColor: 'transparent' } : undefined}
            >
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {isApp ? (
                        <>
                            <Link href={ROUTES.HOME} className="flex items-center">
                                <Image
                                    src={logoUrl}
                                    alt={siteName}
                                    width={160}
                                    height={40}
                                    className={`h-8 w-auto ${isTransparent ? 'brightness-0 invert' : ''}`}
                                    priority
                                />
                            </Link>
                            <button
                                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                                aria-label="Ouvrir le menu"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <Menu size={22} className={isTransparent ? 'text-white' : 'text-gray-900'} strokeWidth={2} />
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Menu Button */}
                            <button
                                className={`p-2 rounded-lg transition-colors ${isTransparent ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                                    }`}
                                aria-label="Ouvrir le menu"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <Menu size={24} className={isTransparent ? 'text-white' : 'text-gray-900'} strokeWidth={2} />
                            </button>

                            {/* Logo - invert for transparent header on dark backgrounds */}
                            <Link href={ROUTES.HOME} className="flex items-center">
                                <Image
                                    src={logoUrl}
                                    alt={siteName}
                                    width={160}
                                    height={40}
                                    className={`h-8 w-auto ${isTransparent ? 'brightness-0 invert' : ''}`}
                                    priority
                                />
                            </Link>

                            {/* Phone Button */}
                            <a
                                href={`tel:${phoneNumber}`}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isTransparent
                                        ? 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                                        : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                aria-label="Appeler"
                            >
                                <Phone size={18} className={isTransparent ? 'text-white' : 'text-gray-700'} />
                            </a>
                        </>
                    )}
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            <MobileNav
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
            />
        </>
    );
}
