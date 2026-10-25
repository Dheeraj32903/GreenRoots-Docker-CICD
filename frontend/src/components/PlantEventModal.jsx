import React, { useState, useEffect } from 'react';

export default function PlantEventModal({ isOpen, onClose, onSubmitSuccess, eventToEdit = null }) {
  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    treesPlanted: '',
    completed: false
  });

  const [touched, setTouched] = useState({
    eventName: false,
    location: false,
    treesPlanted: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize form state when editing an event or opening modal
  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        eventName: eventToEdit.eventName || '',
        location: eventToEdit.location || '',
        treesPlanted: eventToEdit.treesPlanted !== undefined ? String(eventToEdit.treesPlanted) : '',
        completed: Boolean(eventToEdit.completed)
      });
    } else {
      setFormData({
        eventName: '',
        location: '',
        treesPlanted: '',
        completed: false
      });
    }
    setTouched({ eventName: false, location: false, treesPlanted: false });
    setErrors({});
  }, [eventToEdit, isOpen]);

  if (!isOpen) return null;

  // Validation function
  const validateField = (field, value) => {
    let error = null;
    if (field === 'eventName') {
      const trimmed = value.trim();
      if (!trimmed) {
        error = 'Initiative name is required';
      } else if (trimmed.length < 3) {
        error = 'Initiative name must be at least 3 characters';
      } else if (trimmed.length > 100) {
        error = 'Initiative name cannot exceed 100 characters';
      }
    }

    if (field === 'location') {
      const trimmed = value.trim();
      if (!trimmed) {
        error = 'Location is required';
      } else if (trimmed.length < 2) {
        error = 'Location must be at least 2 characters';
      } else if (trimmed.length > 100) {
        error = 'Location cannot exceed 100 characters';
      }
    }

    if (field === 'treesPlanted') {
      const num = Number(value);
      if (value === '' || isNaN(num) || num < 1 || !Number.isInteger(num)) {
        error = 'Enter a valid nonnegative whole number of trees (at least 1)';
      }
    }

    return error;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all as touched on submit
    setTouched({ eventName: true, location: true, treesPlanted: true });

    const nameError = validateField('eventName', formData.eventName);
    const locationError = validateField('location', formData.location);
    const treesError = validateField('treesPlanted', formData.treesPlanted);

    if (nameError || locationError || treesError) {
      setErrors({
        eventName: nameError,
        location: locationError,
        treesPlanted: treesError
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmitSuccess(formData, eventToEdit?.id);

      // Reset form on success
      setFormData({
        eventName: '',
        location: '',
        treesPlanted: '',
        completed: false
      });
      setTouched({});
      setErrors({});
      onClose();
    } catch {
      // Error notifications handled by parent toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="gr-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="gr-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="gr-modal-header">
          <div>
            <h3 id="modal-title" className="h5 font-heading fw-bold text-forest mb-0">
              {eventToEdit ? 'Edit Plantation Drive' : 'Plant New Plantation Drive'}
            </h3>
          </div>
          <button
            type="button"
            className="btn-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Modal Body: Two column layout on desktop */}
        <div className="gr-modal-body">
          <div className="row g-4 align-items-start">
            {/* Form Column */}
            <div className="col-lg-7">
              <form onSubmit={handleSubmit} noValidate>
                {/* 1. Initiative Name */}
                <div className="mb-3 form-stagger-1">
                  <label htmlFor="eventName" className="form-label-custom">
                    <span>Initiative Name <span className="text-danger">*</span></span>
                    <span className="small text-muted font-normal">
                      {formData.eventName.length}/100
                    </span>
                  </label>
                  <input
                    type="text"
                    id="eventName"
                    className={`form-control-custom ${touched.eventName && errors.eventName ? 'is-invalid' : ''}`}
                    placeholder="e.g. Coastal Mangrove Restoration"
                    value={formData.eventName}
                    onChange={(e) => handleChange('eventName', e.target.value)}
                    onBlur={() => handleBlur('eventName')}
                    disabled={isSubmitting}
                    required
                    maxLength={100}
                  />
                  {touched.eventName && errors.eventName && (
                    <div className="input-hint-error">{errors.eventName}</div>
                  )}
                </div>

                {/* 2. Location / Botanical Site */}
                <div className="mb-3 form-stagger-2">
                  <label htmlFor="location" className="form-label-custom">
                    <span>Location / Botanical Site <span className="text-danger">*</span></span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    className={`form-control-custom ${touched.location && errors.location ? 'is-invalid' : ''}`}
                    placeholder="e.g. East Delta Sanctuary"
                    value={formData.location}
                    onChange={(e) => handleChange('location', e.target.value)}
                    onBlur={() => handleBlur('location')}
                    disabled={isSubmitting}
                    required
                    maxLength={100}
                  />
                  {touched.location && errors.location && (
                    <div className="input-hint-error">{errors.location}</div>
                  )}
                </div>

                {/* 3. Number of Trees Planted (Clean numeric field without redundant buttons) */}
                <div className="mb-3 form-stagger-3">
                  <label htmlFor="treesPlanted" className="form-label-custom">
                    <span>Number of Trees Planted <span className="text-danger">*</span></span>
                  </label>
                  <input
                    type="number"
                    id="treesPlanted"
                    min="1"
                    step="1"
                    className={`form-control-custom ${touched.treesPlanted && errors.treesPlanted ? 'is-invalid' : ''}`}
                    placeholder="e.g. 150"
                    value={formData.treesPlanted}
                    onChange={(e) => handleChange('treesPlanted', e.target.value)}
                    onBlur={() => handleBlur('treesPlanted')}
                    disabled={isSubmitting}
                    required
                  />
                  {touched.treesPlanted && errors.treesPlanted && (
                    <div className="input-hint-error">{errors.treesPlanted}</div>
                  )}
                </div>

                {/* 4. Drive Completed Toggle Switch */}
                <div className="mb-2 form-stagger-4">
                  <div className="switch-card">
                    <div>
                      <label htmlFor="completedSwitch" className="font-heading fw-bold text-forest small d-block mb-0 cursor-pointer">
                        Drive Completed
                      </label>
                      <span className="small text-muted" style={{ fontSize: '0.78rem' }}>
                        Marks whether this planting drive has finished.
                      </span>
                    </div>
                    <div className="form-check form-switch fs-5 mb-0">
                      <input
                        className="form-check-input cursor-pointer"
                        type="checkbox"
                        role="switch"
                        id="completedSwitch"
                        checked={formData.completed}
                        onChange={(e) => handleChange('completed', e.target.checked)}
                        disabled={isSubmitting}
                        aria-label="Drive Completed"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Supporting Column: Live Preview Card (Clean, Authentic, No Fake IDs) */}
            <div className="col-lg-5">
              <div className="p-3 rounded-3 bg-sage-light h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="small font-heading fw-bold text-forest text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                      <i className="bi bi-eye text-emerald me-1"></i> Live Card Preview
                    </span>
                    <span className="small text-muted" style={{ fontSize: '0.75rem' }}>
                      New Record
                    </span>
                  </div>

                  {/* Clean preview matching directory cards */}
                  <div className="event-card p-3 shadow-none border bg-white mb-2">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="fw-bold text-forest text-truncate pe-2" style={{ fontSize: '1.05rem' }}>
                        {formData.eventName.trim() || 'Initiative Name'}
                      </div>
                      <span className={`badge-status ${formData.completed ? 'completed' : 'ongoing'}`}>
                        {formData.completed ? 'Completed' : 'Ongoing'}
                      </span>
                    </div>

                    <div className="d-flex align-items-center gap-1 text-muted small mb-3">
                      <i className="bi bi-geo-alt-fill text-emerald" style={{ fontSize: '0.8rem' }}></i>
                      <span className="text-truncate">{formData.location.trim() || 'Botanical Venue'}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-2 border-top border-light">
                      <span className="small text-muted" style={{ fontSize: '0.8rem' }}>Trees Volume</span>
                      <span className="fw-bold text-emerald font-heading">
                        {(Number(formData.treesPlanted) || 0).toLocaleString()} saplings
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer: Exactly 2 Action Buttons */}
        <div className="gr-modal-footer">
          <button
            type="button"
            className="btn btn-secondary-sage px-4"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-emerald-action px-4"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <i className="bi bi-check-lg"></i>
                <span>Save</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
