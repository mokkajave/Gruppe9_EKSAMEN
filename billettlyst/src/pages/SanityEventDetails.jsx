import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../components/Heading";

export default function SanityEventDetails() {
    const { id } = useParams();
    const [sanityEvent, setSanityEvent] = useState();

    const eventDetails = sanityEvent?._embedded?.events[0]
    const venue = eventDetails?._embedded?.venues?.[0];
    const venueName = venue?.name;
    const country = venue?.country?.name;
    const city = venue?.city?.name;
    const date = new Date(eventDetails?.dates?.start?.localDate).toLocaleDateString("no-NO");

    const getFeaturedEvents = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?id=${id}&locale=NO&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => setSanityEvent(data))
            .catch(error => console.error("Something went wrong fetching events:", error))
    };
    console.log(sanityEvent)

    useEffect(() => {
        getFeaturedEvents();
    }, []);

    return(
            <section>
                <img src={eventDetails?.images[0]?.url}/>
                <article>
                    <Heading variant="h2">{eventDetails?.name}</Heading>
                    <ul>
                        <li>{date}</li>
                        <li>{country}</li>
                        <li>{city}</li>
                        <li>{venueName}</li>
                    </ul>
                </article>
            </section>
    );
}