/**
 * Shared Framer Motion presets for marketing pages (scroll reveals, stagger).
 */

export const marketingEase = [0.25, 0.46, 0.45, 0.94];

export const marketingTransition = {
  duration: 0.58,
  ease: marketingEase,
};

export const marketingViewport = {
  once: true,
  margin: '0px 0px 120px 0px',
  // Long text pages (privacy/terms) need a lower threshold so `whileInView` reliably triggers.
  amount: 0.05,
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: marketingTransition,
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: marketingTransition,
  },
};
