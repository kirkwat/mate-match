//TODO update styling
export const ProfileList = ({ results }) => {

    if(results.length === 0) {
        return <>
            <h3>Roommates
                <span className="text-secondary"> ({results.length})</span>
            </h3>
            <p className="bg-light rounded p-3">No Matching Profiles</p>
        </>
    }

    return <>
        <h3>Roommates
            <span className="text-secondary"> ({results.length})</span>
        </h3>
        <ul className="list-group list-group-horizontal">
            {
                results.map((result, index) =>
                    <div key={index} className="card mb-3 me-3 w-25">
                        <img src="images/150.png" alt="default" className="card-img-top"/>
                        <div className="card-body">
                            <div class="card-title fw-bold fs-4">
                                {result.name}
                                <span className="mt-1 fs-5 fw-light text-muted float-end"> {result.city} - {result.age}</span>
                            </div>
                            <a href="#" class="btn btn-primary">View Profile</a>
                        </div>
                    </div>
                )
            }
        </ul>
    </>;
};

/*
                        <div className="card-header fs-4 float-start">
                            {result.name}
                            <span className="mt-1 fs-5 float-end"> {result.city} - {result.age}</span>
                        </div>
*/