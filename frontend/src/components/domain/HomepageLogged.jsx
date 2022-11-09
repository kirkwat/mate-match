import { useState, useEffect } from "react";

export const HomepageLogged = () => {
    const [profiles, setProfiles] = useState(undefined); //will store list of profiles from api

    useEffect(() => {
        //Get list of matching profiles from db
    }, []);


if (!profiles) {
    return <>Loading...</>
}

return <>
    <h2 id="homeViewHeading"></h2>
        <label for = "filter">Sort By</label>
            <select type="text" id="sortBy" name="sortBy">
                <option></option>
                <option>Option 1</option>
                <option>Option 2</option>
            </select>

            <button type = "button" class = "menuButton" onclick="app.home.toggleMenu()">Menu</button>
            <div class="menuContainer">
                <div class = "menuHidden"  id="menuProfile" onclick="app.profileView.load()">Sample profile</div>
                <div class = "menuHidden"  id="menuLogin" onclick="app.loginView.load()">Log in</div>
                <div class = "menuHidden" id="menuSignup" onclick="app.signupView.load()">Sign up</div>
            </div>

            <div class="profileCardContainer">
                <template class="profileCardTemp">
                    <div class="profileCardDiv">
                        <img src="https://via.placeholder.com/100" alt="Profile pic"/>
                        <p id="profileCardName"></p>
                        <p id="profileCardLocation"></p>
                        <p id="profileCardGender"></p>
                        <p id="profileCardAge"></p>
                        <button type = "button" class = "reportButton">Report</button>
                    </div>
                </template>
            </div>


</>;














}
