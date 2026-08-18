'use client';

import { clsx } from 'clsx';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';

type ToggleProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    disabled?: boolean;
    className?: string;
};

export const Toggle = <T extends FieldValues>({
    control,
    name,
    label,
    disabled,
    className,
}: ToggleProps<T>) => (
    <Controller
        control={control}
        name={name}
        render={({ field }) => (
            <label
                className={clsx(
                    'flex cursor-pointer items-center gap-3',
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
                        'relative h-[22px] w-10 shrink-0 rounded-pill transition-colors duration-200',
                        'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background',
                        field.value ? 'bg-primary' : 'bg-muted-foreground/40',
                        disabled && 'pointer-events-none'
                    )}
                >
                    <div
                        className={clsx(
                            'absolute top-0.5 size-[18px] rounded-pill bg-white shadow-sm transition-transform duration-200',
                            field.value ? 'translate-x-[22px]' : 'translate-x-0.5'
                        )}
                    />
                </div>
                {label && <span className="text-body-m text-foreground">{label}</span>}
            </label>
        )}
    />
);
