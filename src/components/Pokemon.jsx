import "../styles/pokemon.css";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { typeColors } from "../constants/typeColours.js";
import { typeColorsDark } from "../constants/typeColoursDark.js";

import HeartIcon from "./icons/HeartIcon.jsx";
import HeartFillIcon from "./icons/HeartFillIcon.jsx";
import DashIcon from "./icons/DashIcon.jsx";
import PlusIcon from "./icons/PlusIcon.jsx";

function Pokemon({ pokemons, team, toggleTeam }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (id) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <main>
      <ul>
        {pokemons.map(pokemon => (
          <li
            key={pokemon.id}
            style={{ backgroundColor: typeColors[pokemon.types[0]] || "#F9F9F9" }}
          >
            <Link
              to={`/pokemon/${pokemon.id}`}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit"
              }}
            >
              <div
                className="heart-container"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(pokemon.id);
                }}
              >
                {favorites.includes(pokemon.id) ? (
                  <HeartFillIcon size={14} color="red" />
                ) : (
                  <HeartIcon size={14} color="white" />
                )}
              </div>

              <div
                className="team-container"
                onClick={(e) => {
                  e.preventDefault();
                  toggleTeam(pokemon.id);
                }}
              >
                {team.includes(pokemon.id) ? (
                  <DashIcon size={25} color="white" />
                ) : (
                  <PlusIcon size={25} color="white" />
                )}
              </div>

              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
              />

              <div>
                <h4>{pokemon.name}</h4>
                <h5>#{pokemon.id}</h5>

                <div className="types-container">
                  {pokemon.types.map((type, index) => (
                    <span
                      key={index}
                      className="type-badge"
                      style={{ backgroundColor: typeColorsDark[type] || "#555" }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Pokemon;