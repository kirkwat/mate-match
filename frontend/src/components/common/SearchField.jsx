export const SearchField = ({ onChange }) => <>
    <div className="form-group form-label rounded-pill fw-bold">
        <input type="text"
            name="value"
            placeholder="Search for Name or City"
            id="username"
            className="form-control"
            autoComplete="off"
            required
            onChange={onChange} />
    </div>
</>;