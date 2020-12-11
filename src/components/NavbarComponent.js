import React, {useState} from 'react';
import {useAuthContext} from '../auth/AuthContext';
import {Link} from 'react-router-dom';

function NavbarComponent() {
    const {principal} = useAuthContext();
    const currLoc = window.location.pathname;
    const [mainNavItem, setMainNavItem] = useState(currLoc);

    function logout() {
        principal.reset();
        window.location = "/";

    }
    

    if (!principal.authenticated)
        return null;

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="/">Collector UI</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarToggle">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to="/secured/main" className={currLoc.startsWith("/secured/main") ? "nav-link active" : "nav-link"} onClick={() => {setMainNavItem("/secured/main")}}>Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/secured/data" className={currLoc.startsWith("/secured/data") ? "nav-link active" : "nav-link"} onClick={() => {setMainNavItem("/secured/data")}}>Data</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/secured/admin/users" className={currLoc.startsWith("/secured/admin") ? "nav-link active" : "nav-link"} onClick={() => {setMainNavItem("/secured/admin/users")}}>Admin</Link>
                        </li>
                    </ul>
                    <div class="d-flex">
                        Logged in as {principal.profile.username} [<a href="#" onClick={logout} class="link-primary">Logout</a>]
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarComponent;