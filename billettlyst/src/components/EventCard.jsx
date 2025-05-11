import { Link } from "react-router-dom";

import "../styles/eventCard.scss";

export default function EventCard({event, isFeatured = false}) {

    const slugify = (string) => {
        return string
            .toLowerCase() // Gjør alle bokstaver små
            .replace(/\s+/g, '-') // Ersatter mellomrom med bindestrek
            .replace(/[^\w\-]+/g, '') // Fjerner alt som ikke er bokstaver
    };

    return (
        // Henter ut relevant arrangement-informasjon
        <article className="event-card">
            {isFeatured ? (
                <Link to={`/event/${slugify(event?.name)}`} className="event-card-link">
                    <img src={event?.images[5]?.url} alt="event-image" />
                    <p>Festival &bull; {event?.classifications[0]?.segment?.name}</p>
                    <h3>{event?.name}</h3>
                </Link>
            ) : (
                <div className="event-card-container">
                    <img src={event?.images[3]?.url} alt="event-image" />
                    <p>
                        {event?._embedded?.venues[0]?.country?.name} &bull; {event?._embedded?.venues[0]?.city?.name} &bull; {new Date(event?.dates?.start?.localDate).toLocaleDateString("no-NO")}
                    </p>
                    <h3>{event?.name}</h3>
                    <div className="event-buttons">
                        <button className="event-button">Legg i handlekurv</button>
                        <button className="event-button-favorite"><span className="material-symbols-outlined favorite-icon">favorite</span></button>
                    </div>
                </div>
            )}
        </article>
        
    )
}