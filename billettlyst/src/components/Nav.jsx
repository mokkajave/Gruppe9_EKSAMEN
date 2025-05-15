import { Link, useLocation, useParams } from "react-router-dom";

import "../styles/nav.scss";

export default function Nav() {
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
                <Link to="/dashboard" className="nav-link nav-link-button">Logg ut</Link>
            ) : (
                <Link to="/login" className="nav-link nav-link-button">Logg inn</Link>
            )}
        </nav>
    )
}