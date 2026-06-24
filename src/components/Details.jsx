import "../styles/details.css"

import { useParams } from 'react-router-dom'
import { useState } from "react";

import { typeColors } from "../constants/typeColours.js"
import { typeColorsDark } from "../constants/typeColoursDark.js"
import jsonDetails from "../mocks/details.json"
import jsonPokemon from "../mocks/pokemon.json"

import Stats from "./Stats.jsx"
import Physical from './Physical.jsx';
import Evolutions from './Evolutions.jsx';

function Details() {
    const { id } = useParams()
    const pokemon = jsonPokemon.find(p => p.id === Number(id))
    const detail = jsonDetails.details.find(d => String(d.id) === String(id))
    const [activeTab, setActiveTab] = useState("stats");

    const backgroundColor = typeColors[pokemon.types[0]] || "#F9F9F9"
    const backgroundColorDark = typeColorsDark[pokemon.types[0]] || "#555"

    if (!pokemon || !detail) return <p>No se encontró el Pokémon.</p>

    return (
        <main className='details-container'>
            <div 
                className='card-container'
                style={{ backgroundColor }}>
                
                <div className="pokemon-info">
                    <img
                        className='imagen'
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                        alt={pokemon.name}
                    />

                    <h2>{pokemon.name}</h2>
                    <h5>#{pokemon.id}</h5>
                </div>

                <div className="buttons-container">
                    <button style={{ backgroundColor: backgroundColorDark }} onClick={() => setActiveTab("stats")}>Stats</button>
                    <button style={{ backgroundColor: backgroundColorDark }} onClick={() => setActiveTab("physical")}>Physical</button>
                    <button style={{ backgroundColor: backgroundColorDark }} onClick={() => setActiveTab("evolutions")}>Evolutions</button>
                    <button style={{ backgroundColor: backgroundColorDark }} onClick={() => setActiveTab("other")}>Other</button>
                </div>
            </div>

            <div className='info-container'>
                {activeTab === "stats" && <Stats detail={detail} pokemon={pokemon} />}
                {activeTab === "physical" && <Physical detail={detail} pokemon={pokemon} />}
                {activeTab === "evolutions" && <Evolutions detail={detail} pokemon={pokemon} />}
                {activeTab === "other" && <p>Other info...</p>}
            </div>
        </main>
    )
}

export default Details