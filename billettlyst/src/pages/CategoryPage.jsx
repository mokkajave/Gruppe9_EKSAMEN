import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Heading from "../components/Heading";
import EventCards from "../components/EventCards";

import "../styles/categoryPage.scss";

export default function CategoryPage() {
    const {slug} = useParams()

    const [search, setSearch] = useState("");

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

    const handleSearch = async(e) => {
        e.preventDefault();

        fetch(`https://app.ticketmaster.com/discovery/v2/suggest?keyword=${search}+${slug}&locale=*&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => {
                setAttractions(data?._embedded?.attractions)
                setEvents(data?._embedded?.events)
                setVenues(data?._embedded?.venues)
                setSearch("")
            })
            .catch(error => console.error("Something went wrong fetching search", error));
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    /*
        - En funksjon (callback) som håndterer et event (klikk, scroll, etc.)
        - Funksjonen (handleClick) håndterer et klikk på knapp i EventCard
        - Når knappen trykkes, sjekker funksjonen om "event" ligger i state (wishlist)
            - Ligger "event" i listen, blir den filtrert ut - fjernet
            - Ligger "event" ikke i listen, blir den lagt til (setWishlist)
        - Funksjonen sjekker etter tilstedeværende ved å sammenligne ID-er som allerede
        ligger i state (wishlist) med ID-en til det aktuelle elementet (event)
    */
    const handleClick = (event) => {
        const exist = wishlist.find((item) => item.id === event.id)

        setWishlist((prev) => 
            exist ? 
                prev.filter((item) => item.id !== event.id)
                : [...prev, event]
        );

        //console.log("Event i liste?:", exist)
    }

    useEffect(() => {
            // Benytter "featuredEventsIds" som parameter
            getEvents()
        }, [slug]);

    /*useEffect(() => {
        console.log("Event i liste?:", wishlist)
    }, [wishlist])*/

    // Eventuelle endringer i "hero-section": skifte farge eller bilde?
    const backgroundImages = {
        musikk: "#",
        sport: "#",
        teater: "#"
    }

    const backgroundImage = backgroundImages[slug];

    const cities = ["Oslo", "Stockholm", "Berlin", "London", "Paris"]
    const countries = ["Norway", "Germany", "France", "Spain"];

    return (
        <>
            <section className="search-section">

                {/* Filtreringsform */}
                <Heading variant="h1">Filtrert søk</Heading>
                <form className="filter-form content-container">
                    <div className="filter-form-details">
                        <label>Dato:</label>
                        <input 
                            type="date"
                        />

                        <label htmlFor="country">Land:</label>
                        <select>
                            <option value="">Velg et land</option>
                            {countries?.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    
                        <label htmlFor="city">By:</label>
                        <select>
                            <option value="">Velg en by</option>
                            {cities?.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit">Filtrer</button>
                </form>
                
                {/* Søkeform */}
                <Heading variant="h2">Søk</Heading>
                <form className="search-form content-container" onSubmit={handleSearch}>
                    <label htmlFor="search">Søk etter arrangement, attraksjon eller spillested!</label>
                    <div className="search-form-details">
                        <input 
                            type="search" 
                            id="search"
                            value={search}
                            onChange={handleChange}
                            placeholder="Skriv søkeord..."
                        />
                        <button type="submit">Søk</button>
                    </div>
                </form>

            </section>

            {/* Attraksjoner */}
            <section className="events-section">
                <Heading variant="h2">Attraksjoner</Heading>

                <EventCards 
                    events={attractions} 
                    variant="category"
                    wishlist={wishlist}
                    addToWishlist={handleClick}
                />
            </section>

            {/* Arrangementer */}
            <section className="events-section">
                <Heading variant="h2">Arrangementer</Heading>

                <EventCards 
                    events={events} 
                    variant="category"
                    wishlist={wishlist}
                    addToWishlist={handleClick}
                />
            </section>

            {/* Spillesteder */}
            <section className="events-section">
                <Heading variant="h2">Spillesteder</Heading>

                <EventCards 
                    events={venues} 
                    variant="category"
                    wishlist={wishlist}
                    addToWishlist={handleClick}
                />
            </section>
        </>
    )
}