import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { fetchAllSanityEvents, fetchAllSanityUsers } from "../sanityComponents/fetches";
import "../styles/dashboard.scss";

export default function Dashboard() {
    const [sanityUsers, setSanityUsers] = useState([]);
    const [sanityEvents, setSanityEvents] = useState([]);
  
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

            <h2>Attraksjoner</h2>
            <section className="sanity-events">
                    {sanityEvents.map((sanityEvent, index) => (
                        <article className="sanity-event-card" key={index}>
                        <h2>{sanityEvent?.title}</h2>
                        </article>))}
            </section>

            <h2>Brukere</h2>
            <section className="sanity-users">
                    {sanityUsers?.map((sanityUser, index) => (
                        <article className="sanity-user-card" key={index}>
                        <img src={sanityUser?.image?.asset?.url} alt="user-image"/>
                        <h2>{sanityUser?.name}</h2>
                        <ul>Whishlist</ul>
                        <ul>Previous Purchases</ul>
                        </article>))}
            </section>
        </section>
    )
}