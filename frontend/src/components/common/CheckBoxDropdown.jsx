import { useState } from "react";
import { CheckBoxField } from "./CheckBoxField";

export const CheckBoxDropdown = ({ dd_label, labels, values, setValues }) => {

    const [checked, setChecked] = useState(values);

    const handleToggle = index => {
        const newChecked = [...checked];
        newChecked[index]=!newChecked[index];

        setChecked(newChecked);
        setValues(newChecked);
    };

    return <>
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                { dd_label }
            </button>
            <ul className="dropdown-menu">
                {labels.map((label, index) =>
                    <li className="ps-2 pe-0" key={index}>
                        <CheckBoxField label={label}
                                checked={values[index]}
                                setChecked={ () => handleToggle(index) } />
                    </li>)
                }
            </ul>
        </div>
    </>
};