import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/eventPage.scss";
import EventCards from "../components/EventCards";
import EventCard from "../components/EventCard";
import Heading from "../components/Heading";

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
                    <p>Festival &bull; {event?._embedded?.events[0]?.classifications[0]?.segment?.name} &bull; {event?._embedded?.events[0]?.classifications[0]?.genre?.name} &bull; {event?._embedded?.events[0]?.classifications[0]?.subGenre?.name}</p>
                </article>

                <Heading variant="h2">Følg oss på sosiale medier</Heading>

                <ul className="social-links">
                    
                </ul>
            </section>

            <section className="events-section">
                <Heading variant="h2">Festivalpass</Heading>
                <EventCards events={event?._embedded?.events} />
            </section>
        </>
    )
}