export const TextField = ({ label, value, setValue }) => <>
    <div className="form-group mb-3">
        <label htmlFor="value">{ label }</label>
        <input type="text"
            name="value"
            id="value"
            className="form-control"
            value={value}
            onChange={event => setValue(event.target.value)} />
    </div>
</>;