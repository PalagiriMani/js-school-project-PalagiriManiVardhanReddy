import { EventData } from "./types";

/**
 * Fetches event data from the events.json file.
 * @returns A promise that resolves to an array of EventData objects.
 * @throws An error if the network response is not okay or if the data fails to load.
 */
export async function fetchEvents(): Promise<EventData[]> {
  try {
    const response = await fetch('events.json');
    if (!response.ok) {
      throw new Error('Could not load events.json');
    }
    const events: EventData[] = await response.json();
    return events;
  } catch (err) {
    console.error('Error loading events:', err);
    throw err;
  }
}
