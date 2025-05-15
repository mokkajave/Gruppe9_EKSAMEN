import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Heading from "../components/Heading";
import EventCards from "../components/EventCards";

import "../styles/categoryPage.scss";

export default function CategoryPage() {
    const {slug} = useParams()

    const [attractions, setAttractions] = useState([]);
    const [events, setEvents] = useState([]);
    const [venues, setVenues] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const getEvents = async() => {
        fetch(`https://app.ticketmaster.com/discovery/v2/suggest?keyword=${slug}&locale=*&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => {
                setAttractions(data?._embedded?.attractions)
                setEvents(data?._embedded?.events)
                setVenues(data?._embedded?.venues)
            })
            .catch(error => console.error("Something went wrong fetching:", error))
    };

    useEffect(() => {
            // Benytter "featuredEventsIds" som parameter
            getEvents()
        }, [slug]);

    // Eventuelle endringer i "hero-section": skifte farge eller bilde?
    const backgroundImages = {
        musikk: "#",
        sport: "#",
        teater: "#"
    }

    const backgroundImage = backgroundImages[slug];

    return (
        <>
            <section className="search-section">
                <Heading variant="h1">Filtrert søk</Heading>
                
                <Heading variant="h2">Søk</Heading>

            </section>

            {/* Attraksjoner */}
            <section className="events-section">
                <Heading variant="h2">Attraksjoner</Heading>

                <EventCards events={attractions} variant="category" />
            </section>

            {/* Arrangementer */}
            <section className="events-section">
                <Heading variant="h2">Arrangementer</Heading>

                <EventCards events={events} variant="category" />
            </section>

            {/* Spillesteder */}
            <section className="events-section">
                <Heading variant="h2">Spillesteder</Heading>

            </section>
        </>
    )
}