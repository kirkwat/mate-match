export const PasswordField = ({ label, id, value, setValue, setFocus }) => <>
    <div className="form-group fw-bold mb-3">
        <label htmlFor={id}>{ label }</label>
        <input type="password"
            name="value"
            id={id}
            className="form-control"
            autoComplete="off"
            required
            value={value}
            onChange={event => setValue(event.target.value)}
            onFocus={event => setFocus(true)}
            onBlur={event => setFocus(false)} />
    </div>
</>;