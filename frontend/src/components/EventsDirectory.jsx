import React, { useState, useMemo } from 'react';
import EventCard from './EventCard';
import EventTable from './EventTable';
import SeedlingAnimation from './SeedlingAnimation';

export default function EventsDirectory({
  events = [],
  isLoading = false,
  error = null,
  onRefresh,
  onOpenAddModal,
  onEditRequest,
  onDeleteRequest
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('NEWEST');
  const [viewMode, setViewMode] = useState('GRID');

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    return events
      .filter((item) => {
        if (statusFilter === 'COMPLETED' && !item.completed) return false;
        if (statusFilter === 'ONGOING' && item.completed) return false;

        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const nameMatch = (item.eventName || '').toLowerCase().includes(query);
          const locationMatch = (item.location || '').toLowerCase().includes(query);
          return nameMatch || locationMatch;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'TREES_DESC') return (Number(b.treesPlanted) || 0) - (Number(a.treesPlanted) || 0);
        if (sortBy === 'TREES_ASC') return (Number(a.treesPlanted) || 0) - (Number(b.treesPlanted) || 0);
        if (sortBy === 'ALPHA') return (a.eventName || '').localeCompare(b.eventName || '');
        return (Number(b.id) || 0) - (Number(a.id) || 0);
      });
  }, [events, searchTerm, statusFilter, sortBy]);

  return (
    <section id="events-section" className="mb-5" aria-label="Afforestation Initiatives Directory">
      {/* Directory Title and Search Toolbar */}
      <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2">
            <h2 className="h4 font-heading fw-bold text-forest mb-0">Plantation Drives</h2>
            <span className="badge rounded-pill bg-sage text-forest px-3 py-1 font-heading small fw-bold">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'Drive' : 'Drives'}
            </span>
          </div>
        </div>

        {/* Search & Control Tools */}
        <div className="d-flex flex-wrap align-items-center gap-2">
          {/* Search Input */}
          <div className="position-relative" style={{ minWidth: '220px' }}>
            <input
              type="text"
              className="form-control-custom py-2 ps-5 pe-3"
              style={{ fontSize: '0.88rem' }}
              placeholder="Search drive or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search plantation drives"
            />
            <i
              className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              style={{ pointerEvents: 'none' }}
              aria-hidden="true"
            ></i>
            {searchTerm && (
              <button
                type="button"
                className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent text-muted p-0"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <i className="bi bi-x-circle-fill"></i>
              </button>
            )}
          </div>

          {/* Status Filter */}
          <select
            className="form-control-custom w-auto py-2"
            style={{ fontSize: '0.88rem' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="ALL">All Statuses</option>
            <option value="COMPLETED">Completed Only</option>
            <option value="ONGOING">Ongoing Only</option>
          </select>

          {/* Sort By */}
          <select
            className="form-control-custom w-auto py-2"
            style={{ fontSize: '0.88rem' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort events"
          >
            <option value="NEWEST">Sort: Newest First</option>
            <option value="TREES_DESC">Trees: High to Low</option>
            <option value="TREES_ASC">Trees: Low to High</option>
            <option value="ALPHA">Name: A to Z</option>
          </select>

          {/* View Mode Toggle: Grid vs Table */}
          <div className="btn-group" role="group" aria-label="View Mode">
            <button
              type="button"
              className={`btn btn-tool-outline ${viewMode === 'GRID' ? 'active' : ''}`}
              onClick={() => setViewMode('GRID')}
              title="Card Grid View"
              aria-pressed={viewMode === 'GRID'}
            >
              <i className="bi bi-grid-fill"></i>
            </button>
            <button
              type="button"
              className={`btn btn-tool-outline ${viewMode === 'TABLE' ? 'active' : ''}`}
              onClick={() => setViewMode('TABLE')}
              title="Data Table View"
              aria-pressed={viewMode === 'TABLE'}
            >
              <i className="bi bi-table"></i>
            </button>
          </div>

          {/* Refresh Button with subtle rotation */}
          <button
            type="button"
            className="btn btn-tool-outline"
            onClick={onRefresh}
            title="Refresh from server"
            disabled={isLoading}
            aria-label="Refresh events list"
          >
            <i className={`bi bi-arrow-clockwise ${isLoading ? 'spinner-border spinner-border-sm border-1' : ''}`}></i>
          </button>
        </div>
      </div>

      {/* Network Error Alert Banner */}
      {error && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between p-3 rounded-3 mb-4" role="alert">
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-exclamation-triangle-fill fs-4 text-danger"></i>
            <div>
              <div className="fw-bold">Unable to reach Backend API</div>
              <div className="small text-muted">{error}</div>
            </div>
          </div>
          <button type="button" className="btn btn-sm btn-outline-danger" onClick={onRefresh}>
            Retry Connection
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {isLoading && events.length === 0 && (
        <div className="events-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="event-card">
              <div className="skeleton-box mb-3" style={{ height: '22px', width: '70%' }}></div>
              <div className="skeleton-box mb-4" style={{ height: '16px', width: '45%' }}></div>
              <div className="skeleton-box mb-3" style={{ height: '64px', width: '100%' }}></div>
              <div className="skeleton-box" style={{ height: '18px', width: '100%' }}></div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State with Animated Seedling */}
      {!isLoading && filteredEvents.length === 0 && (
        <div className="empty-state-box">
          <div className="mb-3 d-flex justify-content-center">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{ width: '64px', height: '64px', background: 'var(--color-sage-light)' }}
            >
              <SeedlingAnimation size={40} />
            </div>
          </div>
          <h3 className="h5 font-heading fw-bold text-forest mb-2">No Plantation Drives Found</h3>
          <p className="text-muted small col-md-6 mx-auto mb-0">
            {searchTerm || statusFilter !== 'ALL'
              ? 'No initiatives match your search or filter criteria. Try adjusting your query.'
              : 'There are currently no plantation events recorded in the database. Use the Start Planting button in the navigation bar to add a new record.'}
          </p>
        </div>
      )}

      {/* Display Grid or Table */}
      {!isLoading && filteredEvents.length > 0 && (
        viewMode === 'GRID' ? (
          <div className="events-grid">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onEditRequest={onEditRequest}
                onDeleteRequest={onDeleteRequest}
              />
            ))}
          </div>
        ) : (
          <EventTable
            events={filteredEvents}
            onEditRequest={onEditRequest}
            onDeleteRequest={onDeleteRequest}
          />
        )
      )}
    </section>
  );
}
