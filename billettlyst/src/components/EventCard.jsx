import { Link } from "react-router-dom";

import "../styles/eventCard.scss";

export default function EventCard({event, variant="basic"}) {

    const slugify = (string) => {
        return string
            .toLowerCase() // Gjør alle bokstaver små
            .replace(/\s+/g, '-') // Ersatter mellomrom med bindestrek
            .replace(/[^\w\-]+/g, '') // Fjerner alt som ikke er bokstaver
    };

    return (
        /* 
            Henter ut relevant arrangement-informasjon med utgangspunkt i hvilket type kort
            som skal vises (i ulike varianter)
        */
        <article className="event-card">
            {/* 
                Interaktive kort
                - Bruk: variant="interactive"
                - Eksempel: Featured events 
            */}
            {variant === "interactive" && (
                <Link to={`/event/${slugify(event?.name)}`} className="event-card-link">
                    <img src={event?.images[5]?.url} alt="event-image" />
                    <p>Festival</p>
                    <h3>{event?.name}</h3>
                </Link>
            )}

            {/* 
                Standard kort
                - Eksempel: City events 
            */}
            {variant === "basic" && (
                <div className="event-card-container">
                    <img src={event?.images[3]?.url} alt="event-image" />
                    <p>{event?.classifications[0]?.genre?.name}</p>
                    <h3>{event?.name}</h3>
                    <p className="event-card-details">
                        <span>{new Date(event?.dates?.start?.localDate).toLocaleDateString("no-NO")}</span>
                        
                        <span>{event?._embedded?.venues[0]?.name}</span>
                        <span>{event?._embedded?.venues[0]?.city?.name}, {event?._embedded?.venues[0]?.country?.name}</span>
                    </p>
                </div>
            )}

            {/* 
                Hybrid kort (med interaktive elementer)
                - Bruk: variant="hybrid"
                - Eksempel: Festivalpass, kategori-filtering
            */}
            {variant === "hybrid" && (
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