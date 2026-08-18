import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';

const badgeVariants = cva('inline-flex items-center font-medium rounded-pill select-none', {
    variants: {
        variant: {
            default: 'bg-accent text-accent-foreground',
            success: 'bg-[#E8F9E8] text-[#17A31A]',
            warning: 'bg-[#FFF8E1] text-[#E65100]',
            destructive: 'bg-[color:var(--color-error-20)] text-destructive',
            outline: 'border border-border text-foreground',
            secondary: 'bg-secondary text-secondary-foreground',
        },
        size: {
            sm: 'text-label-s px-1.5 py-px',
            md: 'text-body-xs px-2 py-0.5',
        },
    },
    defaultVariants: { variant: 'default', size: 'md' },
});

type BadgeProps = VariantProps<typeof badgeVariants> &
    HTMLAttributes<HTMLSpanElement> & {
        label: string;
    };

export const Badge = ({ label, variant, size, className, ...rest }: BadgeProps) => (
    <span {...rest} className={clsx(badgeVariants({ variant, size }), className)}>
        {label}
    </span>
);
