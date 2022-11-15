//TODO update styling
export const ProfileList = ({ results }) => {

    if(results.length === 0) {
        return <>
            <h3>Profiles
                <span className="text-secondary"> ({results.length})</span>
            </h3>
            <p className="bg-light rounded p-3">No Matching Profiles</p>
        </>
    }

    return <>
        <h3>Profiles
            <span className="text-secondary"> ({results.length})</span>
        </h3>
        <div className="row g-3">
            {
                results.map((result, index) =>
                    <div key={index} className="col-md-6 col-xl-4">
                        <div className="card">
                            <img src="images/150.png" alt="default" className="card-img-top"/>
                            <div className="card-body">
                                <div className="card-title fw-bold fs-4">
                                    {result.name}
                                    <span className="mt-1 fs-5 fw-light text-muted float-end"> {result.city} - {result.age}</span>
                                </div>
                                <a href="#" className="btn btn-primary">View Profile</a>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </>;
};
