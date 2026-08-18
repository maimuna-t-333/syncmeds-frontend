'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type MotionDivProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
    x?: number;
    inView?: boolean;
};

const EASE = [0.25, 0.4, 0.25, 1] as const;

export const MotionDiv = ({
    children,
    className,
    delay = 0,
    y = 24,
    x = 0,
    inView = true,
}: MotionDivProps) => {
    const initial = { opacity: 0, y, x };
    const target = { opacity: 1, y: 0, x: 0 };
    const transition = { duration: 0.5, ease: EASE, delay };

    if (inView) {
        return (
            <motion.div
                className={className}
                initial={initial}
                whileInView={target}
                viewport={{ once: true, margin: '-60px' }}
                transition={transition}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            className={className}
            initial={initial}
            animate={target}
            transition={transition}
        >
            {children}
        </motion.div>
    );
};
