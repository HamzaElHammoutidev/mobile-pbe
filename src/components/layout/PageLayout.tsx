import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
    children: React.ReactNode;
    headerVariant?: 'default' | 'transparent' | 'app';
    footerVariant?: 'default' | 'minimal' | 'tabs';
    className?: string;
}

export default function PageLayout({
    children,
    headerVariant = 'default',
    footerVariant = 'default',
    className,
    backgroundColor
}: PageLayoutProps & { backgroundColor?: string }) {
    return (
        <div className={`flex min-h-screen flex-col font-sans text-stone-900 ${backgroundColor || ''}`}>
            <Header variant={headerVariant} />
            <main className={`flex-1 ${className}`}>
                {children}
            </main>
            <Footer variant={footerVariant} />
        </div>
    );
}
