import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { fetchAllSanityEvents, fetchAllSanityUsers } from "../sanityComponents/fetches";
import "../styles/dashboard.scss";
import EventCards from "../components/EventCards";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";


export default function Dashboard() {
    const [sanityUsers, setSanityUsers] = useState([]);
    const [sanityEvents, setSanityEvents] = useState([]);
    const [featuredEvents, setFeaturedEvents] = useState([]);
  
    const getAllSanityUsers = async () => {
        const data = await fetchAllSanityUsers();
        setSanityUsers(data);
    };

    const getAllSanityEvents = async () => {
        const data = await fetchAllSanityEvents();
        setSanityEvents(data);
    };
      
    useEffect(() => {
        getAllSanityUsers();
    }, []);

    useEffect(() => {
        getAllSanityEvents();
    }, []);

    return (
        <section className="user-section">
            <Heading variant="h1">Min Side</Heading>

            <Heading variant="h2">Attraksjoner</Heading>
            <section className="sanity-events grid">
                {sanityEvents?.map((sanityEvent, index) => (
                    <article className="sanity-event-card" key={index}>
                        <h2>{sanityEvent?.title}</h2>
                    </article>))}
            </section>

            <Heading variant="h2">Brukere</Heading>
            <section className="sanity-users grid">
                {sanityUsers?.map((sanityUser, index) => (
                    <article className="sanity-user-card" key={index}>
                        <img src={sanityUser?.image?.asset?.url} alt="user-image"/>
                        <h2>{sanityUser?.name}</h2>
                        <h3>Ønskeliste</h3>
                        <ul>
                            {sanityUser?.wishlist?.map((event, index) => (
                                <li key={index}><Link to={`/sanity-event/${event.apiid}`}>{event.title}</Link></li>
                            ))}
                        </ul>
                        <h3>Tidligere kjøp</h3>
                        <ul>
                            {sanityUser?.previous_purchases?.map((event, index) => (
                                <li key={index}><Link to={`/sanity-event/${event.apiid}`}>{event.title}</Link></li>
                            ))}
                        </ul>
                    </article>))}
            </section>
        </section>
    )
}