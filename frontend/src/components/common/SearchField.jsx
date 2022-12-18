export const SearchField = ({ value, setValue }) => (
  <>
    <div className="form-group form-label rounded-pill fw-bold">
      <input
        type="text"
        name="value"
        placeholder="Search for Name or City"
        id="username"
        className="form-control"
        autoComplete="off"
        required
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  </>
);
