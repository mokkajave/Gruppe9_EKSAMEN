import Nav from "./Nav";

import "../styles/layout.scss";

export default function Layout({children}) {
    return (
        <>
            <header>
                <div className="content-container">
                    <Nav />
                </div>
            </header>
            <main>
                <div className="content-container">
                    {children}
                </div>
            </main>
            <footer>
                <div className="content-container">
                    <p>Website &copy; 2025 </p>
                </div>
            </footer>
        </>
    )
}