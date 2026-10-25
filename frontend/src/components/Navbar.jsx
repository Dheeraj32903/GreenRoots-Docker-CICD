import React from 'react';
import SeedlingAnimation from './SeedlingAnimation';

export default function Navbar() {
  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg gr-navbar py-3 px-3 px-lg-5" aria-label="Main Navigation">
        <div className="container-fluid px-0">
          {/* Brand Logo & Name with subtle Seedling Animation */}
          <a className="navbar-brand d-flex align-items-center gap-2" href="#hero">
            <div className="gr-brand-badge" aria-hidden="true">
              <SeedlingAnimation size={24} />
            </div>
            <div>
              <span className="gr-brand-title">GreenRoots</span>
              <span className="gr-brand-tagline">Tree Plantation Platform</span>
            </div>
          </a>

          {/* Mobile Navigation Toggler */}
          <button
            className="navbar-toggler border-0 shadow-none px-2 py-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMenu"
            aria-controls="navbarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list fs-2 text-forest"></i>
          </button>

          {/* Clean Navigation Links with Glassmorphic styling */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarMenu">
            <ul className="navbar-nav align-items-center gap-1 gap-lg-2 mt-3 mt-lg-0">
              <li className="nav-item">
                <a className="nav-link gr-nav-link" href="#hero">Overview</a>
              </li>
              <li className="nav-item">
                <a className="nav-link gr-nav-link" href="#events-section">Events</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

