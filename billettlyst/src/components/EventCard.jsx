import { Link } from "react-router-dom";

import "../styles/eventCard.scss";

export default function EventCard({event}) {
    return (
        <article className="event-card">
            <Link to={`/event/${event.id}`} className="event-card-link">
                <img src={event.images?.[1]?.url} alt="event-image" />
                <h3>{event.name}</h3>
            </Link>
        </article>
    )
}