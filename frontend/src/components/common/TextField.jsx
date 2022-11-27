export const TextField = ({ label, id, value, setValue, required }) => <>
    <div className="form-group fw-bold mb-3">
        <label htmlFor={id}>{ label }</label>
        <input type="text"
            name="value"
            id={id}
            className="form-control"
            autoComplete="off"
            value={value}
            onChange={event => setValue(event.target.value)} />
    </div>
    {required && value != null && value.length == 0 && <p className="text text-danger">This is required</p>}
</>;