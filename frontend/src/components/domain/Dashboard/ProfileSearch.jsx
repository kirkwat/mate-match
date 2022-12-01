//TODO update changes to handle search and dropdown filters at same time
//currently only dropdown filters work together

import {useState} from "react";
import { SearchField, CheckBoxDropdown } from "../../common";
import { Filter } from "../../../models";
const filterFactor = {
    key: '',
    Lifestyle:[],
    Property:[],
    Age:[],
    Gender:[],
}
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
        new Filter("condo", "Condo", false),
        new Filter("hasResidence", "Has Housing", false)
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
    
    // const [ filterArr, setFilterArr ] = useState(filterFactor);
    
    const handleSearchChange = (e) => {
        let val = e.target.value;
        filterFactor.key = val;
        setFilterArrFun();
        //  return setSearchResults(profiles);

        // setSearchResults(profiles.filter(profile => 
        //     profile.name.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0 ||
        //     profile.city.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0));
    };

    const handleLifestyleToggle = (e) => {
        setLifestylePref(e);
        const filters=e.filter(pref => pref.value);
        filterFactor.Lifestyle = filters;
        setFilterArrFun();
        // const results=profiles.filter(profile => {
        //     let filterCheck=true;

        //     filters.forEach((pref) => {
        //         if(!profile[pref.id]){
        //             filterCheck = false;
        //         }
        //     });
        //     return filterCheck;
        // });
        // console.log(results);
        // setSearchResults(results);
    };

    const handlePropertyToggle = (e) => {
        setPropertyPref(e);
        const filters=e.filter(pref => pref.value);
        filterFactor.Property = filters;
        setFilterArrFun();
        // const results=profiles.filter(profile => {
        //     let filterCheck=true;
            
        //     filters.forEach((pref) => {
        //         if(!profile[pref.id]){
        //             filterCheck = false;
        //         }
        //     });
        //     return filterCheck;
        // });
        // setSearchResults(results);
    };

    const handleAgeToggle = (e) => {
        setAgePref(e);
        const filters=e.filter(pref => pref.value);
        filterFactor.Age = filters;
        setFilterArrFun();
        // const results=profiles.filter(profile => {
        //     let filterCheck=true;
            
        //     filters.forEach((pref) => {
        //         if(pref.id==="18-23"){
        //             if(18>=profile.age||profile.age>=23) filterCheck=false;
        //         }
        //         else if(pref.id==="24-29"){
        //             if(24>=profile.age||profile.age>=29) filterCheck=false;
        //         }
        //         else if(pref.id==="30+"){
        //             if(30>=profile.age) filterCheck=false;
        //         }
        //     });
        //     return filterCheck;
        // });
        // setSearchResults(results);
    };
    
    const handleGenderToggle = (e) => {
        setGenderPref(e);
        const filters=e.filter(pref => pref.value);
        filterFactor.Gender = filters;
        setFilterArrFun();
        // const results=profiles.filter(profile => {
        //     let filterCheck=true;

        //     filters.forEach((pref) => {
        //         if(profile.gender!==pref.id){
        //             filterCheck = false;
        //         }
        //     });
        //     return filterCheck;
        // });
        // setSearchResults(results);
    };

    const setFilterArrFun = function(){
        const results = profiles.filter(profile => {
            let mark = true;
            Object.keys(filterFactor).forEach(v_key=>{
                let curFilterItem = filterFactor[v_key];
                if(v_key === 'key' && curFilterItem && (profile.name.toLowerCase().indexOf(curFilterItem.toLowerCase()) === -1 && profile.city.toLowerCase().indexOf(curFilterItem.toLowerCase()) === -1) ){
                    mark = false
                }
                if(mark){
                    if(v_key !== 'key'){
                        if(['Lifestyle','Property', 'Gender'].indexOf(v_key) !==-1){
                            curFilterItem.forEach(v_=>{
                                if(mark){
                                    mark = v_key === 'Gender'?  profile.gender === v_.id : !!profile[v_.id];
                                }
                            });
                        }
                        if(v_key === 'Age'){
                            curFilterItem.forEach(v_=>{
                                if(mark){
                                    if(v_.id==="18-23"){
                                        if(profile.age > 23 || profile.age<18){
                                            mark = false;
                                        }
                                    } else if(v_.id === "24-29"){
                                        if(profile.age > 29 || profile.age<24){
                                            mark = false;
                                        }
                                    } else if(v_.id==="30+"){
                                        if(profile.age < 30 ){
                                            mark = false;
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
            });
            return mark;
        });
        setSearchResults(results);
    }

    return <>
        <h1>Profile Explorer</h1>
        <div className="row justify-content-start g-3">
            <div className="col-xs-12 col-md-6 col-lg-4">
                <SearchField onChange={handleSearchChange}/>
            </div>
            <div className="col-xs-12 col-md-6 col-lg-8">
                <div className="row justify-content-evenly gx-5 gy-2">
                    <div className="col-xs-4 col-sm-3 col-md-6 col-lg-2">
                        <CheckBoxDropdown dd_label="Lifestyle " 
                                options={lifestylePref} 
                                setValues={handleLifestyleToggle}/>
                    </div>
                    <div className="col-xs-4 col-sm-3 col-md-6 col-lg-2">
                        <CheckBoxDropdown dd_label="Property " 
                                options={propertyPref} 
                                setValues={handlePropertyToggle}/>
                                </div>
                    <div className="col-xs-4 col-sm-3 col-md-6 col-lg-2">
                        <CheckBoxDropdown dd_label="Gender " 
                                options={genderPref} 
                                setValues={handleGenderToggle}/>
                    </div>
                    <div className="col-xs-4 col-sm-3 col-md-6 col-lg-2">
                        <CheckBoxDropdown dd_label="Age " 
                                options={agePref} 
                                setValues={handleAgeToggle}/>
                    </div>
                </div>
            </div>
        </div>
        <hr/>
    </>;
};