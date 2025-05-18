import { Link, useLocation } from "react-router-dom";
import "../styles/nav.scss";
import { useState } from "react";


export default function Nav() {
    //useLocation brukes til å hente den nåværende slugen og pathname brukes for å sjekke om denne er "/dashboard". 
    //Om den er dette vil en ternary operator styre hvilken knapp som vises. 
    //KILDER useLocation:https://reactrouter.com/api/hooks/useLocation , pathname:https://www.w3schools.com/Jsref/prop_loc_pathname.asp
    const location = useLocation();
    const dashboardActive = location.pathname === "/dashboard";

    const [menu, setMenu] = useState(false);

    const toggleMenu = () => {
        setMenu(!menu);
    };

    const handleLink = () => {
        setMenu(false);
    };

    return (
        <nav className="content-container">
            <div className="logo-ham">
                <span class="material-symbols-outlined ham-menu-button" onClick={toggleMenu}>menu</span>
                <Link to="/" id="logo">BillettLyst</Link>
            </div>

            <ul className={`nav-links ${menu ? "open" : ""}`}>
                <li><Link to="/" className="nav-link" onClick={handleLink}>Hjem</Link></li>
                <li><Link to="/category/music" className="nav-link" onClick={handleLink}>Musikk</Link></li>
                <li><Link to="/category/sport" className="nav-link" onClick={handleLink}>Sport</Link></li>
                <li><Link to="/category/theater" className="nav-link" onClick={handleLink}>Teater</Link></li>
            </ul>
            
            {dashboardActive ? (
                <Link to="/" className="nav-link nav-link-button">Logg ut</Link>
            ) : (
                <Link to="/login" className="nav-link nav-link-button">Logg inn</Link>
            )}
        </nav>
    )
}