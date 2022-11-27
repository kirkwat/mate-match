export const TextAreaField = ({ label, value, setValue, max }) => <>
    <div className="form-group fw-bold mb-3">
        <label htmlFor="value">{ label }</label>
        <textarea name="value"
            id="value"
            rows="5"
            className="form-control"
            value={value}
            maxlength= {max}
            onChange={event => setValue(event.target.value)} />
    </div>
    <p>{`Max characters: ${value.length}/${max}`}</p>
</>;