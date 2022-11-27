//TODO update changes to handle all filters combined
//currently filters can only be used one at a time

import {useState} from "react";
import { SearchField, CheckBoxDropdown } from "../../common";
import { Filter } from "../../../models";

export const ProfileSearch = ({ profiles, setSearchResults}) => { 

    const lifestyleFilters = [
        new Filter("nightPerson", "Night-owl", false),
        new Filter("morningPerson", "Early-bird", false),
        new Filter("pets", "Pet-Friendly", false),
        new Filter("shareFood", "Shares Food", false),
    ];

    const propertyFilters = [
        new Filter("apartment", "Apartment", false),
        new Filter("house", "House", false),
        new Filter("condo", "Condo", false),
    ];

    const ageFilters = [
        new Filter("age", "18-23", false),
        new Filter("age", "24-29", false),
        new Filter("age", "30+", false),
    ];

    const genderFilters = [
        new Filter("apartment", "Apartment", false),
        new Filter("house", "House", false),
        new Filter("condo", "Condo", false),
    ];

    const [ lifestylePref, setLifestylePref ] = useState(lifestyleFilters);
    const [ propertyPref, setPropertyPref ] = useState(propertyFilters);
    const [ agePref, setAgePref ] = useState({"18-23":false,"24-29":false,"30+":false});
    const [ genderPref, setGenderPref ] = useState({"Male":false,"Female":false});

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(profiles);

        setSearchResults(profiles.filter(profile => 
            profile.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 ||
            profile.city.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0));
    };

    const handleLifestyleToggle = (e) => {
        setLifestylePref(e);
        const filters=e.filter(pref => pref.value);

        const results=profiles.filter(profile => {
            let filterCheck=true;

            filters.forEach((pref) => {
                if(!profile[pref.id]){
                    filterCheck = false;
                }
            });
            return filterCheck;
        });
        setSearchResults(results);
    };

    const handlePropertyToggle = (e) => {
        setPropertyPref(e);
        const filters=e.filter(pref => pref.value);

        const results=profiles.filter(profile => {
            let filterCheck=true;
            
            filters.forEach((pref) => {
                if(!profile[pref.id]){
                    filterCheck = false;
                }
            });
            return filterCheck;
        });
        setSearchResults(results);
    };

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
    };
    
    const handleGenderToggle = (e) => {
        setGenderPref(e);
        //remove false attributes
        const filters=Object.keys(e).reduce((o, key) => {
            e[key] === true && (o[key] = e[key]);
            return o;
        }, {});

        const results=profiles.filter(profile => { 
            let filterCheck=true;
            Object.keys(filters).map((label) => {
                if(label==="Male"){
                    if(profile.gender!=="male") filterCheck=false;
                }
                else if(label==="Female"){
                    if(profile.gender!=="female") filterCheck=false;
                }
            })
            return filterCheck;
        });
        setSearchResults(results);
    };

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




        </div>
        <hr/>
    </>;
};


/*

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
            <div className="ms-3">
                <CheckBoxDropdown dd_label="Gender " 
                        options={genderPref} 
                        setValues={handleGenderToggle}/>
            </div>*/