import { Link } from "react-router-dom";

import "../styles/eventCard.scss";

export default function EventCard() {
    return (
        <article className="event-card">
            <Link to="/event/:id" className="event-card-link">
                <img src="#" alt="event-image" />
                <h3>Event Title</h3>
            </Link>
        </article>
    )
}