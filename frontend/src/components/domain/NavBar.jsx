//TODO update routing
//change classnames to "active" for active links

export const NavBar = () => {
    return <> 
        <nav class="navbar navbar-expand-lg sticky-top bg-light">
            <div class="container-fluid">
                {/* change route to go back to dashboard*/}
                <a class="navbar-brand fw-bold" href="#">Roommate Finder</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        {/*update routes*/}
                        <a class="nav-link" href="#">Your Requests</a>
                        <a class="nav-link" href="#">Your Roommates</a>




                        <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Your Account
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Edit Profile</a></li>
                                <li><a class="dropdown-item" href="#">View Profile</a></li>
                                <li><a class="dropdown-item" href="#">Sign Out</a></li>
                            </ul>
                        </div>


                        
                        
                    </div>
                </div>
            </div>
        </nav>
    </>
};