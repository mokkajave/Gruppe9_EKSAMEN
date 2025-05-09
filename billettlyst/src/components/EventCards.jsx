import EventCard from "./EventCard";

import "../styles/eventCards.scss";

export default function EventCards({events, isFeatured}) {
    return (
        <section className="event-cards-section grid">
            {/*
                Mapper ut events, som holder på en rekke arrangementer,
                og sender hvert enkelt arrangement videre til EventCard-komponentet
            */}
            {events?.map(event => (
                <EventCard key={event.id} event={event} isFeatured={isFeatured} />
            ))}
        </section>
    )
}