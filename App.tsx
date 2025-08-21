import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// The original events.json file content has been embedded directly to resolve import errors.
const eventsData = [
    {
        "year": "1903",
        "title": "Wright Brothers — First Powered Flight",
        "description": "Orville and Wilbur Wright make the first sustained, controlled powered flight at Kitty Hawk, North Carolina.",
        "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX-YG0QT8YfUdGEvX8ktSZqcgl_PuB6CvP2w&s",
        "category": "Aviation"
    },
    {
        "year": "1947",
        "title": "Bell X-1 — Breaking the Sound Barrier",
        "description": "Chuck Yeager flew the Bell X-1 and became the first person to officially exceed the speed of sound in level flight.",
        "imageURL": "data:image/jpeg;base64,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" ,
        "category": "Aviation"
    },
    {
        "year": "1969",
        "title": "Apollo 11 — First Moon Landing",
        "description": "Neil Armstrong and Buzz Aldrin land on the Moon; humanity's first steps on an extraterrestrial surface.",
        "imageURL": "https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg",
        "category": "Space"
    },
    {
        "year": "1981",
        "title": "Space Shuttle — First Reusable Orbiter",
        "description": "NASA's Space Shuttle Columbia launches on STS-1, beginning the era of partially reusable spacecraft.",
        "imageURL": "data:image/jpeg;base64,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"
    },
    {
        "year": "2015",
        "title": "Falcon 9 — First Successful Rocket Booster Landing",
        "description": "SpaceX successfully lands the first stage of the Falcon 9 rocket — a milestone for reusable rockets.",
        "imageURL": "https://cdn.mos.cms.futurecdn.net/i7Xe7Z66f8Rud8S62Y3jHg.jpg"
    }
];

// The original styles.css file content needs to be saved as a separate file
// in your project to be applied correctly. Please save the content
// of the original styles.css file into a new file named `styles.css`
// in your `src` directory to apply the styling.

// Type definitions for the event data
interface Event {
    year: string;
    title: string;
    description: string;
    imageURL: string;
    category: string;
}

// ----------------------------------------------------
// Header Component
// ----------------------------------------------------
const Header: React.FC = () => {
    // This component can be extended with a theme switch later
    return (
        <header>
            <h1>Aerospace Evolution Timeline</h1>
            <button type="button">AeroSpace</button>
        </header>
    );
};

// ----------------------------------------------------
// EventMarker Component
// ----------------------------------------------------
interface EventMarkerProps {
    event: Event;
    onOpenModal: (event: Event) => void;
}

const EventMarker: React.FC<EventMarkerProps> = ({ event, onOpenModal }) => {
    return (
        <article className="timeline-event">
            <div className="marker"></div>
            <div className="content">
                <h3 onClick={() => onOpenModal(event)}>{event.title}</h3>
                <p className="year">{event.year}</p>
                <p className="description">{event.description}</p>
            </div>
        </article>
    );
};

// ----------------------------------------------------
// FilterPanel Component
// ----------------------------------------------------
const FilterPanel: React.FC = () => {
    // This component is a placeholder for future filter functionality
    return (
        <nav>
            <h3>Filters</h3>
            <ul>
                <button type="button">
                    <li>
                        <a href="https://en.wikipedia.org/wiki/Aerospace" target="_blank" rel="noopener noreferrer">
                            Aerospace
                        </a>
                    </li>
                </button>
            </ul>
        </nav>
    );
};

// ----------------------------------------------------
// EventModal Component
// ----------------------------------------------------
interface EventModalProps {
    event: Event | null;
    onCloseModal: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onCloseModal }) => {
    if (!event) return null;

    // Use React Portal to render the modal outside the main component tree
    return createPortal(
        <div id="modal" style={{ display: event ? 'flex' : 'none' }}>
            <div className="modal-inner">
                <button onClick={onCloseModal} className="modal-close">&times;</button>
                <div className="modal-body">
                    <img src={event.imageURL} alt={event.title} className="modal-image" />
                    <div className="modal-text">
                        <h2 className="modal-title">{event.title}</h2>
                        <h3 className="modal-year">{event.year}</h3>
                        <p className="modal-desc">{event.description}</p>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

// ----------------------------------------------------
// App Component
// ----------------------------------------------------
const App: React.FC = () => {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleOpenModal = (event: Event) => {
        setSelectedEvent(event);
    };

    const handleCloseModal = () => {
        setSelectedEvent(null);
    };

    return (
        <>
            <Header />
            <main>
                <FilterPanel />
                <section id="timeline">
                    <h2>Historical Milestones</h2>
                    {eventsData.map((event, index) => (
                        <EventMarker key={index} event={event} onOpenModal={handleOpenModal} />
                    ))}
                </section>
            </main>
            <EventModal event={selectedEvent} onCloseModal={handleCloseModal} />
        </>
    );
};

export default App;
