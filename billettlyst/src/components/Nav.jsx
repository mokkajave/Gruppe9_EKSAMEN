import { Link } from "react-router-dom";

import "../styles/nav.scss";

export default function Nav() {
    return (
        <nav>
            <Link to="/" id="logo">BilletLyst</Link>
            <ul>
                <li><Link to="/">Hjem</Link></li>
                <li><Link to="#">Musikk</Link></li>
                <li><Link to="#">Sport</Link></li>
                <li><Link to="#">Teater</Link></li>
            </ul>
            <Link to="/dashboard">Logg inn</Link>
        </nav>
    )
}