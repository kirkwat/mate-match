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
              <div className="card">
                <div className="card-image">
                  <img
                    src={
                      result.photoID ? result.photoID : "/images/default.jpg"
                    }
                    alt="avatar"
                    className="card-img-top"
                  />
                </div>
                <div className="card-body">
                  <div className="card-title fw-bold fs-4">
                    {result.name}
                    <span className="mt-1 fs-5 fw-light text-muted float-end">
                      {result.city} - {result.age}
                    </span>
                  </div>
                  <Link
                    to={`/${result.email}/profile`}
                    className="btn btn-primary"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
