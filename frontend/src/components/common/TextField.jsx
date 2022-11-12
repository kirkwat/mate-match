export const TextField = ({ label, id, value, setValue }) => <>
    <div className="form-group fw-bold mb-3">
        <label htmlFor={id}>{ label }</label>
        <input type="text"
            name="value"
            id={id}
            className="form-control"
            autoComplete="off"
            required
            value={value}
            onChange={event => setValue(event.target.value)} />
    </div>
</>;