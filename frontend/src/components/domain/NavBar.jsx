//TODO update routing
//change classnames to "active" for active links

import { Link } from "react-router-dom";

export const NavBar = () => {
    return <> 
        <nav className="navbar navbar-expand-md sticky-top bg-light">
            <div className="container-fluid">
                <Link to={ `/dashboard` } className = "active">
                    <button type = "button" className="navbar-brand fw-bold">Roommate Finder</button>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {/*update routes*/}
                        <Link to={ `/RequestList` } className = "active">
                            <button type = "button" className="nav-link">Your Requests</button>
                        </Link>
                        <Link to={ `/roommate` } className = "active">
                            <button type = "button" className="nav-link">Your Roommates</button>
                        </Link>

                        <div className="nav-item dropdown-center">
                            <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown">
                                Your Account
                            </a>
                            <ul className="dropdown-menu">
                                <Link to={ `/profileEditor` } className = "active">
                                    <li><button type = "button" className="dropdown-item py-0 ps-3" >Edit Profile</button></li>
                                </Link>
                                

                                <li><hr className="dropdown-divider"/></li>
                                
                                <Link to={ `/profileDetails` } className = "active">
                                    <li><button className="dropdown-item py-0 ps-3" >View Profile</button></li>
                                </Link>

                                <li><hr className="dropdown-divider"/></li>

                                <Link to={ `/LoginPage` } className = "active">
                                    <li><button className="dropdown-item py-0 ps-3">Sign Out</button></li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
};