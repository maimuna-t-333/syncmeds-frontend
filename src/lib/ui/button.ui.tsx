'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 font-medium text-body-m whitespace-nowrap cursor-pointer select-none transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                solid: 'bg-primary text-primary-foreground shadow-xs hover:opacity-90 active:scale-[0.98]',
                outline:
                    'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
                ghost: 'text-primary bg-transparent hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
            },
            size: {
                sm: 'h-8 px-3 text-body-s rounded-md',
                md: 'h-10 px-4 rounded-md',
                lg: 'h-12 px-5 rounded-md',
            },
            fullWidth: { true: 'w-full', false: 'self-start' },
        },
        defaultVariants: { variant: 'solid', size: 'lg', fullWidth: true },
    }
);

type ButtonProps = VariantProps<typeof buttonVariants> &
    ButtonHTMLAttributes<HTMLButtonElement> & {
        label: string;
        loading?: boolean;
        leftIcon?: ReactNode;
        rightIcon?: ReactNode;
    };

export const Button = ({
    label,
    variant,
    size,
    fullWidth,
    loading,
    leftIcon,
    rightIcon,
    disabled,
    className,
    ...rest
}: ButtonProps) => (
    <button
        {...rest}
        disabled={disabled || loading}
        className={clsx(buttonVariants({ variant, size, fullWidth }), className)}
    >
        {loading ? (
            <Loader2 className="size-4 animate-spin" />
        ) : (
            <>
                {leftIcon}
                <span>{label}</span>
                {rightIcon}
            </>
        )}
    </button>
);
