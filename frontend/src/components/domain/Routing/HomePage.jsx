import { Link } from "react-router-dom";
import { PlainNavBar } from "../../common";

export const HomePage = () => {
    return <>
        <PlainNavBar/>
        <div className="container pt-4 pb-5">
            <div className="bg-light rounded p-3 p-md-5 pb-4 mb-4">
                <h1 className="display-4 d-flex align-items-center justify-content-center mb-5">Roomate Finder</h1>
                <p className="lead d-flex align-items-center justify-content-center mb-5 mx-5 fs-4">
                    Looking for roomates(s) and don't know where to start? Roomate Finder allows you to create a profile and be automatically given a list 
                    of people that are similar to you.
                </p>
                <div className="d-grid gap-5 col-6 mx-auto">
                    <label htmlFor="button" className="d-grid gap-5 col-6 mx-auto fs-4">Signup now for free!</label>
                    <Link to={ `register` }>
                        <button type = "button" className = "d-grid gap-5 col-6 mx-auto btn btn-primary btn-lg">Sign up</button>
                    </Link>
                    <label htmlFor="button" className="d-grid gap-5 col-6 mx-auto fs-4">Already have an account?</label>
                    <Link to={ `login` }>
                        <button type = "button" className = "d-grid gap-5 col-6 mx-auto btn btn-primary btn-lg">Log in</button>
                    </Link>
                </div>
            </div>
        </div>
    </>;
}