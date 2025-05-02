import { useEffect, useState } from "react";
import EventCards from "../components/EventCards";

import "../styles/home.scss";

export default function Home() {
    const [featuredEvents, setFeaturedEvents] = useState([]);

    const ids = "K8vZ917K7fV,K8vZ917_YJf,K8vZ917bJC7,K8vZ917oWOV"

    const getFeaturedEvents = async(id) => {
        fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?id=${id}&countryCode=NO&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => setFeaturedEvents(data._embedded?.attractions))
            .catch(error => console.error("Something went wrong fetching", error));
    };

    useEffect(() => {
        getFeaturedEvents(ids);
    }, []);

    return (
        <>
            <section className="hero-section">
                
            </section>
            
            <EventCards events={featuredEvents} />

            <section className="featured-events-section">
                <h2>Arrangementer i Oslo</h2>

                <EventCards />
            </section>
        </>
    )
}