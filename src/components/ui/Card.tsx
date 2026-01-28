import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'highlight';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ variant = 'default', padding = 'md', children, className, ...props }, ref) => {
        const baseStyles = 'rounded-2xl';

        const variants = {
            default: 'bg-[#F9FAFB] border border-[#E5E7EB]',
            elevated: 'bg-white border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.05)]',
            highlight: 'bg-gradient-to-br from-[#FFFCF0] to-white border-2 border-[#FFD200] shadow-[0_4px_12px_rgba(255,210,0,0.15)]',
        };

        const paddings = {
            none: '',
            sm: 'p-4',
            md: 'p-5',
            lg: 'p-6',
        };

        return (
            <div
                ref={ref}
                className={cn(baseStyles, variants[variant], paddings[padding], className)}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

export default Card;
