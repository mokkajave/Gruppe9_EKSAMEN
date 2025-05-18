import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../components/Heading";
import "../styles/sanityEventDetails.scss";

export default function SanityEventDetails({ sanityUsers }) {
    const { id } = useParams();
    const [sanityEvent, setSanityEvent] = useState();

    const eventDetails = sanityEvent?._embedded?.events[0];
    const venue = eventDetails?._embedded?.venues?.[0];
    const venueName = venue?.name;
    const country = venue?.country?.name;
    const city = venue?.city?.name;
    const segment = eventDetails?.classifications?.[0]?.segment?.name || "";
    const date = new Date(eventDetails?.dates?.start?.localDate).toLocaleDateString("no-NO");

    const getFeaturedEvents = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?id=${id}&locale=NO&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => setSanityEvent(data))
            .catch(error => console.error("Something went wrong fetching events:", error));
    };

    useEffect(() => {
        getFeaturedEvents();
    }, []);

    return (
        <>
            <section className="sanity-event-details-section content-container grid">
                <img src={eventDetails?.images?.[0]?.url} alt={eventDetails?.name} />
                <article>
                    <Heading variant="h1">{eventDetails?.name}</Heading>
                    <ul>
                        <li>Sjanger: {segment}</li>
                        <li>Dato: {date}</li>
                        <li>Land: {country}</li>
                        <li>By: {city}</li>
                        <li>Sted: {venueName}</li>
                    </ul>
                </article>
            </section>
            <section>
                <h1>Brukere som har tidligere kjøpt dette eller har dette på ønskelisten</h1>
                {sanityUsers
                    ?.filter(user =>
                        (user.previous_purchases?.some(p => p.apiid === id) ||
                         user.wishlist?.some(w => w.apiid === id))
                    )
                    .map(user => (
                        <article key={user._id}>
                            <img src={user.image?.asset?.url} alt={`${user.name} Profilbilde`} />
                            <Heading variant="h2">{user.name}</Heading>
                        </article>
                    ))}
            </section>
        </>
    );
}