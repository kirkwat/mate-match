export const TextAreaField = ({ label, value, setValue, rowNum }) => <>
    <div className="form-group fw-bold mb-3">
        <label htmlFor="value">
            { label }&nbsp;
            {value === null && <span className="fw-normal">{`- Max characters: 0/${255}`}</span>}
            {value !== null && <span className="fw-normal">{`- Max characters: ${value.length}/${255}`}</span>}
        </label>
        <textarea name="value"
            id="value"
            rows={rowNum}
            className="form-control"
            value={value}
            maxLength= {255}
            onChange={event => setValue(event.target.value)} />
    </div>
</>;