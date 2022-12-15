import { Link } from "react-router-dom";

export const PlainNavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to={`/`} className=" navbar-brand fw-bold">
            <img src="/images/branding.png" alt="Mate Match" id="nav-image" />
          </Link>
        </div>
      </nav>
    </>
  );
};
