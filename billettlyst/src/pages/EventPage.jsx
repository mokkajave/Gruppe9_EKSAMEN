import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/eventPage.scss";
import EventCards from "../components/EventCards";
import EventCard from "../components/EventCard";
import Heading from "../components/Heading";
import ArtistCard from "../components/ArtistCard";

export default function EventPage() {
    const {slug} = useParams();
    const [event, setEvent] = useState([]);

    const formattedKeyword = (slug) => {
        return slug.replace(/-/g, " ");
    }

    const getEvent = async() => {
        const keyword = formattedKeyword(slug);

        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&locale=NO&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => console.error("Something went wrong fetching event:", error))
    };

    useEffect(() => {
        getEvent();
    }, []);

    return (
        <>
            <section className="event-details-section">
                <Heading variant="h1">{event?._embedded?.events[0]?._embedded?.attractions[0]?.name}</Heading>
                
                <article className="content-container">
                    <ul className="event-genres">
                        <li>{event?._embedded?.events[0]?.classifications[0]?.segment?.name}</li>
                        <li>{event?._embedded?.events[0]?.classifications[0]?.genre?.name}</li>
                        <li>{event?._embedded?.events[0]?.classifications[0]?.subGenre?.name}</li>
                    </ul>
                    <ul className="event-venues">
                        <li>{new Date(event?._embedded?.events[0]?.dates?.start?.localDate).toLocaleDateString("no-NO")}</li>
                        <li>{event?._embedded?.events[0]?._embedded?.venues[0]?.name}</li>
                        <li>{event?._embedded?.events[0]?._embedded?.venues[0]?.city?.name}, {event?._embedded?.events[0]?._embedded?.venues[0]?.country?.name}</li>
                    </ul>
                </article>

                <Heading variant="h2">Følg oss på sosiale medier</Heading>

                <ul className="event-socials">
                    
                </ul>
            </section>

            <section className="events-section">
                <Heading variant="h2">Festivalpass</Heading>

                {/* Festivalpass */}
                <EventCards events={event?._embedded?.events} variant="hybrid" />
            </section>

            <section className="artists-section">
                <Heading variant="h2">Artister</Heading>

                <section className="artist-cards-section content-container grid">
                    {/* Mapper ut direkte i EventPage */}
                    {event?._embedded?.events[0]?._embedded?.attractions?.map(artist => (
                        <ArtistCard key={artist.id} artist={artist}/>
                    ))}
                </section>
            </section>
        </>
    )
}