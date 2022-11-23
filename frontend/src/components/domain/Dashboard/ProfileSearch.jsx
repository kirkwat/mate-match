//TODO update changes to handle all filters combined
//currently filters can only be used one at a time
//TODO add gender filter

import {useState} from "react";
import { SearchField, CheckBoxDropdown } from "../../common";

export const ProfileSearch = ({ profiles, setSearchResults}) => { 

    const [ lifestylePref, setLifestylePref ] = useState({"Night-owl":false,"Early-bird":false,"Smoke-free":false,"Pet-friendly":false});
    const [ propertyPref, setPropertyPref ] = useState({"House":false,"Apartment":false,"Condo":false});
    const [ agePref, setAgePref ] = useState({"18-23":false,"24-29":false,"30+":false});

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(profiles);

        setSearchResults(profiles.filter(profile => 
            profile.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 ||
            profile.city.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0));
    }

    const handleLifestyleToggle = (e) => {
        setLifestylePref(e);
        //remove false attributes
        const filters=Object.keys(e).reduce((o, key) => {
            e[key] === true && (o[key] = e[key]);
            return o;
        }, {});

        const results=profiles.filter(profile => { 
            let filterCheck=true;
            Object.keys(filters).map((label) => {
                if(profile[label]!==true){
                    filterCheck = false;
                }
            })
            return filterCheck;
        });
        setSearchResults(results);
    }

    const handlePropertyToggle = (e) => {
        setPropertyPref(e);
        //remove false attributes
        const filters=Object.keys(e).reduce((o, key) => {
            e[key] === true && (o[key] = e[key]);
            return o;
        }, {});

        const results=profiles.filter(profile => { 
            let filterCheck=true;
            Object.keys(filters).map((label) => {
                if(profile[label]!==true){
                    filterCheck = false;
                }
            })
            return filterCheck;
        });
        setSearchResults(results);
    }

    const handleAgeToggle = (e) => {
        setAgePref(e);
        //remove false attributes
        const filters=Object.keys(e).reduce((o, key) => {
            e[key] === true && (o[key] = e[key]);
            return o;
        }, {});

        const results=profiles.filter(profile => { 
            let filterCheck=true;
            Object.keys(filters).map((label) => {
                if(label==="18-23"){
                    if(18>=profile.age||profile.age>=23) filterCheck=false;
                }
                else if(label==="24-29"){
                    if(24>=profile.age||profile.age>=29) filterCheck=false;
                }
                else if(label==="30+"){
                    if(30>=profile.age) filterCheck=false;
                }
            })
            return filterCheck;
        });
        setSearchResults(results);
    }
    
    return <>
        <h1>Profile Explorer</h1>
        <div className="d-flex flex g-3">
            <SearchField onChange={handleSearchChange}/>
            <div className="ms-3">
                <CheckBoxDropdown dd_label="Lifestyle " 
                        options={lifestylePref} 
                        setValues={handleLifestyleToggle}/>
            </div>
            <div className="ms-3">
                <CheckBoxDropdown dd_label="Property " 
                        options={propertyPref} 
                        setValues={handlePropertyToggle}/>
            </div>
            <div className="ms-3">
                <CheckBoxDropdown dd_label="Age " 
                        options={agePref} 
                        setValues={handleAgeToggle}/>
            </div>
        </div>
        <hr/>
    </>;
};