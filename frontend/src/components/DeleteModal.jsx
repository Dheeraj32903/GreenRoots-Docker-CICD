import React, { useState } from 'react';

export default function DeleteModal({ isOpen, event, onClose, onConfirmDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !event) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onConfirmDelete(event.id);
      onClose();
    } catch {
      // Handled by parent toast
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="gr-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
    >
      <div
        className="gr-modal-dialog"
        style={{ maxWidth: '460px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gr-modal-body text-center p-4">
          <div
            className="d-inline-flex align-items-center justify-content-center mb-3"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--color-danger-subtle)',
              color: 'var(--color-danger)',
              fontSize: '1.5rem'
            }}
          >
            <i className="bi bi-trash3-fill"></i>
          </div>

          <h3 id="delete-title" className="h5 font-heading fw-bold text-forest mb-2">
            Delete Plantation Drive?
          </h3>

          <p className="text-muted small mb-3">
            Are you sure you want to remove <strong className="text-forest">{event.eventName}</strong> (ID: #{event.id})?
          </p>

          <div className="alert alert-warning text-start small mb-0 rounded-3 p-3">
            <i className="bi bi-exclamation-triangle-fill text-warning me-1"></i>
            This will permanently delete this record from PostgreSQL and adjust your aggregate ledger.
          </div>
        </div>

        <div className="gr-modal-footer justify-content-center p-3">
          <button
            type="button"
            className="btn btn-secondary-sage px-4"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger px-4 font-heading fw-bold rounded-pill"
            style={{ background: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                <span>Deleting...</span>
              </>
            ) : (
              <span>Confirm Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
