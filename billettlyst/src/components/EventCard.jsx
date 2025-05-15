import { Link } from "react-router-dom";

import "../styles/eventCard.scss";

// Som standard benyttes "basic" - om ikke annet er spesifisert
export default function EventCard({event, variant="basic"}) {

    // Funksjonen gjør lenken i interaktive kort URL-vennlig
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
                - Eksempel: Featured events / festivaler
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
                    <img src={event?.images[0]?.url} alt="event-image" />
                    <div className="event-card-details">
                        <p>{event?.classifications[0]?.genre?.name}</p>
                        <h3>{event?.name}</h3>
                        <ul className="event-card-info">
                            <li>{new Date(event?.dates?.start?.localDate).toLocaleDateString("no-NO")}</li>
                            <li>{event?._embedded?.venues[0]?.name}</li>
                            <li>{event?._embedded?.venues[0]?.city?.name}, {event?._embedded?.venues[0]?.country?.name}</li>
                        </ul>
                    </div>
                </div>
            )}

            {/* 
                Hybrid kort (med interaktive elementer)
                - Bruk: variant="hybrid"
                - Eksempel: Festivalpass, kategori-filtrering
            */}
            {variant === "hybrid" && (
                <div className="event-card-container">
                    <img src={event?.images[0]?.url} alt="event-image" />
                    <div className="event-card-details">
                        <h3>{event?.name}</h3>
                        <ul className="event-card-info">
                            <li>{new Date(event?.dates?.start?.localDate).toLocaleDateString("no-NO")}</li>
                            <li>{event?._embedded?.venues[0]?.name}</li>
                        </ul>
                        <div className="event-card-buttons">
                            <button className="event-button">Legg i handlekurv</button>
                            <button className="event-button-favorite"><span className="material-symbols-outlined favorite-icon">favorite</span></button>
                        </div>
                    </div>
                </div>
            )}
        </article>
        
    )
}