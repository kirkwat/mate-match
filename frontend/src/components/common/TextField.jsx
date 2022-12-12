export const TextField = ({ label, id, value, setValue, required }) => (
  <>
    <div className="form-group fw-bold mb-3">
      <label htmlFor={id}>
        {label}&nbsp;
        {required && value !== null && value.length === 0 && (
          <span className="text text-danger">- {label} is required.</span>
        )}
      </label>
      <input
        type="text"
        name="value"
        id={id}
        className="form-control"
        autoComplete="off"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  </>
);
