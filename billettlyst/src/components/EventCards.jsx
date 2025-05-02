import EventCard from "./EventCard";

import "../styles/eventCards.scss";

export default function EventCards({events}) {
    return (
        <section className="event-cards-section grid">
            {events?.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </section>
    )
}