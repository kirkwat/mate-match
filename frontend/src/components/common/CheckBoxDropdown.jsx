import { useState } from "react";
import { CheckBoxField } from "./CheckBoxField";

export const CheckBoxDropdown = ({ dd_label, options, setValues }) => {

    const [checked, setChecked] = useState(options);

    const handleToggle = label => {
        const newChecked = {...checked};
        console.log("new",newChecked)
        console.log("label",label)
        newChecked[label]=!newChecked[label];

        setChecked(newChecked);
        setValues(newChecked);
    };

    return <>
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                { dd_label }
            </button>
            <ul className="dropdown-menu">
                {Object.keys(options).map((label, index) =>
                    <li className="ps-2 pe-0" key={index}>
                        <CheckBoxField label={label}
                                checked={options[index]}
                                setChecked={ () => handleToggle(label) } />
                    </li>)
                }
            </ul>
        </div>
    </>
};