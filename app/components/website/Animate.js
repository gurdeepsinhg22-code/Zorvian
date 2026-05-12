'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { marketingTransition, marketingViewport } from '../../../lib/marketing/motion';

const variants = {
  left: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 },
  },
  up: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
  },
};

const transition = marketingTransition;

const viewport = marketingViewport;

export default function Animate({ variant = 'up', delay = 0, children, className = '', ...props }) {
  const variantConfig = variants[variant] || variants.up;
  const reduceMotion = useReducedMotion();
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    // Safety net: if scroll-reveal never triggers (viewport/intersection edge cases),
    // don't leave marketing sections permanently invisible.
    const id = window.setTimeout(() => setForceVisible(true), 350);
    return () => window.clearTimeout(id);
  }, [reduceMotion]);

  return (
    <motion.div
      initial={reduceMotion ? 'visible' : 'hidden'}
      animate={reduceMotion || forceVisible ? 'visible' : undefined}
      whileInView="visible"
      viewport={viewport}
      variants={variantConfig}
      transition={{ ...transition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
