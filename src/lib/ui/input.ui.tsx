'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { Eye, EyeOff } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';

const inputVariants = cva(
    'w-full rounded-md border bg-background py-3.5 text-body-m text-foreground outline-none transition-all duration-150 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20',
    {
        variants: {
            state: {
                default: 'border-input',
                error: 'border-destructive focus:border-destructive focus:ring-destructive/20',
                disabled:
                    'border-input bg-muted text-muted-foreground cursor-not-allowed opacity-60',
            },
            hasLeftIcon: {
                true: 'pl-10 pr-4',
                false: 'px-4',
            },
        },
        defaultVariants: { state: 'default', hasLeftIcon: false },
    }
);

type InputProps<T extends FieldValues> = VariantProps<typeof inputVariants> & {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    className?: string;
    leftIcon?: ReactNode;
};

export const Input = <T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type = 'text',
    disabled,
    className,
    leftIcon,
}: InputProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor={field.name}
                        className="text-body-xs font-normal text-foreground"
                    >
                        {label}
                    </label>
                    <div className="relative">
                        {leftIcon && (
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                                {leftIcon}
                            </span>
                        )}
                        <input
                            {...field}
                            id={field.name}
                            type={isPassword && showPassword ? 'text' : type}
                            placeholder={placeholder}
                            disabled={disabled}
                            className={clsx(
                                inputVariants({
                                    state: disabled
                                        ? 'disabled'
                                        : fieldState.error
                                          ? 'error'
                                          : 'default',
                                    hasLeftIcon: !!leftIcon,
                                }),
                                isPassword && 'pr-12',
                                className
                            )}
                        />
                        {isPassword && (
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff className="size-4" />
                                ) : (
                                    <Eye className="size-4" />
                                )}
                            </button>
                        )}
                    </div>
                    {fieldState.error && (
                        <p className="text-body-xs text-destructive">{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    );
};
