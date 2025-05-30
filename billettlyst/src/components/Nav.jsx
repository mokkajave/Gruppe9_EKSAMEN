import { Link, useLocation } from "react-router-dom";
import "../styles/nav.scss";
import { useState } from "react";


export default function Nav() {
    //useLocation brukes til å hente den nåværende slugen og pathname brukes for å sjekke om denne er "/dashboard". 
    //Om den er dette vil en ternary operator styre hvilken knapp som vises. 
    //KILDER useLocation:https://reactrouter.com/api/hooks/useLocation , pathname:https://www.w3schools.com/Jsref/prop_loc_pathname.asp
    const location = useLocation();
    const dashboardActive = location.pathname === "/dashboard" || location.pathname.includes("/sanity-event");



    const [menu, setMenu] = useState(false);

    // Når element trykkes, skjer det motsatte av state (menu) - true <=> false
    const toggleMenu = () => {
        setMenu(!menu);
    };

    // Setter state (menu) til false, for å lukke menyen ved hvert klikk. 
    // Slipper at menyen blir værende på siden som et uromoment
    const handleLink = () => {
        setMenu(false);
    };

    return (
        <nav className="content-container">
            <div className="logo-ham">
                <span className="material-symbols-outlined ham-menu-button" onClick={toggleMenu}>menu</span>
                <Link to="/" id="logo">BillettLyst</Link>
            </div>

            {/* Meny som vises på desktop */}
            <ul>
                <li><Link to="/" className="nav-link">Hjem</Link></li>
                <li><Link to="/category/music" className="nav-link">Musikk</Link></li>
                <li><Link to="/category/sport" className="nav-link">Sport</Link></li>
                <li><Link to="/category/theater" className="nav-link">Teater</Link></li>
            </ul>

            {/* Meny som vises på mobil og tablet (Hamburgermeny) */}
            <ul className={`nav-links ${menu ? "open" : ""}`}>
                <li><Link to="/" className="nav-link" onClick={handleLink}>Hjem</Link></li>
                <li><Link to="/category/music" className="nav-link" onClick={handleLink}>Musikk</Link></li>
                <li><Link to="/category/sport" className="nav-link" onClick={handleLink}>Sport</Link></li>
                <li><Link to="/category/theater" className="nav-link" onClick={handleLink}>Teater</Link></li>
            </ul>
            
            {dashboardActive ? (
                <Link to="/login" className="nav-link nav-link-button">Logg ut</Link>
            ) : (
                <Link to="/login" className="nav-link nav-link-button">Logg inn</Link>
            )}
        </nav>
    )
}