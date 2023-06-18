import { Link } from "react-router-dom";

export const ResultList = ({ results }) => {
  return (
    <>
      <h3>
        Profiles
        <span className="text-secondary"> ({results.length})</span>
      </h3>
      {results.length === 0 ? (
        <p className="bg-light rounded p-3">No Matching Profiles</p>
      ) : (
        <div className="row g-3">
          {results.map((result, index) => (
            <div key={index} className="col-md-6 col-xl-4">
              <div className="card card-height">
                <div className="card-image">
                  <img
                    src={
                      result.signedUrl
                        ? result.signedUrl
                        : "/images/default.jpg"
                    }
                    alt="avatar"
                    className="card-img-top"
                  />
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <div className="row">
                      <div className="col pe-0">
                        <div className="card-title fw-bold fs-4">
                          {result.name}
                        </div>
                      </div>
                      <div className="col ps-0">
                        <div className="my-1 fs-5 fw-light text-muted text-end">
                          {result.city} - {result.age}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link
                      to={`/${result.email}/profile`}
                      className="btn btn-primary btn-lg col-12"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
