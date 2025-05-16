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
            <section className="sanity-events">
                <h2>Attraksjoner</h2>
                <section className="sanity-event-card">
                    {sanityEvents.map((sanityEvent, index) => (
                        <article key={index}>
                        <h2>{sanityEvent?.title}</h2>
                        </article>))}
                </section>
                
            </section>
            <section className="sanity-users">
                <h2>Brukere</h2>
                <section className="sanity-user-card">
                    {sanityUsers.map((sanityUser, index) => (
                        <article key={index}>
                        <img src={sanityUser?.image?.asset?.url} alt="user-image"/>
                        <h2>{sanityUser?.name}</h2>
                        </article>))}
                </section>
            </section>
        </section>
    )
}