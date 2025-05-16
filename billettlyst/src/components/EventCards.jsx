import EventCard from "./EventCard";

import "../styles/eventCards.scss";

export default function EventCards({events, variant, wishlist, addToWishlist}) {
    return (
        <section className="event-cards-section content-container grid">
            {/*
                Mapper ut events, som holder på en rekke arrangementer,
                og sender hvert enkelt arrangement videre til EventCard-komponentet
            */}
            {events?.map(event => (
                <EventCard 
                    key={event.id} 
                    event={event} 
                    variant={variant}
                    wishlist={wishlist}
                    addToWishlist={addToWishlist} />
            ))}
        </section>
    )
}