import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImpactMetrics from './components/ImpactMetrics';
import EventsDirectory from './components/EventsDirectory';
import PlantEventModal from './components/PlantEventModal';
import DeleteModal from './components/DeleteModal';
import SwaggerModal from './components/SwaggerModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { apiService } from './services/api';

export default function App() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isSwaggerModalOpen, setIsSwaggerModalOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load events and monitor real backend connection
  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiService.getAllEvents();
      setEvents(data);
      setIsBackendConnected(true);
    } catch (err) {
      if (err.isNetworkError) {
        setIsBackendConnected(false);
        const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
        setError(`Cannot connect to Spring Boot backend at http://${host}:8081`);
      } else {
        // Backend replied with error status
        setIsBackendConnected(true);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();

    // Check health periodically every 15s
    const interval = setInterval(async () => {
      const isHealthy = await apiService.checkHealth();
      setIsBackendConnected(isHealthy);
    }, 15000);

    return () => clearInterval(interval);
  }, [loadEvents]);

  // Handle Save (Create or Update)
  const handleSaveEvent = async (formData, id) => {
    try {
      if (id) {
        // Update existing event via PUT /treeplantationevent/update/{id}
        const updated = await apiService.updateEvent(id, formData);
        setEvents((prev) => prev.map((item) => (item.id === id ? updated : item)));
        addToast(`Initiative "${updated.eventName}" updated successfully!`, 'success');
        setEditingEvent(null);
        return updated;
      } else {
        // Create new event via POST /treeplantationevent/add
        const newEvent = await apiService.addEvent(formData);
        setEvents((prev) => [newEvent, ...prev]);
        addToast(`Initiative "${newEvent.eventName}" planted successfully!`, 'success');
        return newEvent;
      }
    } catch (err) {
      addToast(err.message || 'Operation failed. Verify backend service.', 'error');
      throw err;
    }
  };

  // Handle Delete: updates directory only after successful backend operation
  const handleDeleteEvent = async (id) => {
    try {
      await apiService.deleteEvent(id);
      setEvents((prev) => prev.filter((item) => item.id !== id));
      addToast('Plantation drive removed from ledger.', 'success');
    } catch (err) {
      addToast(err.message || 'Failed to delete event.', 'error');
      throw err;
    }
  };

  const totalTrees = events.reduce((sum, item) => sum + (Number(item.treesPlanted) || 0), 0);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="container-fluid px-3 px-lg-5 flex-grow-1">
        {/* Editorial Hero Overview with 3D Living Forest */}
        <Hero
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* Real Backend Derived Impact Metrics */}
        <ImpactMetrics events={events} isLoading={isLoading} />

        {/* Drives Directory & Control Center */}
        <EventsDirectory
          events={events}
          isLoading={isLoading}
          error={error}
          onRefresh={loadEvents}
          onOpenAddModal={() => { setEditingEvent(null); setIsAddModalOpen(true); }}
          onEditRequest={(event) => setEditingEvent(event)}
          onDeleteRequest={(event) => setDeleteCandidate(event)}
        />
      </main>

      {/* Semantic Footer with API Documentation */}
      <Footer onOpenSwaggerModal={() => setIsSwaggerModalOpen(true)} />

      {/* Plant / Edit Plantation Drive Modal */}
      <PlantEventModal
        isOpen={isAddModalOpen || Boolean(editingEvent)}
        eventToEdit={editingEvent}
        onClose={() => { setIsAddModalOpen(false); setEditingEvent(null); }}
        onSubmitSuccess={handleSaveEvent}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(deleteCandidate)}
        event={deleteCandidate}
        onClose={() => setDeleteCandidate(null)}
        onConfirmDelete={handleDeleteEvent}
      />

      {/* Swagger UI Modal */}
      <SwaggerModal
        isOpen={isSwaggerModalOpen}
        onClose={() => setIsSwaggerModalOpen(false)}
      />

      {/* Toast Notifications */}
      <Toast
        toasts={toasts}
        onDismiss={removeToast}
      />
    </div>
  );
}
