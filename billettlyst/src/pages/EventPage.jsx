import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/eventPage.scss";

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
        <section className="event-details-section grid">
            <img src={event._embedded?.events[0]?.images[0]?.url} />
            <article>
                <h1>{event._embedded?.events[0]?._embedded?.attractions[0]?.name}</h1>
            </article>
        </section>
    )
}