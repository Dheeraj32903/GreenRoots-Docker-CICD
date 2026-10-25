import React from 'react';

export default function SeedlingAnimation({ size = 36, className = '' }) {
  return (
    <div
      className={`seedling-anim-wrapper ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Growing seedling illustration"
    >
      <svg
        viewBox="0 0 48 48"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="seedling-svg seedling-growth-svg"
      >
        {/* Ground Mound / Soil line */}
        <path
          className="seedling-soil"
          d="M10 40C16 38.5 32 38.5 38 40"
          stroke="#4F8A55"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Stem growing upward */}
        <path
          className="seedling-stem"
          d="M24 39C24 30 23.5 24 24 16"
          stroke="#12372A"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* First Leaf (Left) */}
        <path
          className="seedling-leaf-left"
          d="M24 28C18 28 14 23 15 18C19 18 24 22 24 28Z"
          fill="#4F8A55"
        />

        {/* Second Leaf (Right) */}
        <path
          className="seedling-leaf-right"
          d="M24 22C30 22 34 17 33 12C29 12 24 16 24 22Z"
          fill="#64A36B"
        />

        {/* Top Fresh Bud */}
        <circle
          className="seedling-bud"
          cx="24"
          cy="15"
          r="2.5"
          fill="#DDE9D7"
          stroke="#12372A"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
