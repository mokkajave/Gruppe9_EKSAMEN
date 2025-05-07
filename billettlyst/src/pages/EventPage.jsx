import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/eventPage.scss";

export default function EventPage() {
    const {id} = useParams();
    const [event, setEvent] = useState(null);

    const getEvent = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?&locale=NO&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => setEvent(data))
            .catch(error => console.error("Something went wrong fetching event:", error))
    };

    useEffect(() => {
        getEvent();
    }, [id]);

    return (
        <section className="event-details-section grid">
            <img src={event?.images?.[0]?.url} alt="event-image" />
            <article>
                <h1>{event?._embedded?.attractions[0]?.name}</h1>
            </article>
        </section>
    )
}