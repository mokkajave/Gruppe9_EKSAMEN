import { Link } from "react-router-dom";

import "../styles/nav.scss";

export default function Nav() {
    return (
        <nav>
            <Link to="/" id="logo">BillettLyst</Link>
            <ul>
                <li><Link to="/" className="nav-link">Hjem</Link></li>
                <li><Link to="#" className="nav-link">Musikk</Link></li>
                <li><Link to="#" className="nav-link">Sport</Link></li>
                <li><Link to="#" className="nav-link">Teater</Link></li>
            </ul>
            <Link to="/dashboard" className="nav-link nav-link-button">Logg inn</Link>
        </nav>
    )
}