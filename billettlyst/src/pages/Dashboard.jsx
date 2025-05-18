import Heading from "../components/Heading";
import "../styles/dashboard.scss";
import { Link } from "react-router-dom";


export default function Dashboard( { sanityEvents, sanityUsers } ) {

    return (
        <section className="sanity-section">
            <Heading variant="h1">Min Side</Heading>

            <Heading variant="h2">Attraksjoner</Heading>
            <section className="sanity-events content-container grid">
                {sanityEvents?.map((sanityEvent, index) => (
                    <article className="sanity-event-card" key={index}>
                        <h2>{sanityEvent?.title}</h2>
                    </article>))}
            </section>

            <Heading variant="h2">Brukere</Heading>
            <section className="sanity-users content-container grid">
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