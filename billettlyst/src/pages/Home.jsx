import { useEffect, useState } from "react";

import EventCards from "../components/EventCards";

import "../styles/home.scss";

export default function Home() {
    const [featuredEvents, setFeaturedEvents] = useState([]);

    const featuredEventsIds = "Z698xZb_Z16v7eGkFy,Z698xZb_Z17qfaA,Z698xZb_Z17q33_,Z698xZb_Z16vfkqIjU"

    const getFeaturedEvents = async(eventIds) => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?id=${eventIds}&locale=NO&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => setFeaturedEvents(data._embedded?.events))
            .catch(error => console.error("Something went wrong fetching events:", error))
    };

    useEffect(() => {
        getFeaturedEvents(featuredEventsIds)
    }, []);

    return (
        <>
            <section className="hero-section">
                
            </section>
            
            <EventCards events={featuredEvents} />

            <section className="featured-events-section">
                <h2>Arrangementer i (By)</h2>

                <EventCards />
            </section>
        </>
    )
}