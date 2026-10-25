import React from 'react';

export default function Toast({ toasts = [], onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-stack" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast-item ${toast.type === 'error' ? 'error' : 'success'}`}
          role="alert"
        >
          <i
            className={`bi ${
              toast.type === 'error'
                ? 'bi-exclamation-triangle-fill text-danger'
                : 'bi-check-circle-fill text-leaf'
            }`}
            style={{ fontSize: '1.25rem' }}
          ></i>
          <span className="flex-grow-1">{toast.message}</span>
          <button
            type="button"
            className="btn btn-sm border-0 text-white p-0 opacity-75 hover-opacity-100"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
          >
            <i className="bi bi-x fs-5"></i>
          </button>
        </div>
      ))}
    </div>
  );
}
