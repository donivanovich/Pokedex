import "../styles/header.css";

import logo from "../assets/logo.png";
import FunnelIcon from "./icons/FunnelIcon.jsx";
import PersonIcon from "./icons/PersonIcon.jsx";

function Header({ searchTerm, setSearchTerm, setFiltersOpen, setMenuOpen }) {

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header className="header-container">

      <div className="header-menu">
        <button
          className="btn-left" 
          onClick={setFiltersOpen}
        >
          <FunnelIcon width={20} height={20} className="icon" />
        </button>

        <img src={logo} alt="Logo" />

        <button 
          className="btn-right"
          onClick={setMenuOpen}
        >
          <PersonIcon width={20} height={20} className="icon" />
        </button>
      </div>

      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleChange}
      />

    </header>
  );
}

export default Header;