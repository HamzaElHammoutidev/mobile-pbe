'use client';

import Link from 'next/link';
import { Globe, Instagram, Linkedin, Facebook } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useGlobalSettings } from '@/context/GlobalSettingsContext';

interface FooterProps {
    variant?: 'default' | 'minimal' | 'tabs';
}

export default function Footer({ variant = 'default' }: FooterProps) {
    const globalSettings = useGlobalSettings();

    if (variant === 'tabs') return null;

    const logoUrl = globalSettings.logoAltUrl || 'https://parebriseexpress.ma/images/logo-bl-mr.png';
    const footerTagline = globalSettings.footer.tagline;
    const footerCopyright = globalSettings.footer.copyright;
    const footerNav = globalSettings.footerNavigation;
    const socialLinks = globalSettings.socialLinks;

    return (
        <footer className="bg-[#1A1F2E] text-gray-400 rounded-t-[2.5rem] mt-8">
            <div className="max-w-md mx-auto px-8 py-12">
                {/* Brand Section */}
                <div className="mb-8">
                    <Link href={ROUTES.HOME} className="flex items-center gap-3 mb-4">
                        <img
                            src={logoUrl}
                            alt={globalSettings.siteName}
                            className="h-10 w-auto"
                        />
                    </Link>
                    <p className="text-[15px] leading-relaxed text-gray-400">
                        {footerTagline}
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700/50 my-8" />

                {/* Links Grid */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    {footerNav.map((section, idx) => (
                        <div key={section.title || idx}>
                            <h4 className="text-yellow-400 font-bold text-sm uppercase tracking-wider mb-5">
                                {section.title}
                            </h4>
                            <ul className="space-y-4 text-[15px]">
                                {section.links.map((item) => (
                                    <li key={item.href}>
                                        <Link href={item.href} className="hover:text-white transition-colors">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700/50 my-8" />

                {/* Bottom Section */}
                <div className="text-center">
                    <p className="text-xs text-gray-500 mb-6">
                        {footerCopyright}
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center justify-center gap-6">
                        {socialLinks.facebook && (
                            <a
                                href={socialLinks.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook size={22} strokeWidth={1.5} />
                            </a>
                        )}
                        {socialLinks.instagram && (
                            <a
                                href={socialLinks.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram size={22} strokeWidth={1.5} />
                            </a>
                        )}
                        {socialLinks.linkedin && (
                            <a
                                href={socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-500 hover:text-white transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={22} strokeWidth={1.5} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
