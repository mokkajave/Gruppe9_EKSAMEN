import EventCard from "./EventCard";

import "../styles/home.scss";

export default function Home() {
    return (
        <>
            <section>
                <h1>Home</h1>
            </section>
            <section className="event-cards-section grid">
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
            </section>
        </>
    )
}