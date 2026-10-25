import React, { Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trees } from 'lucide-react';
import SeedlingAnimation from '../SeedlingAnimation';

// Dynamically import 3D scene to keep initial bundle ultra-fast
const LivingForestScene = lazy(() => import('./LivingForestScene'));

/**
 * HeroSection — Premium 3D Hero Experience
 * Left: Editorial typography, eyebrow badge, concise environmental copy, and CTA.
 * Right: Interactive 3D miniature Living Forest rendered with Three.js / React Three Fiber.
 */
export default function HeroSection({ onOpenAddModal }) {

  // Motion animation variants for clean staggered text entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="hero" className="hero-box-3d" aria-label="Hero Overview">
      <div className="row align-items-center gy-5">
        {/* Left Column: Editorial Environmental Platform Messaging */}
        <div className="col-lg-6 col-xl-6 position-relative z-3">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow Label */}
            <motion.div variants={itemVariants}>
              <div className="eyebrow-chip-botanical">
                <Sparkles size={13} className="text-emerald me-1" />
                <span>Community &bull; Nature &bull; Impact</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 className="hero-headline-3d" variants={itemVariants}>
              Small Actions.<br />
              <span className="hero-headline-accent">A Greener Future.</span>
            </motion.h1>

            {/* Concise Description */}
            <motion.p className="hero-subhead-3d" variants={itemVariants}>
              GreenRoots empowers communities to organize, record, and nurture native tree plantation initiatives.
              Track recorded tree planting numbers and discover local afforestation drives in real time.
            </motion.p>

            {/* Primary Action CTA */}
            <motion.div className="d-flex flex-wrap align-items-center gap-3 pt-2" variants={itemVariants}>
              {/* Primary CTA: Start Planting */}
              <motion.button
                type="button"
                className="btn btn-hero-primary"
                onClick={onOpenAddModal}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Start Planting a new event"
              >
                <Trees size={18} strokeWidth={2.2} />
                <span>Start Planting</span>
              </motion.button>
            </motion.div>

            {/* Micro Trust Indicators with High Contrast */}
            <motion.div className="d-flex align-items-center gap-4 mt-4 pt-3 border-top border-sage-subtle" variants={itemVariants}>
              <div className="d-flex align-items-center gap-2 small" style={{ color: 'rgba(248, 247, 240, 0.8)' }}>
                <span className="dot-indicator green"></span>
                <span className="fw-medium">Active Field Drives</span>
              </div>
              <div className="d-flex align-items-center gap-2 small" style={{ color: 'rgba(248, 247, 240, 0.8)' }}>
                <span className="dot-indicator emerald"></span>
                <span className="fw-medium">Local Initiatives</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: 3D Living Forest Miniature Scene */}
        <div className="col-lg-6 col-xl-6 position-relative">
          <motion.div
            className="hero-3d-wrapper"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            {/* Ambient Background Aura */}
            <div className="living-forest-ambient-glow" aria-hidden="true"></div>

            {/* Interactive 3D Scene */}
            <Suspense
              fallback={
                <div className="living-forest-loading d-flex flex-column align-items-center justify-content-center">
                  <SeedlingAnimation size={48} />
                  <span className="mt-3 text-emerald small font-heading fw-bold">
                    Cultivating 3D Forest...
                  </span>
                </div>
              }
            >
              <LivingForestScene />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
