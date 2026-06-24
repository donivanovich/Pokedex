import './styles/App.css';

import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import { pokemonTypes } from "./constants/types.js";
import jsonPokemon from "./mocks/pokemon.json";
import jsonRegions from "./mocks/regions.json";

import Pokemon from "./components/Pokemon.jsx";
import Filters from "./components/Filters.jsx";
import Header from "./components/Header.jsx";
import Menu from './components/Menu.jsx';
import Stats from './components/Details.jsx';
import Login from './components/Login.jsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [pokemons] = useState(jsonPokemon);
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState(1);
  const [filters, setFilters] = useState({ type: 'all' });

  const [team, setTeam] = useState(() => {
    return JSON.parse(localStorage.getItem("team")) || [];
  });

  const toggleTeam = (id) => {
    let updatedTeam;

    if (team.includes(id)) {
      updatedTeam = team.filter(p => p !== id);
    } else {
      if (team.length >= 6) return;
      updatedTeam = [...team, id];
    }

    setTeam(updatedTeam);
    localStorage.setItem("team", JSON.stringify(updatedTeam));
  };

  const selectedRegion = jsonRegions.regions.find(
    (r) => r.id === Number(region)
  );

  const filterPokemons = (pokemons) => {
    return pokemons.filter(pokemon => {
      const matchesType =
        filters.type === "all" || pokemon.types.includes(filters.type);

      const matchesSearch =
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion =
        region === "all" ||
        (selectedRegion &&
          pokemon.id >= selectedRegion.first_pokemon_id &&
          pokemon.id <= selectedRegion.last_pokemon_id);

      return matchesType && matchesSearch && matchesRegion;
    });
  };

  const filteredPokemons = filterPokemons(pokemons);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Login onLogin={() => setIsLoggedIn(true)} />
          )
        } 
      />
      
      <Route 
        path="/"
        element={
          isLoggedIn ? (
            <div className="app-container">
              {(isFiltersOpen || isMenuOpen) && (
                <div 
                  className="overlay"
                  onClick={() => {
                    setFiltersOpen(false);
                    setMenuOpen(false);
                  }}
                />
              )}

              <div className={`filters-container ${isFiltersOpen ? "open" : ""}`}>
                <Filters
                  filters={filters}
                  setFilters={setFilters}
                  pokemonTypes={pokemonTypes}
                  regions={jsonRegions.regions}
                  region={region}
                  setRegion={setRegion}
                  setFiltersOpen={() => setFiltersOpen(false)}
                />
              </div>

              <div className="pokemon-container">
                <Header
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  setFiltersOpen={() => setFiltersOpen(true)}
                  setMenuOpen={() => setMenuOpen(true)}
                />
                <Pokemon
                  pokemons={filteredPokemons}
                  team={team}
                  toggleTeam={toggleTeam}
                />
              </div>

              <div className={`menu-container ${isMenuOpen ? "open" : ""}`}>
                <Menu
                  setMenuOpen={() => setMenuOpen(false)}
                  onLogout={() => setIsLoggedIn(false)}
                  team={team}
                  pokemons={pokemons}
                  toggleTeam={toggleTeam}
                />
              </div>
            </div>
          ) : <Navigate to="/login" replace />
        }
      />

      <Route
        path="/pokemon/:id" 
        element={isLoggedIn ? <Stats /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;