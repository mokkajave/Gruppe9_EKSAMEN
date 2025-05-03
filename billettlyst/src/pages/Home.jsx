import { useEffect, useState } from "react";

import EventCards from "../components/EventCards";

import "../styles/home.scss";

export default function Home() {
    // useState-hook som tar imot og holder på arrangement(er)
    const [featuredEvents, setFeaturedEvents] = useState([]);

    // En variabel som inneholder ID-er for fremhevede arrangementer
    const featuredEventsIds = "Z698xZb_Z16v7eGkFy,Z698xZb_Z17qfaA,Z698xZb_Z17q33_,Z698xZb_Z16vfkqIjU"

    /* 
        - Funksjon som henter arrangementer fra Ticketmaster sin API basert på ID
        - Funksjonen tar imot én parameter (eventIds), som skal gi arrangement-ID-er
        - Henter arrangementer i JSON-format ved hjelp av et kall
        - Plasserer hentede arrangementer i state (featuredEvents)
    */
    const getFeaturedEvents = async(eventIds) => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?id=${eventIds}&locale=NO&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => setFeaturedEvents(data._embedded?.events))
            .catch(error => console.error("Something went wrong fetching events:", error))
    };

    // Funksjonen kjøres når komponentet mountes (rendres)
    useEffect(() => {
        // Benytter "featuredEventsIds" som parameter
        getFeaturedEvents(featuredEventsIds)
    }, []);

    return (
        <>
            <section className="hero-section">
                
            </section>
            
            {/* Sender med state (featuredEvents) som prop */}
            <EventCards events={featuredEvents} />

            <section className="featured-events-section">
                <h2>Arrangementer i (By)</h2>

                <EventCards />
            </section>
        </>
    )
}