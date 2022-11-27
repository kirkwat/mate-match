//TODO update changes to handle search and dropdown filters at same time
//currently only dropdown filters work together

import {useState} from "react";
import { SearchField, CheckBoxDropdown } from "../../common";
import { Filter } from "../../../models";

export const ProfileSearch = ({ profiles, setSearchResults}) => { 

    const lifestyleFilters = [
        new Filter("nightPerson", "Night-owl", false),
        new Filter("morningPerson", "Early-bird", false),
        new Filter("pets", "Pet-Friendly", false),
        new Filter("shareFood", "Shares Food", false)
    ];

    const propertyFilters = [
        new Filter("apartment", "Apartment", false),
        new Filter("house", "House", false),
        new Filter("condo", "Condo", false)
    ];

    const ageFilters = [
        new Filter("18-23", "18-23", false),
        new Filter("24-29", "24-29", false),
        new Filter("30+", "30+", false)
    ];

    const genderFilters = [
        new Filter("male", "Man", false),
        new Filter("female", "Woman", false)
    ];

    const [ lifestylePref, setLifestylePref ] = useState(lifestyleFilters);
    const [ propertyPref, setPropertyPref ] = useState(propertyFilters);
    const [ agePref, setAgePref ] = useState(ageFilters);
    const [ genderPref, setGenderPref ] = useState(genderFilters);

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
        const filters=e.filter(pref => pref.value);

        const results=profiles.filter(profile => {
            let filterCheck=true;
            
            filters.forEach((pref) => {
                if(pref.id==="18-23"){
                    if(18>=profile.age||profile.age>=23) filterCheck=false;
                }
                else if(pref.id==="24-29"){
                    if(24>=profile.age||profile.age>=29) filterCheck=false;
                }
                else if(pref.id==="30+"){
                    if(30>=profile.age) filterCheck=false;
                }
            });
            return filterCheck;
        });
        setSearchResults(results);
    };
    
    const handleGenderToggle = (e) => {
        setGenderPref(e);
        const filters=e.filter(pref => pref.value);

        const results=profiles.filter(profile => {
            let filterCheck=true;

            filters.forEach((pref) => {
                if(profile.gender!==pref.id){
                    filterCheck = false;
                }
            });
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
            <div className="ms-3">
                <CheckBoxDropdown dd_label="Age " 
                        options={agePref} 
                        setValues={handleAgeToggle}/>
            </div>
            <div className="ms-3">
                <CheckBoxDropdown dd_label="Gender " 
                        options={genderPref} 
                        setValues={handleGenderToggle}/>
            </div>
        </div>
        <hr/>
    </>;
};