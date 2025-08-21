import { fetchEvents } from './fetcher';
import { renderTimeline } from './renderer';

/**
 * The main function to initialize the application.
 * It fetches the data and renders the timeline.
 */
async function initializeApp(): Promise<void> {
  try {
    // Attempt to fetch the event data from the JSON file.
    const events = await fetchEvents();
    // Render the timeline markers on the page using the fetched data.
    renderTimeline(events);
  } catch (error) {
    // If an error occurs during fetching or rendering, display an error message.
    const timeline = document.getElementById('timeline');
    if (timeline) {
      timeline.textContent = 'Failed to load timeline events.';
    }
  }
}

// Ensure the DOM is fully loaded before running the app.
document.addEventListener('DOMContentLoaded', initializeApp);
