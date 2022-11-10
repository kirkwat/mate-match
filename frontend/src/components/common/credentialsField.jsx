export const CredentialsField = ({ label, value, setValue, password=false }) => <>
    <div className="form-group mb-3">
        <label htmlFor="value" className="me-2">{ label }</label>
        {password && <input type="password"
            name="value"
            id="value"
            className="d-flex align-items-right justify-content-right"
            value={value}
            onChange={event => setValue(event.target.value)} />}
        
        {!password && <input type="text"
            name="value"
            id="value"
            className="d-flex align-items-right justify-content-right"
            value={value}
            onChange={event => setValue(event.target.value)} />}
    </div>
</>;