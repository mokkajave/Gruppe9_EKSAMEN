import { useParams } from "react-router-dom";

import "../styles/categoryPage.scss";

export default function CategoryPage() {
    const {slug} = useParams()

    const backgroundImages = {
        musikk: "#",
        sport: "#",
        teater: "#"
    }

    const backgroundImage = backgroundImages[slug];

    return (
        <section className="category-hero-section">
            <h1>{slug.charAt(0).toUpperCase() + slug.slice(1)}</h1>
        </section>
    )
}