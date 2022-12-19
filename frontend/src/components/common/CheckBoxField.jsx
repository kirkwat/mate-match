export const CheckBoxField = ({ label, checked, setChecked }) => (
  <>
    <div className="form-check form-check-inline ps-0 pe-1">
      <label htmlFor="value">
        <input
          type="checkbox"
          name="value"
          id="value"
          checked={checked}
          onChange={() => setChecked(!checked)}
          className="me-2"
        />
        {label}
      </label>
    </div>
  </>
);
