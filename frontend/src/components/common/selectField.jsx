export const SelectField = ({ label, value, setValue, options, optionValueKey, optionLabelKey, hideBlankOption }) => <>
    <div className="form-group mb-3">
        <label htmlFor="value">{ label }</label>
        <select
            name="value"
            id="value"
            className="form-control"
            value={value}
            onChange={event => setValue(event.target.value)}>
                { !hideBlankOption && <option></option> }
                { options.map((option, index) =>
                    <option 
                        key={index}
                        value={optionValueKey ? option[optionValueKey] : option}>
                        { optionLabelKey ? option[optionLabelKey] : optionValueKey ? option[optionValueKey] : option }
                    </option>)
                }
        </select>
    </div>
</>;