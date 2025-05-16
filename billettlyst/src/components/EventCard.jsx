import { Link } from "react-router-dom";

import "../styles/eventCard.scss";

// Som standard benyttes "basic" - om ikke annet er spesifisert
export default function EventCard({event, variant="basic", wishlist = [], addToWishlist = () => {}}) {

    // Funksjonen gjør lenken i interaktive kort URL-vennlig
    const slugify = (string) => {
        return string
            .toLowerCase() // Gjør alle bokstaver små
            .replace(/\s+/g, '-') // Ersatter mellomrom med bindestrek
            .replace(/[^\w\-]+/g, '') // Fjerner alt som ikke er bokstaver
    };

    /* 
        - En variabel sjekker om et event ligger i state (wishlist)
        - State-en "wishlist" er sendt videre som prop fra CategoryPage -> EventCards -> EventCard
        - Variabelen gjør det lett å endre stil på knappen som trykkes (inWishlist ? "className" : "")
            - Se kort nummer 4 - "Kategori-kort" under
    */
    const inWishlist = wishlist.some(item => item.id === event.id);

    return (
        /* 
            Henter ut relevant arrangement-informasjon med utgangspunkt i hvilket type kort
            som skal vises (i ulike varianter)
        */
        <article className="event-card">
            {/* 
                1 Interaktive kort
                - Bruk: variant="interactive"
                - Eksempel: Featured events / festivaler i Home
            */}
            {variant === "interactive" && (
                <Link to={`/event/${slugify(event?.name)}`} className="event-card-link">
                    <img src={event?.images[5]?.url} alt="event-image" />
                    <p>Festival</p>
                    <h3>{event?.name}</h3>
                </Link>
            )}

            {/* 
                2 Standard kort
                - Krever ingen prop
                - Eksempel: City events i Home
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
                            <li>{event?._embedded?.venues[0]?.country?.name}</li>
                            <li>{event?._embedded?.venues[0]?.city?.name}</li> 
                        </ul>
                    </div>
                </div>
            )}

            {/* 
                3 Festivalpass-kort
                - Bruk: variant="festival-pass"
                - Eksempel: Festivalpass i EventPage
            */}
            {variant === "festival-pass" && (
                <div className="event-card-container">
                    <img src={event?.images[0]?.url} alt="event-image" />
                    <div className="event-card-details">
                        <h3>{event?.name}</h3>
                        <ul className="event-card-info">
                            <li>{new Date(event?.dates?.start?.localDate).toLocaleDateString("no-NO")}</li>
                            <li>{event?._embedded?.venues[0]?.name}</li>
                        </ul>
                        <div className="event-card-buttons">
                            <button className="event-button-cart">Legg i handlekurv</button>
                        </div>
                    </div>
                </div>
            )}

            {/*
                4 Kategori-kort (med interaktiv knapp)
                - Bruk: variant="category"
                - Eksempel: kategori-kort i CategoryPage
            */}
            {variant === "category" && (
                <div className="event-card-container">
                    <div className="image-wrapper">
                        <img src={event?.images[0]?.url} alt="event-image" />
                        <button className={`event-button-favorite ${inWishlist ? "saved" : ""} `}
                        onClick={() => addToWishlist(event)}>
                            <span className="material-symbols-outlined favorite-icon">
                                {inWishlist ? "heart_check" : "favorite"}
                            </span>
                        </button>
                    </div>
                    <div className="event-card-details">
                        <p>{event?.classifications[0]?.genre?.name}</p>
                        <h3>{event?.name}</h3>
                        <ul className="event-card-info">
                            <li>{event?.dates?.start?.localDate ? 
                                new Date(event?.dates?.start?.localDate).toLocaleDateString("no-NO") 
                                : ""}</li>
                            <li>{event?._embedded?.venues[0]?.name}</li>
                            <li>{event?._embedded?.venues[0]?.country?.name}</li>
                            <li>{event?._embedded?.venues[0]?.city?.name}</li> 
                        </ul>
                    </div>
                </div>
            )}
        </article>
        
    )
}