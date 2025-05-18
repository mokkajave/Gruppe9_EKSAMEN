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

    // Brukerens valgte dato, land og by i filtrering-form
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("Norge");
    const [selectedCity, setSelectedCity] = useState("");

    // Alternativer som benyttes i filtrering av innhold - på by og land
    const cities = ["Oslo", "Stockholm", "Berlin", "London", "Paris"]

    const countries = {
        Norge: "NO",
        Sverige: "SE",
        Tyskland: "DE",
        Frankrike: "FR",
        Spania: "ES"
    };

    /*  
        Siden API-et ikke forstår land som Norge, men landskoder som "NO" - 
        henter vi ut landskodene lagret under hvert lands-navn over. Navnene er tenkt å skulle
        velges av bruker i form, som så omgjøres til en countryCode - som så kan benyttes i fetching.
    */
    const code = countries[selectedCountry]

    /*
        - Funskjon som henter innhold fra Ticketmaster sin API på slug
        - "suggest" henter alt som inneholder slug-ens verdi - i dette tilfelle kategori
            - Attraksjoner, arrangementer, spillesteder, osv.
        - Plasserer hentet informasjon i state-er (attractions, events og venues)
    */
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

    /*
        - Funksjon som henter innhold fra API basert på slug og søk
        - Benytter state (search) for å hente ut innhold på det brukeren skriver
            - Dette håndteres med en onChange (se under), som kalles ved hvert tastetrykk
        - Funksjonene kjøres når brukeren trykker på knapp (submit-er form)
    */
    const handleSearch = async(e) => {
        // Eksempel: "keyword=findings+music"
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

    /*
        - En funskjon som benytter sjanger (slug), landskode, dato og by for uthenting av innhold
        - Skriver "T00:00:00" bak valgt dato i forsøk om å oppnå riktig format
    */
    const handleFilter = async(e) => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${slug}&countryCode=${code}&startDateTime=${selectedDate}T00:00:00Z&city=${selectedCity}&apikey=nwV2iLAvNoKVuQiXYNyXE1lHAr9P850o`)
            .then(response => response.json())
            .then(data => {
                setAttractions(data?._embedded?.attractions)
                setEvents(data?._embedded?.events)
                setVenues(data?._embedded?.venues)
                setSearch("")
            })
            .catch(error => console.error("Something went wrong fetching search", error));
    };

    const handleSubmit = (e) => {
        // Hindrer "default" atferd - i dette tilfelle at siden reloades
        e.preventDefault();
    };

    // Håndterer endring av (noe)
    const handleChange = (e) => {
        // Setter state (search) verdien til å være det brukeren skriver (onChange)
        setSearch(e.target.value);
    };

    /*
        - En funksjon (callback) som håndterer et event (klikk, scroll, etc.)
        - Funksjonen (handleAddToWishlist) håndterer et klikk på knapp i EventCard
        - Funksjonen sjekker etter tilstedeværelse ved å sammenligne ID-er som allerede
        ligger i state (wishlist) med ID-en til det aktuelle elementet (event)
    */
    const handleAddToWishlist = (event) => {
        const exist = wishlist.find((item) => item.id === event.id)

        // Når knappen trykkes, sjekker funksjonen om "event" eksisterer i state (wishlist)
        setWishlist((prev) => 
            exist ? 
                // Ligger "event" i listen, blir den filtrert ut - fjernet
                prev.filter((item) => item.id !== event.id)
                // Ligger "event" ikke i listen, blir den lagt til (setWishlist)
                : [...prev, event]
        );

        //console.log("Event i liste?:", exist)
    }

    // getEvents() kjøres ved første mount, og deretter ved endring i slug
    useEffect(() => {
            getEvents()
        }, [slug]);

    /*useEffect(() => {
        console.log("Event i liste?:", wishlist)
    }, [wishlist])*/

    // Eventuelle endringer i "hero-section": skifte farge/bilde?
    const backgroundImages = {
        musikk: "#",
        sport: "#",
        teater: "#"
    }

    const backgroundImage = backgroundImages[slug];

    return (
        <>
            <section className="search-section">

                {/* Filtreringsform */}
                <Heading variant="h1">Filtrert søk</Heading>
                <form className="filter-form content-container" onSubmit={handleSubmit}>
                    <div className="filter-form-details">
                        <label>Dato:</label>
                        <input type="date" 
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)} 
                        />

                        <label htmlFor="country">Land:</label>
                        <select value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}>
                            {/* Valgte å skrive manuelt over mapping */}
                            <option value="Norge">Norge</option>
                            <option value="Sverige">Sverige</option>
                            <option value="Tyskland">Tyskland</option>
                            <option value="Frankrike">Frankrike</option>
                            <option value="Spania">Spania</option>
                        </select>
                    
                        <label htmlFor="city">By:</label>
                        <select value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}>
                            {cities?.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <button onClick={handleFilter}>Filtrer</button>
                </form>
                
                {/* Søkeform */}
                <Heading variant="h2">Søk</Heading>
                <form className="search-form content-container" onSubmit={handleSubmit}>
                    <label htmlFor="search">Søk etter arrangement, attraksjon eller spillested!</label>
                    <div className="search-form-details">
                        <input 
                            type="search" 
                            id="search"
                            value={search}
                            onChange={handleChange}
                            placeholder="Skriv søkeord..."
                        />
                        <button onClick={handleSearch}>Søk</button>
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
                    addToWishlist={handleAddToWishlist}
                />
            </section>

            {/* Arrangementer */}
            <section className="events-section">
                <Heading variant="h2">Arrangementer</Heading>

                <EventCards 
                    events={events} 
                    variant="category"
                    wishlist={wishlist}
                    addToWishlist={handleAddToWishlist}
                />
            </section>

            {/* Spillesteder */}
            <section className="events-section">
                <Heading variant="h2">Spillesteder</Heading>

                <EventCards 
                    events={venues} 
                    variant="venue"
                    wishlist={wishlist}
                    addToWishlist={handleAddToWishlist}
                />
            </section>
        </>
    )
}