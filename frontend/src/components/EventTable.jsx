import React from 'react';

export default function EventTable({ events = [], onEditRequest, onDeleteRequest }) {
  return (
    <div className="gr-table-container table-responsive">
      <table className="gr-table table" aria-label="Tree Plantation Events Directory Table">
        <thead>
          <tr>
            <th scope="col" style={{ width: '80px' }}>ID</th>
            <th scope="col">Event Initiative</th>
            <th scope="col">Location</th>
            <th scope="col">Trees Planted</th>
            <th scope="col">Status</th>
            <th scope="col" className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            const isCompleted = Boolean(event.completed);
            const trees = Number(event.treesPlanted) || 0;

            return (
              <tr key={event.id}>
                <td>
                  <strong className="text-forest">#{event.id}</strong>
                </td>
                <td>
                  <div className="fw-bold text-forest">{event.eventName}</div>
                </td>
                <td>
                  <div className="d-flex align-items-center gap-1 text-muted small">
                    <i className="bi bi-geo-alt-fill text-emerald"></i>
                    <span>{event.location}</span>
                  </div>
                </td>
                <td>
                  <span className="fw-bold text-emerald font-heading fs-6">
                    {trees.toLocaleString()}
                  </span>
                  <span className="text-muted small ms-1">saplings</span>
                </td>
                <td>
                  <span className={`badge-status ${isCompleted ? 'completed' : 'ongoing'}`}>
                    <i className={`bi ${isCompleted ? 'bi-check-circle-fill' : 'bi-hourglass-split'}`}></i>
                    {isCompleted ? 'Completed' : 'Ongoing'}
                  </span>
                </td>
                <td className="text-end">
                  <div className="d-inline-flex align-items-center gap-2">
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
