import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';

const COLORS = [
    'bg-[#4045EF] text-white',
    'bg-[#7C3AED] text-white',
    'bg-[#0EA5E9] text-white',
    'bg-[#10B981] text-white',
    'bg-[#F59E0B] text-white',
    'bg-[#EF4444] text-white',
    'bg-[#EC4899] text-white',
    'bg-[#14B8A6] text-white',
] as const;

const SIZE_MAP = {
    xs: 'size-6 text-label-s',
    sm: 'size-8 text-body-xs',
    md: 'size-9 text-body-s',
    lg: 'size-11 text-body-m',
    xl: 'size-14 text-body-l',
} as const;

const getInitials = (name: string) =>
    name
        .split(' ')
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('');

const getColor = (name: string): string =>
    COLORS[name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % COLORS.length] as string;

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
    name: string;
    src?: string | null;
    size?: keyof typeof SIZE_MAP;
};

export const Avatar = ({ name, src, size = 'md', className, ...rest }: AvatarProps) => {
    const base = clsx(
        'inline-flex items-center justify-center rounded-full font-semibold shrink-0 overflow-hidden',
        SIZE_MAP[size]
    );

    if (src) {
        return (
            <div {...rest} className={clsx(base, className)}>
                <img src={src} alt={name} className="size-full object-cover" />
            </div>
        );
    }

    return (
        <div {...rest} className={clsx(base, getColor(name), className)}>
            {getInitials(name)}
        </div>
    );
};
