import { Link } from "react-router-dom";

import "../styles/eventCard.scss";

export default function EventCard({event}) {
    return (
        // Henter ut relevant arrangement-informasjon
        <article className="event-card">
            <Link to={`/event/${event.id}`} className="event-card-link">
                <img src={event.images?.[0]?.url} alt="event-image" />
                <p>{event._embedded?.venues[0]?.city?.name}</p>
                <h3>{event._embedded?.attractions[0]?.name}</h3>
            </Link>
        </article>
    )
}