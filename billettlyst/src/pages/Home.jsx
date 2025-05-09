import { useEffect, useState } from "react";

import EventCards from "../components/EventCards";

import "../styles/home.scss";

export default function Home() {
    // useState-hook som tar imot og holder på utvalgte arrangement(er)
    const [featuredEvents, setFeaturedEvents] = useState([]);

    // useState-hook som tar imot og holder på arrangement(er) i en spesifikk storby
    const [cityEvents, setCityEvents] = useState([]);

    // useState-hook som tar imot og holder på en spesifikk storby
    const [city, setCity] = useState("Oslo");

    // En variabel som inneholder ID-er for utvalgte arrangementer
    const featuredIds = "K8vZ917_YJf,K8vZ917K7fV,K8vZ917oWOV,K8vZ917bJC7";

    /* 
        - Funksjon som henter attraksjoner fra Ticketmaster sin API basert på ID
        - Funksjonen tar imot én parameter (eventIds) - arrangement-ID-er
        - Henter attraksjoner i JSON-format ved hjelp av et kall
        - Plasserer hentede attraksjoner i state (featuredEvents)
    */
    const getFeaturedEvents = async(attractionIds) => {
        fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?id=${attractionIds}&locale=NO&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => setFeaturedEvents(data._embedded?.attractions))
            .catch(error => console.error("Something went wrong fetching events:", error))
    };

    /*
        - Funksjon som henter arrangementer fra Ticketmaster sin API basert på by
        - Funksjonen tar imot én parameter (city) - en spesifikk by i streng-format
        - Henter arrangementer i JSON-format ved hjelp av kall
        - Plasser hentede arrangementer i state (cityEvents)
    */
    const getEventsByCity = async(city) => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&size=10&locale=NO&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => setCityEvents(data._embedded?.events))
            .catch(error => console.error("Something went wrong fetching events:", error))
    };

    // Funksjon(er) kjøres når komponentet mountes (rendres)
    useEffect(() => {
        // Benytter "featuredEventsIds" som parameter
        getFeaturedEvents(featuredIds)

        // Benytter "city" som parameter
        getEventsByCity(city)

        // Oppdateres med utgangspunkt i variabelen "city"
    }, [city]);

    return (
        <>
            <section className="hero-section">
                
            </section>

            <section className="featured-events-section">
                {/* Sender med state (featuredEvents) som prop */}
                <EventCards events={featuredEvents} isFeatured={true} />
            </section>

            <section className="city-events-section">
                <h2>Arrangementer i {city}</h2>
                <EventCards events={cityEvents} />
            </section>
        </>
    )
}