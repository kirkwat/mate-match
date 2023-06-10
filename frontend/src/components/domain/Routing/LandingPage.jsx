import { Link } from "react-router-dom";
import { PlainNavBar } from "../../common";

export const LandingPage = () => {
  return (
    <>
      <PlainNavBar />
      <header className="masthead">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="text-center text-white">
                <h1 className="mb-5">Find your new roommates today!</h1>
                <div className="col-auto">
                  <Link
                    to={`register`}
                    className="btn btn-success btn-lg"
                    id="submitButton"
                    type="submit"
                    data-testid="create-account-button"
                  >
                    Create your Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="features-icons bg-light text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="bi-person-vcard m-auto text-primary"></i>
                </div>
                <h3 className="fw-bold">Create your Profile</h3>
                <p className="lead mb-0">
                  Describe yourself and what you're looking for in a roommate.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="bi-people-fill m-auto text-primary"></i>
                </div>
                <h3 className="fw-bold">Explore Potential Roommates</h3>
                <p className="lead mb-0">
                  Find people that match your lifestyle and needs.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                <div className="features-icons-icon d-flex">
                  <i className="bi-person-plus-fill m-auto text-primary"></i>
                </div>
                <h3 className="fw-bold">Send Roommate Requests</h3>
                <p className="lead mb-0">
                  Reach out to people that you're interested in living with.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="showcase mb-5">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-lg-6 order-lg-2 text-white showcase-img1"></div>
            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
              <h2 className="fw-bold">Looking for Roommates?</h2>
              <p className="lead mb-0">
                Mate Match allows you to connect with people your age and gender
                that have similar personalities and lifestyles.
              </p>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 text-white showcase-img2"></div>
            <div className="col-lg-6 my-auto showcase-text">
              <h2 className="fw-bold">Discover People with Ease</h2>
              <p className="lead mb-0">
                Search for users who need roommates and are located in your
                area.
              </p>
            </div>
          </div>
          <div className="row g-0">
            <div className="col-lg-6 order-lg-2 text-white showcase-img3"></div>
            <div className="col-lg-6 order-lg-1 my-auto showcase-text">
              <h2 className="fw-bold">Perfect for Adulting</h2>
              <p className="lead mb-0">
                Mate Match is the ideal app for college students or anyone
                leaving the nest.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
