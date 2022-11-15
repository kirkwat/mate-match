//TODO update checkboxdropdown to handle objects instead of arrays

import {useState} from "react";
import { SearchField, CheckBoxDropdown } from "../../common";

export const ProfileSearch = ({ profiles, setSearchResults}) => { 

    const [ search, setSearch ] = useState("");

    const lifestyle_labels=["Night-owl","Early-bird","Smoke-free","Pet-friendly"];
    const [ lifestylePref, setLifestylePref ] = useState([false,false,false,false]);

    const property_labels=["House","Apartment","Condo"];
    const [ propertyPref, setPropertyPref ] = useState([false,false,false]);

    const age_labels=["18-23","24-29","30+"];
    const [ agePref, setAgePref ] = useState([false,false,false]);

    return <>
        <div className="container py-4">
            <div className="bg-light rounded p-5 pb-4 mb-4">
                <h1>Profile Explorer</h1>
                <div className="d-flex flex">
                    <SearchField id="username"
                            value={search}
                            setValue={x => setSearch(x)} />
                    <div className="mt-4 ms-3">
                        <CheckBoxDropdown dd_label="Lifestyle " 
                                labels={lifestyle_labels} 
                                values={lifestylePref} 
                                setValues={x => setLifestylePref({x})}/>
                    </div>
                    <div className="mt-4 ms-3">
                        <CheckBoxDropdown dd_label="Property " 
                                labels={property_labels} 
                                values={propertyPref} 
                                setValues={x => setPropertyPref({x})}/>
                    </div>
                    <div className="mt-4 ms-3">
                        <CheckBoxDropdown dd_label="Age " 
                                labels={age_labels} 
                                values={agePref} 
                                setValues={x => setAgePref({x})}/>
                    </div>
                </div>
            </div>
        </div>
    </>;
};