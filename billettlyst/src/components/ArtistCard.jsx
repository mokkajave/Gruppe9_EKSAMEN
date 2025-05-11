import "../styles/artistCard.scss";

export default function ArtistCard({artist}) {
    return (
        <article className="artist-card">
            <img src={artist?.images[1]?.url} alt="artist-image" />
            <h3>{artist?.name}</h3>
        </article>
    )
}