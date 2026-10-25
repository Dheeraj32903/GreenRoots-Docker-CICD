import React from 'react';

export default function Footer({ onOpenSwaggerModal }) {
  return (
    <footer className="mt-5 py-4 border-top" style={{ borderColor: 'rgba(18, 55, 42, 0.08)', background: '#FFFFFF' }}>
      <div className="container-fluid px-3 px-lg-5">
        <div className="row gy-3 align-items-center justify-content-between">
          {/* Left: Platform Identity */}
          <div className="col-lg-5">
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="font-heading fw-bold text-forest">GreenRoots</span>
              <span className="text-muted small">&bull; Tree Plantation Event Management</span>
            </div>
            <p className="text-muted small mb-0" style={{ maxWidth: '480px' }}>
              Spring Boot REST API &bull; PostgreSQL Database &bull; React JS
            </p>
          </div>

          {/* Right: API Documentation Button & Student ID */}
          <div className="col-lg-7">
            <div className="d-flex align-items-center justify-content-lg-end gap-3 flex-wrap">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-2"
                onClick={onOpenSwaggerModal}
                style={{
                  borderRadius: 'var(--radius-pill)',
                  padding: '0.42rem 1rem',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '600',
                  color: 'var(--color-forest)',
                  borderColor: 'rgba(18, 55, 42, 0.2)',
                  background: 'var(--color-sage-light)'
                }}
              >
                <i className="bi bi-file-earmark-code text-emerald"></i>
                <span>API Documentation</span>
              </button>

              <div className="small text-muted">
                Student ID: <strong className="text-forest">2400032903</strong> &bull; &copy; 2026 GreenRoots
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
