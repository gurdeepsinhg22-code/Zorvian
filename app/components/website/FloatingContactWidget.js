'use client';

import { useState, useEffect } from 'react';
import { FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const HIDDEN_PATHS = ['/dashboard', '/admin'];
const SCROLL_THRESHOLD = 300;

const iconVariants = {
  hidden: { opacity: 0, x: 24, scale: 0.5 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.1 + i * 0.08,
    },
  }),
};

export default function FloatingContactWidget() {
  const pathname = usePathname() || '/';
  const [showScrollTop, setShowScrollTop] = useState(false);
  const isHidden = HIDDEN_PATHS.some((p) => pathname.startsWith(p));

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isHidden) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-2 sm:bottom-8 sm:right-8"
      aria-label="Quick contact"
    >
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            custom={0}
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.5, x: 12 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/80 bg-white/95 text-slate-600 shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur hover:border-slate-300 hover:bg-[#0a0a0a] hover:text-white hover:shadow-[0_8px_24px_rgba(14,39,64,0.2)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] focus:ring-offset-2 sm:h-14 sm:w-14 sm:rounded-2xl"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <motion.span
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaArrowUp className="text-lg sm:text-xl" />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href="mailto:amiedhiman@gmail.com"
        custom={1}
        variants={iconVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.08, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/80 bg-white/95 text-[var(--brand-primary)] shadow-[0_4px_16px_rgba(0,0,0,0.08)] backdrop-blur hover:border-cyan-200 hover:bg-[var(--brand-primary)] hover:text-white hover:shadow-[0_8px_24px_rgba(0,136,240,0.25)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2 sm:h-14 sm:w-14 sm:rounded-2xl"
        title="Email us"
        aria-label="Email us"
      >
        <motion.span
          whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
        >
          <FaEnvelope className="text-lg sm:text-xl" />
        </motion.span>
      </motion.a>
    </motion.div>
  );
}
