//TODO update routing
//change classnames to "active" for active links

export const NavBar = () => {
    return <> 
        <nav className="navbar navbar-expand-md sticky-top bg-light">
            <div className="container-fluid">
                {/* change route to go back to dashboard*/}
                <a className="navbar-brand fw-bold" href="#">Roommate Finder</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {/*update routes*/}
                        <a className="nav-link" href="#">Your Requests</a>
                        <a className="nav-link" href="#">Your Roommates</a>

                        <div className="nav-item dropdown-center">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                Your Account
                            </a>
                            <ul className="dropdown-menu">
                                {/*update routes*/}
                                <li><a className="dropdown-item py-0 ps-3" href="#">Edit Profile</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item py-0 ps-3" href="#">View Profile</a></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item py-0 ps-3" href="#">Sign Out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>
};