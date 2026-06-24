import "../styles/menu.css";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import CloseIcon from "./icons/CloseIcon";

function Menu({ setMenuOpen, onLogout, team, pokemons, toggleTeam }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
    setTimeout(() => {
      setUser(JSON.parse(storedUser));
    }, 0);
  }
}, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    if (onLogout) onLogout();

    navigate("/login");
  };

  return (
    <aside className="menu">
      <button
        className="close-menu"
        onClick={setMenuOpen}
      >
        <CloseIcon width={20} height={20} fill="#fff" className="icon" />
      </button>

      {user && (
        <div className="menu-user">
          <img 
            src={user.image} 
            alt={user.fullName} 
            className="menu-user-image"
          />
          <p className="menu-user-name">{user.fullName}</p>
          <p className="menu-user-username">@{user.username}</p>
        </div>
      )}

      <button
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>

      <div className="team">
        {team.map((id) => {
          const pokemon = pokemons.find(p => p.id === id);
          if (!pokemon) return null;

          return (
            <img
              key={id}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={pokemon.name}
              className="team-pokemon"
              onClick={() => toggleTeam(id)}
            />
          );
        })}
      </div>
    </aside>
  );
}

export default Menu;