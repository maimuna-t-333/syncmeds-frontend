'use client';

import { clsx } from 'clsx';
import { useRef } from 'react';
import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';

const OTP_LENGTH = 6;

type OtpInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    length?: number;
    disabled?: boolean;
    className?: string;
};

export const OtpInput = <T extends FieldValues>({
    control,
    name,
    length = OTP_LENGTH,
    disabled,
    className,
}: OtpInputProps<T>) => {
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                const value = (field.value as string) ?? '';
                const positions = Array.from({ length }, (_, i) => i);
                const digits = positions.map((i) => value[i] ?? '');

                const handleChange = (index: number, char: string) => {
                    const next = [...digits];
                    next[index] = char.slice(-1);
                    field.onChange(next.join(''));
                    if (char && index < length - 1) inputsRef.current[index + 1]?.focus();
                };

                const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
                    if (e.key === 'Backspace' && !digits[index] && index > 0) {
                        inputsRef.current[index - 1]?.focus();
                    }
                };

                return (
                    <div className="flex flex-col gap-2">
                        <div className={clsx('flex gap-2.5', className)}>
                            {positions.map((pos) => (
                                <input
                                    key={pos}
                                    ref={(el) => {
                                        inputsRef.current[pos] = el;
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digits[pos]}
                                    disabled={disabled}
                                    onChange={(e) => handleChange(pos, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(pos, e)}
                                    className={clsx(
                                        'h-14 w-12 rounded-card border text-center text-xl font-semibold outline-none transition-all duration-150',
                                        'focus:border-primary focus:ring-2 focus:ring-ring/20',
                                        digits[pos]
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : 'border-input bg-background text-foreground',
                                        fieldState.error &&
                                            'border-destructive focus:ring-destructive/20',
                                        disabled &&
                                            'cursor-not-allowed bg-muted text-muted-foreground opacity-60'
                                    )}
                                />
                            ))}
                        </div>
                        {fieldState.error && (
                            <p className="text-body-xs text-destructive">
                                {fieldState.error.message}
                            </p>
                        )}
                    </div>
                );
            }}
        />
    );
};
