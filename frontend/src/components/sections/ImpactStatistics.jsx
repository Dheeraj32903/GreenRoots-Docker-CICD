import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trees, CheckCircle2, Clock, Globe2 } from 'lucide-react';

/**
 * AnimatedCounter — Smoothly counts up to the target value
 */
function AnimatedCounter({ value = 0, duration = 1200 }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const endValue = Number(value) || 0;

    if (endValue === 0) {
      setDisplayValue(0);
      return;
    }

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayValue(Math.floor(easeProgress * endValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(endValue);
      }
    };

    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
}

/**
 * ImpactStatistics — Dedicated ecological metrics section
 * Strictly derives values from verified backend events.
 * Features Motion scroll entrances, count-up animations, and Lucide icons.
 */
export default function ImpactStatistics({ events = [], isLoading = false }) {
  // Real database derived metrics only (no fabricated formulas or sample data)
  const totalDrives = events.length;
  const totalTrees = events.reduce((sum, item) => sum + (Number(item?.treesPlanted) || 0), 0);
  const completedDrives = events.filter((e) => Boolean(e?.completed)).length;
  const ongoingDrives = totalDrives - completedDrives;

  const cards = [
    {
      id: 'total-drives',
      label: 'Total Plantation Drives',
      value: totalDrives,
      suffix: ' Initiatives',
      icon: Globe2,
      subtext: 'Registered afforestation sites',
      badge: 'Active Registry',
      colorClass: 'forest'
    },
    {
      id: 'total-trees',
      label: 'Total Trees Planted',
      value: totalTrees,
      suffix: ' Saplings',
      icon: Trees,
      subtext: 'Recorded planting count',
      badge: 'Living Canopy',
      colorClass: 'emerald'
    },
    {
      id: 'completed-drives',
      label: 'Completed Drives',
      value: completedDrives,
      suffix: ' Sites',
      icon: CheckCircle2,
      subtext: 'Completed planting drives',
      badge: 'Target Reached',
      colorClass: 'emerald'
    },
    {
      id: 'ongoing-drives',
      label: 'Ongoing Drives',
      value: ongoingDrives,
      suffix: ' In Action',
      icon: Clock,
      subtext: 'Active community drives',
      badge: 'In Progress',
      colorClass: 'amber'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="impact-statistics" className="mb-5" aria-label="Ecological Impact Statistics">
      <motion.div
        className="row g-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.id} className="col-sm-6 col-xl-3">
              <motion.article
                className="stat-card"
                variants={cardVariants}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="stat-label">{card.label}</span>
                    <div className={`stat-icon-wrapper ${card.colorClass}`} aria-hidden="true">
                      <Icon size={18} strokeWidth={2.2} />
                    </div>
                  </div>

                  <div className={`stat-number ${card.colorClass === 'emerald' ? 'text-emerald' : card.colorClass === 'amber' ? 'text-amber' : 'text-forest'}`}>
                    {isLoading ? (
                      <span className="placeholder col-6"></span>
                    ) : (
                      <AnimatedCounter value={card.value} />
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-3 border-top border-light mt-3 small text-muted">
                  <span>{card.subtext}</span>
                  <span className={`badge-status ${card.colorClass === 'amber' ? 'ongoing' : 'completed'}`}>
                    {card.badge}
                  </span>
                </div>
              </motion.article>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
