import React from 'react';
import { Sprout } from 'lucide-react';

export default function EventCard({ event, onEditRequest, onDeleteRequest }) {
  const isCompleted = Boolean(event.completed);
  const trees = Number(event.treesPlanted) || 0;

  return (
    <article className="event-card">
      <div>
        {/* Card Header: Title & Status Badge */}
        <div className="event-card-header">
          <div className="pe-2">
            <h3 className="event-card-title">{event.eventName}</h3>
            <div className="event-card-location">
              <i className="bi bi-geo-alt-fill text-emerald" aria-hidden="true"></i>
              <span>{event.location}</span>
            </div>
          </div>

          <span className={`badge-status ${isCompleted ? 'completed' : 'ongoing'}`}>
            <i className={`bi ${isCompleted ? 'bi-check-circle-fill' : 'bi-hourglass-split'}`}></i>
            {isCompleted ? 'Completed' : 'Ongoing'}
          </span>
        </div>

        {/* Tree Count Volume Box with Sapling Logo */}
        <div className="tree-count-box">
          <div>
            <span className="stat-label d-block" style={{ fontSize: '0.72rem' }}>Planted Volume</span>
            <div className="tree-count-val">
              <span>{trees.toLocaleString()}</span>
              <span className="tree-count-sub">saplings</span>
            </div>
          </div>
          <div
            className="d-flex align-items-center justify-content-center rounded-3"
            style={{ width: '38px', height: '38px', background: 'var(--color-sage)', color: 'var(--color-forest)' }}
            title="Young Sapling Initiative"
          >
            <Sprout size={20} strokeWidth={2.3} className="text-forest" />
          </div>
        </div>
      </div>

      {/* Card Footer: Edit & Delete Actions (Database ID removed per user request) */}
      <div className="event-card-actions mt-3 d-flex align-items-center justify-content-end gap-2">
        <button
          type="button"
          className="btn-card-action btn-card-edit"
          onClick={() => onEditRequest && onEditRequest(event)}
          title={`Edit ${event.eventName}`}
          aria-label={`Edit event ${event.eventName}`}
        >
          <i className="bi bi-pencil text-forest"></i>
          <span>Edit</span>
        </button>

        <button
          type="button"
          className="btn-card-action btn-card-delete"
          onClick={() => onDeleteRequest(event)}
          title={`Delete ${event.eventName}`}
          aria-label={`Delete event ${event.eventName}`}
        >
          <i className="bi bi-trash3 text-danger"></i>
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
}
