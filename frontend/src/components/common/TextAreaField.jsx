export const TextAreaField = ({ label, value, setValue, max, rowNum }) => <>
    <div className="form-group fw-bold mb-3">
        <label htmlFor="value">{ label }</label>
        <textarea name="value"
            id="value"
            rows={rowNum}
            className="form-control"
            value={value}
            maxLength= {max}
            onChange={event => setValue(event.target.value)} />
    </div>
    {value == null && <p>{`Max characters: 0/${max}`}</p>}
    {value != null &&  <p>{`Max characters: ${value.length}/${max}`}</p>}
</>;