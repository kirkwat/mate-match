import { Menu } from "../common/Menu";

export const HomepageNotLogged = () => {
    return <>
        <div class="jumbotron bg-light mx-5 rounded-3 pb-5">
            <h1 class="display-4 d-flex align-items-center justify-content-center mb-5">Roomate Finder</h1>
            <p class="lead d-flex align-items-center justify-content-center mb-5 mx-5 fs-4">
                Looking for roomates(s) and don't know where to start? Roomate Finder allows you to create a profile and be automatically given a list 
                of people that are similar to you.
            </p>
            <div class="d-grid gap-5 col-6 mx-auto">
                <label htmlFor="button" className="me-2 fs-4">Signup now for free!</label>
                <button type = "button" className = "btn btn-primary btn-lg">Sign up</button>
                <label htmlFor="button" className="me-2 fs-4">Already have an account?</label>
                <button type = "button" className = "btn btn-primary btn-lg">Log in</button>
            </div>
        </div>
    </>;
}
