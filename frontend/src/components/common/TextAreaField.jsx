export const TextAreaField = ({ label, value, setValue, rowNum }) => (
  <>
    <div className="form-group fw-bold mb-3">
      <label htmlFor="value">{label}&nbsp;</label>
      <textarea
        name="value"
        id="value"
        rows={rowNum}
        className="form-control"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  </>
);
