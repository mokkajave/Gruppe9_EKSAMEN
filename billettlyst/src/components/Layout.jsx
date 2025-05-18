import Nav from "./Nav";
import "../styles/layout.scss";


export default function Layout({children}) {
    return (
        <>
            <header>
                <Nav />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>Website &copy; 2025 Innhold levert av: <a href="https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/">Ticketmaster API</a></p>
                <p>Applikasjonen samler ikke inn brukerdata, ei heller bruker dette til tredjeparts tjenester</p>
            </footer>
        </>
    )
}