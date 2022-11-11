export const TextAreaField = ({ label, value, setValue }) => <>
    <div className="form-group fw-bold mb-3">
        <label htmlFor="value">{ label }</label>
        <textarea name="value"
            id="value"
            rows="5"
            className="form-control"
            value={value}
            onChange={event => setValue(event.target.value)} />
    </div>
</>;