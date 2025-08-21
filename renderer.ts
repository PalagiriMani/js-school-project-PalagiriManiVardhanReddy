import { EventData } from "./types";
import { openModal } from "./modal";

/**
 * Creates and appends a button element for a single event marker.
 * @param event The event data object to render.
 * @param container The DOM element to append the marker to.
 */
function createEventMarker(event: EventData, container: HTMLElement): void {
  const btn = document.createElement('button');
  btn.className = 'timeline-js-marker';
  btn.type = 'button';
  btn.title = `${event.year} — ${event.title}`;
  btn.innerHTML = `<strong>${event.year}</strong>`;
  btn.addEventListener('click', () => openModal(event));
  container.appendChild(btn);
}

/**
 * Renders all event markers into the specified container.
 * @param events An array of EventData objects.
 */
export function renderTimeline(events: EventData[]): void {
  const timeline = document.getElementById('timeline');
  if (!timeline) {
    console.error('Timeline element not found.');
    return;
  }

  const markersContainer = document.createElement('div');
  markersContainer.id = 'timeline-markers';
  const heading = timeline.querySelector('h2');
  if (heading && heading.parentNode) {
    heading.parentNode.insertBefore(markersContainer, heading.nextSibling);
  } else {
    timeline.prepend(markersContainer);
  }

  events.forEach(event => createEventMarker(event, markersContainer));
}
