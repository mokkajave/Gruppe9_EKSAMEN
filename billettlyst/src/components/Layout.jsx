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
                <p>Website &copy; 2025 </p>
            </footer>
        </>
    )
}