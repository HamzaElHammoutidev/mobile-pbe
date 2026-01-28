'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', size = 'lg', href, children, className, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center gap-2 font-bold uppercase transition-all';

        const variants = {
            primary: 'bg-[#FFD200] text-black hover:brightness-95',
            secondary: 'bg-[#111827] text-white hover:bg-[#1F2937]',
            outline: 'bg-white text-black border-2 border-black hover:bg-gray-50',
        };

        const sizes = {
            sm: 'h-10 px-4 text-xs rounded-xl',
            md: 'h-12 px-5 text-sm rounded-xl',
            lg: 'h-14 px-6 text-sm rounded-2xl',
        };

        const shadows = {
            primary: 'shadow-[0_4px_12px_rgba(255,210,0,0.25)]',
            secondary: 'shadow-lg',
            outline: '',
        };

        const combinedClassName = cn(
            baseStyles,
            variants[variant],
            sizes[size],
            shadows[variant],
            className
        );

        if (href) {
            return (
                <Link href={href} className={combinedClassName}>
                    {children}
                </Link>
            );
        }

        return (
            <button ref={ref} className={combinedClassName} {...props}>
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
