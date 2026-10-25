import axios from 'axios';

/**
 * Centralized Axios API client for GreenRoots Tree Plantation Event Management
 * Configured for Spring Boot backend on port 8081
 */
const backendHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

const apiClient = axios.create({
  baseURL: `http://${backendHost}:8081/treeplantationevent`,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const apiService = {
  /**
   * Ping backend health check
   * Resolves true if backend responds with 200 or 404 (meaning server is up and reachable).
   */
  async checkHealth() {
    try {
      const response = await apiClient.get('/');
      return response.status === 200;
    } catch (error) {
      // If server responded with any HTTP status (even 404), the server process is alive!
      if (error.response) {
        return true;
      }
      // If no response (network error / connection refused), backend is offline
      return false;
    }
  },

  /**
   * Fetch all tree plantation events using Axios
   * - 200 OK: returns array of records
   * - 404 Not Found: ("Tree Plantation Event Data Not Found") is treated as a valid empty state ([])
   * - Connection failure: thrown as an error to trigger disconnected state
   */
  async getAllEvents() {
    try {
      const response = await apiClient.get('/displayall');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      // Backend returns 404 with string "Tree Plantation Event Data Not Found" when directory is empty
      if (error.response && error.response.status === 404) {
        return [];
      }
      // Genuine network failure (backend server not running)
      if (!error.response) {
        const err = new Error(`Cannot connect to Spring Boot backend at http://${backendHost}:8081`);
        err.isNetworkError = true;
        throw err;
      }
      console.error('Error fetching events:', error);
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch events');
    }
  },

  /**
   * Add a new tree plantation event using Axios
   * Strictly user-editable fields: eventName, location, treesPlanted, completed.
   * No ID is passed from the client; the database auto-generates it.
   */
  async addEvent(eventPayload) {
    try {
      const response = await apiClient.post('/add', {
        eventName: eventPayload.eventName.trim(),
        location: eventPayload.location.trim(),
        treesPlanted: Number(eventPayload.treesPlanted),
        completed: Boolean(eventPayload.completed)
      });
      return response.data;
    } catch (error) {
      console.error('Error creating event via axios:', error);
      const errorMsg =
        error.response?.data?.message ||
        (typeof error.response?.data === 'string' ? error.response.data : null) ||
        error.message ||
        'Failed to plant event';
      throw new Error(errorMsg);
    }
  },

  /**
   * Update an existing tree plantation event by ID using Axios
   */
  async updateEvent(id, eventPayload) {
    try {
      const response = await apiClient.put(`/update/${id}`, {
        eventName: eventPayload.eventName.trim(),
        location: eventPayload.location.trim(),
        treesPlanted: Number(eventPayload.treesPlanted),
        completed: Boolean(eventPayload.completed)
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating event ID ${id} via axios:`, error);
      const errorMsg =
        error.response?.data?.message ||
        (typeof error.response?.data === 'string' ? error.response.data : null) ||
        error.message ||
        `Failed to update event ID ${id}`;
      throw new Error(errorMsg);
    }
  },

  /**
   * Delete a tree plantation event by ID using Axios
   */
  async deleteEvent(id) {
    try {
      const response = await apiClient.delete(`/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting event ID ${id}:`, error);
      const errorMsg =
        error.response?.data?.message ||
        (typeof error.response?.data === 'string' ? error.response.data : null) ||
        error.message ||
        `Failed to delete event ID ${id}`;
      throw new Error(errorMsg);
    }
  }
};

export default apiClient;
