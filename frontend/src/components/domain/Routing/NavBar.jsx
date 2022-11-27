//TODO change classnames to "active" for active links
import { Link, NavLink } from "react-router-dom";

export const NavBar = () => {
    return <> 
        <nav className="navbar navbar-expand-md sticky-top bg-light">
            <div className="container-fluid">
                <Link to={`dashboard`} className=" navbar-brand fw-bold">
                        Roommate Finder
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink to={`requests`} className="nav-link" activeClassName="nav-link active">
                            Your Requests
                        </NavLink>
                        <NavLink to={`roommates`} className="nav-link" activeClassName="nav-link active">
                            Your Roommates
                        </NavLink>
                        <div className="nav-item dropdown-center">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                Your Account
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to={`profile/edit`} className="dropdown-item py-0 ps-3">
                                        Edit Profile
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider"/></li>
                                <li>
                                    <Link to={`profile`} className="dropdown-item py-0 ps-3">
                                        View Profile
                                    </Link>
                                </li>
                                <li><hr className="dropdown-divider"/></li>
                                <li>
                                    <Link to={`logout`} className="dropdown-item py-0 ps-3">
                                        Sign Out
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
};