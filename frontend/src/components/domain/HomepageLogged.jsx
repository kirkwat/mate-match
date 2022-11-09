import { useState, useEffect } from "react";

export const HomepageLogged = () => {
    const [profiles, setProfiles] = useState(undefined); //will store list of profiles from api

    useEffect(() => {
        //Get list of matching profiles from db
    }, []);


    // if (!profiles) {
    //     return <>Loading...</>
    // }

    return <>
        <h2 id="homeViewHeading">Test</h2>
            <label htmlFor = "filter">Sort By</label>
                <select type="text" id="sortBy" name="sortBy">
                    <option></option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>

                <button type = "button" className= "menuButton" onClick={() => {}}>Menu</button>
                <div className ="menuContainer">
                    <div className = "menuHidden"  id="menuProfile" onClick={() => {}}>Sample profile</div>
                    <div className = "menuHidden"  id="menuLogin" onClick={() => {}}>Log in</div>
                    <div className = "menuHidden" id="menuSignup" onClick={() => {}}>Sign up</div>
                </div>

                <div className="profileCardContainer">
                    <template className="profileCardTemp">
                        <div className="profileCardDiv">
                            <img src="https://via.placeholder.com/100" alt="Profile pic"/>
                            <p id="profileCardName"></p>
                            <p id="profileCardLocation"></p>
                            <p id="profileCardGender"></p>
                            <p id="profileCardAge"></p>
                            <button type = "button" className = "reportButton">Report</button>
                        </div>
                    </template>
                </div>


    </>;



    }
