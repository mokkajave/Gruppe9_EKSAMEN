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

    /*
        - Lagrer arrangement-data i konstanter (variabler) - mer lesbart og fleksibelt
        - Unngår repetisjon
    */
   
    // "Fallback": Dersom data ikke eksisterer, vil den returnere en tom array (liste) / ingen error
    const attractions = event?._embedded?.events?.[0]?._embedded?.attractions || [];
    const eventName = attractions?.[0]?.name;

    const classifications = event?._embedded?.events[0]?.classifications?.[0] || "";
    const segment = classifications?.segment?.name || "";
    const genre = classifications?.genre?.name || "";
    const subGenre = classifications?.subGenre?.name || "";

    const venue = event?._embedded?.events?.[0]?._embedded?.venues?.[0] || "";
    const venueName = venue?.name || "";
    const country = venue?.country?.name || "";
    const city = venue?.city?.name || "";

    const festivalPasses = event?._embedded?.events;

    return (
        <>
            <section className="event-details-section">
                <Heading variant="h1">{eventName}</Heading>
                
                <article className="content-container">
                    <ul className="event-genres">
                        <li>{segment}</li>
                        <li>{genre}</li>
                        <li>{subGenre}</li>
                    </ul>
                    <ul className="event-venues">
                        <li>{venueName}</li>
                        <li>{city}, {country}</li>
                    </ul>
                </article>

                <Heading variant="h2">Følg oss på sosiale medier</Heading>

                <ul className="event-socials">
                    
                </ul>
            </section>

            <section className="events-section">
                <Heading variant="h2">Festivalpass</Heading>

                {/* Festivalpass */}
                <EventCards events={festivalPasses} variant="festival-pass" />
            </section>

            <section className="artists-section">
                <Heading variant="h2">Artister</Heading>

                <section className="artist-cards-section content-container grid">
                    {/* Mapper ut direkte i EventPage */}
                    {attractions?.map(artist => (
                        <ArtistCard key={artist.id} artist={artist}/>
                    ))}
                </section>
            </section>
        </>
    )
}