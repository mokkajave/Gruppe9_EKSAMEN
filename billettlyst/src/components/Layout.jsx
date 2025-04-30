import Nav from "./Nav";

import "../styles/layout.scss";

export default function Layout({children}) {
    return (
        <>
            <header className="grid">
                <Nav />
            </header>
            <main>
                {children}
            </main>
            <footer>

            </footer>
        </>
    )
}