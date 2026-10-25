import React from 'react';

export default function SwaggerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const swaggerHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const swaggerUrl = `http://${swaggerHost}:8081/swagger-ui/index.html`;

  return (
    <div
      className="gr-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="swagger-title"
    >
      <div
        className="gr-modal-dialog"
        style={{ maxWidth: '960px', height: '85vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gr-modal-header py-3 px-4">
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 bg-forest text-sage"
              style={{ width: '36px', height: '36px', background: 'var(--color-forest)', color: 'var(--color-sage)' }}
            >
              <i className="bi bi-file-earmark-code"></i>
            </div>
            <div>
              <h3 id="swagger-title" className="h5 font-heading fw-bold text-forest mb-0">
                REST API Documentation
              </h3>
              <span className="small text-muted" style={{ fontSize: '0.8rem' }}>
                Interactive OpenAPI &amp; Swagger Explorer &bull; Port 8081
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2">
            <a
              href={swaggerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-secondary-sage"
            >
              <i className="bi bi-box-arrow-up-right me-1"></i> Open in New Tab
            </a>
            <button
              type="button"
              className="btn-modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>

        <div className="p-0 h-100 position-relative" style={{ minHeight: '500px' }}>
          <iframe
            src={swaggerUrl}
            title="Spring Boot Swagger UI"
            className="w-100 h-100 border-0"
            style={{ minHeight: '520px' }}
          />
        </div>
      </div>
    </div>
  );
}
