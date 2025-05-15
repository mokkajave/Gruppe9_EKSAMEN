import { useParams } from "react-router-dom";

import "../styles/categoryPage.scss";
import Heading from "../components/Heading";

export default function CategoryPage() {
    const {slug} = useParams()

    const backgroundImages = {
        musikk: "#",
        sport: "#",
        teater: "#"
    }

    const backgroundImage = backgroundImages[slug];

    return (
        <>
            <section className="category-hero-section">
                <Heading variant="h1">{slug.charAt(0).toUpperCase() + slug.slice(1)}</Heading>
            </section>
            <section>
                <Heading variant="h2">Attraksjoner</Heading>
            </section>
            <section>
                <Heading variant="h2">Arrangementer</Heading>
            </section>
            <section>
                <Heading variant="h2">Spillesteder</Heading>
            </section>
        </>
    )
}