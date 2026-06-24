import "../styles/filters.css";

import CloseIcon from "./icons/CloseIcon";

function Filters({
  filters,
  setFilters,
  pokemonTypes,
  regions,
  region,
  setRegion,
  setFiltersOpen
}) {

  const handleChangeType = (e) => {
    setFilters({ ...filters, type: e.target.value });
  };

  const handleChangeRegion = (e) => {
    setRegion(e.target.value);
  };

  return (
    <aside className="filters">

      <div className="input">
        <label htmlFor="type">Type</label>
        <select id="type" value={filters.type} onChange={handleChangeType}>
          <option value="all">All</option>
          {pokemonTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="input">
        <label htmlFor="region">Region</label>
        <select id="region" value={region} onChange={handleChangeRegion}>
          <option value="all">All</option>
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      <button 
        className="close-filters"
        onClick={setFiltersOpen}
      >
        <CloseIcon width={20} height={20} fill="#fff" className="icon" />
      </button>

    </aside>
  );
}

export default Filters;