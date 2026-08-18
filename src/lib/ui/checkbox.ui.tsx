'use client';

import { clsx } from 'clsx';
import { Check } from 'lucide-react';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';

type CheckboxProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    disabled?: boolean;
    className?: string;
};

export const Checkbox = <T extends FieldValues>({
    control,
    name,
    label,
    disabled,
    className,
}: CheckboxProps<T>) => (
    <Controller
        control={control}
        name={name}
        render={({ field }) => (
            <label
                className={clsx(
                    'flex cursor-pointer items-center gap-2.5',
                    disabled && 'cursor-not-allowed opacity-50',
                    className
                )}
            >
                <input
                    type="checkbox"
                    checked={!!field.value}
                    onChange={() => !disabled && field.onChange(!field.value)}
                    disabled={disabled}
                    className="sr-only peer"
                />
                <div
                    className={clsx(
                        'flex size-[18px] shrink-0 items-center justify-center rounded border transition-all duration-150',
                        'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
                        field.value ? 'border-primary bg-primary' : 'border-input bg-background',
                        disabled && 'pointer-events-none'
                    )}
                >
                    {field.value && (
                        <Check className="size-3 text-primary-foreground" strokeWidth={3} />
                    )}
                </div>
                <span className="text-body-m text-foreground">{label}</span>
            </label>
        )}
    />
);
