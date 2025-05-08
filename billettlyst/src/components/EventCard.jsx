import { Link } from "react-router-dom";

import "../styles/eventCard.scss";

export default function EventCard({event}) {

    const slugify = (string) => {
        return string
            .toLowerCase()
            .replace(/\s+/g, '-') // Ersatter mellomrom med bindestrek
            .replace(/[^\w\-]+/g, ''); // Fjerner alt som ikke er bokstaver
    };

    return (
        // Henter ut relevant arrangement-informasjon
        <article className="event-card">
            <Link to={`/event/${slugify(event.name)}`} className="event-card-link">
                <img src={event.images[0]?.url} alt="event-image" />
                <h3>{event.name}</h3>
            </Link>
        </article>
    )
}