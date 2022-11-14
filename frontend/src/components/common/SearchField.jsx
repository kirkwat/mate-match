export const SearchField = ({ label, id, value, setValue }) => <>
    <div className="form-group form-label rounded-pill fw-bold w-50">
        <label htmlFor={id}>{ label }</label>
        <input type="text"
            name="value"
            placeholder="Search"
            id={id}
            className="form-control"
            autoComplete="off"
            required
            value={value}
            onChange={event => setValue(event.target.value)} />
    </div>
</>;