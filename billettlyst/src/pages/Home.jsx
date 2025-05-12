import { useEffect, useState } from "react";

import EventCards from "../components/EventCards";

import "../styles/home.scss";
import Heading from "../components/Heading";
import CityButtons from "../components/CityButtons";

export default function Home() {
    // useState-hook som tar imot og holder på utvalgte arrangement(er)
    const [featuredEvents, setFeaturedEvents] = useState([]);

    // useState-hook som tar imot og holder på arrangement(er) i en spesifikk storby
    const [cityEvents, setCityEvents] = useState([]);

    // useState-hook som tar imot og holder på en spesifikk storby
    const [city, setCity] = useState("Oslo");

    // En variabel som inneholder en array (liste) med bynavn
    const cities = ["Oslo", "Stockholm", "Berlin", "London", "Paris"]

    // En variabel som inneholder ID-er for utvalgte arrangementer/festivaler
    const featuredIds = "K8vZ917_YJf,K8vZ917K7fV,K8vZ917oWOV,K8vZ917bJC7";

    /* 
        - Funksjon som henter attraksjoner fra Ticketmaster sin API basert på ID
        - Funksjonen tar imot én parameter (eventIds) - arrangement-ID-er
        - Henter attraksjoner i JSON-format ved hjelp av kall
        - Plasserer hentede attraksjoner i state (featuredEvents)
    */
    const getFeaturedEvents = async(attractionIds) => {
        fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?id=${attractionIds}&locale=NO&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => setFeaturedEvents(data?._embedded?.attractions))
            .catch(error => console.error("Something went wrong fetching events:", error))
    };

    /*
        - Funksjon som henter arrangementer fra Ticketmaster sin API basert på by
        - Funksjonen tar imot én parameter (city) - en spesifikk by i streng-format
        - Henter arrangementer i JSON-format ved hjelp av kall
        - Plasserer hentede arrangementer i state (cityEvents)
    */
    const getEventsByCity = async(city) => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&size=10&locale=*&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => setCityEvents(data?._embedded?.events))
            .catch(error => console.error("Something went wrong fetching events:", error))
    };

    // Funksjon(er) kjøres når komponentet mountes (rendres)
    useEffect(() => {
        // Benytter "featuredEventsIds" som parameter
        getFeaturedEvents(featuredIds)
    }, []);

    useEffect(() => {
        // Benytter "city" som parameter
        getEventsByCity(city)

        // Oppdateres ved endring i variabelen "city"
    }, [city])

    return (
        <>
            <section className="hero-section">
                
            </section>

            <section className="featured-events-section">
                <Heading variant="h1">Utvalgte festivaler</Heading>
                
                {/* Sender med state (featuredEvents) som prop */}
                <EventCards events={featuredEvents} variant="interactive" />
            </section>

            <section className="events-section">
                <Heading variant="h2">Se hva som skjer</Heading>

                <section className="city-buttons-section content-container">
                    {cities.map(cityName => (
                        <CityButtons key={cityName} cityName={cityName} setCity={setCity} />
                    ))}
                </section>

                <Heading variant="h3">Arrangementer i {city}</Heading>

                {/* Sender med state (cityEvents) som prop */}
                <EventCards events={cityEvents} />
            </section>
        </>
    )
}