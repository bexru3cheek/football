import PropTypes from "prop-types";

const CategorySearchForm = ({ search, setSearch, openModal }) => {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={openModal}
      >
        Add category
      </button>
    </div>
  );
};

CategorySearchForm.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  openModal: PropTypes.func,
};

export default CategorySearchForm;
