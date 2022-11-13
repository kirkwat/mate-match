import { CheckBoxField } from "./CheckBoxField";

export const CheckBoxDropdown = ({ dd_label, labels, values, setValues }) => <>
    <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            { dd_label }
        </button>
        <ul className="dropdown-menu">
            {labels.map((label, index) =>
                <li className="ps-2" key={index}>
                    <CheckBoxField label={label}
                    checked={values[label]}
                    setChecked={ label => setValues({ label }) }/>
                </li>)
            }
        </ul>
    </div>
</>;