import { Link, useLocation } from "react-router-dom";
import "../styles/nav.scss";


export default function Nav() {
    //useLocation brukes til å hente den nåværende slugen og pathname brukes for å sjekke om denne er "/dashboard". 
    //Om den er dette vil en ternary operator styre hvilken knapp som vises. 
    //KILDER useLocation:https://reactrouter.com/api/hooks/useLocation , pathname:https://www.w3schools.com/Jsref/prop_loc_pathname.asp
    const location = useLocation();
    const dashboardActive = location.pathname === "/dashboard";

    return (
        <nav className="content-container">
            <Link to="/" id="logo">BillettLyst</Link>
            <ul>
                <li><Link to="/" className="nav-link">Hjem</Link></li>
                <li><Link to="/category/music" className="nav-link">Musikk</Link></li>
                <li><Link to="/category/sport" className="nav-link">Sport</Link></li>
                <li><Link to="/category/theater" className="nav-link">Teater</Link></li>
            </ul>
            {dashboardActive ? (
                <Link to="/" className="nav-link nav-link-button">Logg ut</Link>
            ) : (
                <Link to="/login" className="nav-link nav-link-button">Logg inn</Link>
            )}
        </nav>
    )
}