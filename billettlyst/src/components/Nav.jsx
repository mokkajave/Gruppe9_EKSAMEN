import { Link } from "react-router-dom";

import "../styles/nav.scss";

export default function Nav() {
    return (
        <nav className="content-container">
            <Link to="/" id="logo">BillettLyst</Link>
            <ul>
                <li><Link to="/" className="nav-link">Hjem</Link></li>
                <li><Link to="/category/musikk" className="nav-link">Musikk</Link></li>
                <li><Link to="/category/sport" className="nav-link">Sport</Link></li>
                <li><Link to="/category/teater" className="nav-link">Teater</Link></li>
            </ul>
            <Link to="/dashboard" className="nav-link nav-link-button">Logg inn</Link>
        </nav>
    )
}