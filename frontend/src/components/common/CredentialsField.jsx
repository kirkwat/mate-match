export const CredentialsField = ({
  label,
  id,
  value,
  setValue,
  setFocus,
  password = false,
}) => (
  <>
    <div className="form-group fw-bold mb-3">
      <label htmlFor={id}>{label}</label>
      {password && setFocus && (
        <input
          type="password"
          name="value"
          id={id}
          className="form-control"
          autoComplete="off"
          required
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      )}
      {password && !setFocus && (
        <input
          type="password"
          name="value"
          id={id}
          className="form-control"
          autoComplete="off"
          required
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      )}
      {!password && setFocus && (
        <input
          type="text"
          name="value"
          id={id}
          className="form-control"
          autoComplete="off"
          required
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
      )}
      {!password && !setFocus && (
        <input
          type="text"
          name="value"
          id={id}
          className="form-control"
          autoComplete="off"
          required
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      )}
    </div>
  </>
);
