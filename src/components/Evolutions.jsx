import "../styles/evolutions.css";

import { Link } from "react-router-dom";

import { typeColors } from "../constants/typeColours.js";
import { typeColorsDark } from "../constants/typeColoursDark.js";
import jsonPokemon from "../mocks/pokemon.json";
import jsonDetails from "../mocks/details.json";

function Evolutions({ detail, pokemon }) {
    const backgroundColor = typeColors[pokemon.types[0]] || "#F9F9F9";
    const backgroundColorDark = typeColorsDark[pokemon.types[0]] || "#555";

    if (!detail) return <p>No data available.</p>;

    const evolutionMap = new Map();

    jsonDetails.details.forEach(d => {
        d.evolutions?.forEach(e => {
            evolutionMap.set(e.to, d);
        });
    });

    const findBasePokemon = (currentDetail) => {
        let base = currentDetail;

        while (evolutionMap.has(base.id)) {
            base = evolutionMap.get(base.id);
        }

        return base;
    };

    const getAllEvolutions = (currentDetail) => {
        if (!currentDetail.evolutions || currentDetail.evolutions.length === 0) return [];

        return currentDetail.evolutions.flatMap((evo) => {
            const nextPokemon = jsonPokemon.find(p => p.id === evo.to);
            const nextDetail = jsonDetails.details.find(d => d.id === evo.to);

            if (!nextPokemon || !nextDetail) return [];

            return [
                { pokemon: nextPokemon, level: evo.level },
                ...getAllEvolutions(nextDetail)
            ];
        });
    };

    const baseDetail = findBasePokemon(detail);

    const evolutionsChain = [
        {
            pokemon: jsonPokemon.find(p => p.id === baseDetail.id),
            level: null
        },
        ...getAllEvolutions(baseDetail)
    ];

    if (evolutionsChain.length === 0) {
        return <p>This Pokémon has no evolutions.</p>;
    }

    return (
        <div className="evolutions-container">
            {evolutionsChain.map((evo) => (
                <div key={evo.pokemon.id} style={{ display: "flex", alignItems: "center" }}>
                    
                    <Link
                        to={`/pokemon/${evo.pokemon.id}`}
                        style={{
                            display: "block",
                            textDecoration: "none",
                            color: "inherit"
                        }}
                    >
                        <div
                            className="evolution-card"
                            style={{
                                backgroundColor: evo.pokemon.id === pokemon.id
                                    ? backgroundColorDark
                                    : backgroundColor
                            }}
                        >
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.pokemon.id}.png`}
                                alt={evo.pokemon.name}
                                className="evolution-img"
                            />
                            <div className="evolution-info">
                                <h3>{evo.pokemon.name}</h3>
                                <p>#{evo.pokemon.id}</p>

                                <div
                                    style={{
                                        borderRadius: 15,
                                        padding: "4px 8px",
                                        backgroundColor: evo.pokemon.id === pokemon.id
                                            ? backgroundColor
                                            : backgroundColorDark
                                    }}
                                >
                                    <p>{evo.level ? `Level: ${evo.level}` : "Base"}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Evolutions;