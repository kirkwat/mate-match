export const CheckBoxField = ({ label, checked, setChecked }) => <>
    <div className="form-check form-check-inline ps-0 pe-1">
        <label htmlFor="value">
            <input type="checkbox"
                name="value"
                id="value"
                checked={checked}
                onChange={event => setChecked(event.target.checked)}
                className="me-2" />
            { label }
        </label>
    </div>
</>;

/*
export const CheckBoxField = ({ label, checked, setChecked }) => <>
    <div className="form-group mb-3">
        <label htmlFor="value">
            <input type="checkbox"
                name="value"
                id="value"
                checked={checked}
                onChange={event => setChecked(event.target.checked)}
                className="me-2" />
            { label }
        </label>
    </div>
</>;*/