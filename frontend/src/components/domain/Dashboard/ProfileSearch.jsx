//TODO update checkboxdropdown to handle objects instead of arrays

import {useState} from "react";
import { SearchField, CheckBoxDropdown } from "../../common";

export const ProfileSearch = ({ profiles, setSearchResults}) => { 

    //const lifestyle_labels=["Night-owl","Early-bird","Smoke-free","Pet-friendly"];
    //const [ lifestylePref, setLifestylePref ] = useState([false,false,false,false]);

    //const lifestyle_labels=["Night-owl","Early-bird","Smoke-free","Pet-friendly"];
    const [ lifestylePref, setLifestylePref ] = useState({"Night-owl":false,"Early-bird":false,"Smoke-free":false,"Pet-friendly":false});

    //const property_labels=["House","Apartment","Condo"];
    //const [ propertyPref, setPropertyPref ] = useState([false,false,false]);
    const [ propertyPref, setPropertyPref ] = useState({"House":false,"Apartment":false,"Condo":false});


    //const age_labels=["18-23","24-29","30+"];
    //const [ agePref, setAgePref ] = useState([false,false,false]);
    const [ agePref, setAgePref ] = useState({"18-23":false,"24-29":false,"30+":false});

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(profiles);

        setSearchResults(profiles.filter(profile => 
            profile.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 ||
            profile.city.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0));
    }

    const handleToggle = (e) => {
        console.log("e",e);
        setLifestylePref(e);
        console.log("life",lifestylePref);
        //remove false attributes
        const filters=Object.keys(e).reduce((o, key) => {
            e[key] === true && (o[key] = e[key]);
            return o;
        }, {});

        //loop through profiles
        //loop through result attributes in profile
        //if a result is not equal to result attribute, remove it
        console.log("filter",filters);
        console.log("profiles",profiles);

        const results=profiles.filter(profile => { 
            let filterCheck=true;
            Object.keys(filters).map((label) => {
                if(profile[label]!==true){
                    console.log("name",profile.name)
                    filterCheck = false;
                }
            })
            return filterCheck;
        });


        console.log("results",results);

        setSearchResults(results);

        //const results3=

        //setSearchResults(profiles.filter(profile => 
        //    profile.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 ||
        //    profile.city.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0));
    }
    
    return <>
        <h1>Profile Explorer</h1>
        <div className="d-flex flex g-3">
            <SearchField onChange={handleSearchChange}/>
            <div className="ms-3">
                <CheckBoxDropdown dd_label="Lifestyle " 
                        options={lifestylePref} 
                        setValues={handleToggle}/>
            </div>
            <div className="ms-3">
                <CheckBoxDropdown dd_label="Property " 
                        options={propertyPref} 
                        setValues={x => setPropertyPref({x})}/>
            </div>
            <div className="ms-3">
                <CheckBoxDropdown dd_label="Age " 
                        options={agePref} 
                        setValues={x => setAgePref({x})}/>
            </div>
        </div>
        <hr/>
        {console.log("life2",lifestylePref)}
    </>;
};