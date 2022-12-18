import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../../../hooks";

export const NavBar = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-md sticky-top navbar-dark bg-dark shadow">
        <div className="container-fluid">
          <Link to={`dashboard`} className=" navbar-brand fw-bold">
            <img src="/images/branding.png" alt="Mate Match" id="nav-image" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <NavLink to={`requests`} className="nav-link">
                Your Requests
              </NavLink>
              <NavLink to={`roommates`} className="nav-link">
                Your Roommates
              </NavLink>
              <div className="nav-item dropdown-center">
                <div
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Your Account
                </div>
                <ul id="navbar-dropdown" className="dropdown-menu m-0">
                  <li className="ps-3 pe-4">
                    <Link
                      to={`profile/edit`}
                      className="dropdown-item py-0 px-0"
                    >
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="ps-3 pe-4">
                    <Link to={`profile`} className="dropdown-item py-0 px-0">
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="ps-3 pe-4">
                    <button
                      className="dropdown-item py-0 px-0"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
